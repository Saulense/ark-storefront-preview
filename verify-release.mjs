// No network, packages, models, credentials or retries. Verify before extraction.
import {readFileSync as read, readdirSync as list, lstatSync as stat, mkdirSync as mkdir, existsSync as exists} from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const sha=b=>createHash('sha256').update(b).digest('hex');
const manifestBytes=read('release-manifest.json');
if(sha(manifestBytes)!=='9725c5d2e8938610c7af05181f8bc1826c881ff2292dbab59ae58ea1c1f3c8bc')throw Error('Release manifest changed');
const m=JSON.parse(manifestBytes), approved=new Set(m.files), seen=new Set();
if(approved.size!==294||m.repository!=='Saulense/ark-storefront-preview'||m.base!=='/ark-storefront-preview/')throw Error('Unexpected release identity');
if(m.files.some(p=>p.startsWith('/')||p.split('/').includes('..')||!(/\.(html|css|js|svg|woff2|jpg|png)$/.test(p)||p==='.nojekyll')))throw Error('Unsafe payload path');
for(const a of m.archives){
  const bytes=read(a.name);if(bytes.length!==a.bytes||sha(bytes)!==a.sha256)throw Error('Archive changed '+a.name);
  const paths=execFileSync('tar',['-tzf',a.name],{encoding:'utf8'}).trim().split('\n');
  const types=execFileSync('tar',['-tvzf',a.name],{encoding:'utf8'}).trim().split('\n');
  if(paths.length!==a.files||types.length!==paths.length||types.some(l=>!l.startsWith('-')))throw Error('Non-regular archive member');
  for(const p of paths){if(!approved.has(p)||seen.has(p))throw Error('Unexpected/duplicate archive path '+p);seen.add(p);}
}
if(seen.size!==approved.size)throw Error('Incomplete payload');
if(exists('_site'))throw Error('Refuse to replace an existing output');mkdir('_site');
for(const a of m.archives)execFileSync('tar',['--no-same-owner','--no-same-permissions','-xzf',a.name,'-C','_site']);
const walk=(d,p='')=>list(d).flatMap(n=>{const s=stat(d+'/'+n);if(s.isSymbolicLink())throw Error('Symlink');return s.isDirectory()?walk(d+'/'+n,p+n+'/'):[p+n];});
const actual=walk('_site');if(actual.sort().join('\n')!==[...m.files].sort().join('\n'))throw Error('Output inventory mismatch');
for(const f of m.files)if(sha(read('_site/'+f))!==m.sha256[f])throw Error('Output hash mismatch '+f);
console.log('Verified exact 294-file, 36-page reviewed static release. No commerce activation.');
