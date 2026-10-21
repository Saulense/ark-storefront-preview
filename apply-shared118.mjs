import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const changes=JSON.parse(fs.readFileSync('changes118.json','utf8'));
for(const c of changes){if(c.file.includes('..')||path.isAbsolute(c.file))throw Error('Invalid path');const p=path.join('_site',c.file);const actual=fs.existsSync(p)?hash(fs.readFileSync(p)):null;if(actual!==c.before)throw Error('Baseline changed: '+c.file);}
for(const c of changes)fs.writeFileSync(path.join('_site',c.file),c.content);
console.log('Applied shared purchase corrections and dated review snapshots.');
