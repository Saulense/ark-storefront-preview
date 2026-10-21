import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const root=path.resolve('_site'),items=JSON.parse(fs.readFileSync('changes131.json','utf8')),hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const prepared=items.map(c=>{
 const target=path.resolve(root,c.file);if(!target.startsWith(root+path.sep))throw Error('Invalid path');
 if(c.before===null?fs.existsSync(target):!fs.existsSync(target)||hash(fs.readFileSync(target))!==c.before)throw Error('Baseline mismatch '+c.file);
 return{target,data:c.encoding==='base64'?Buffer.from(c.content,'base64'):c.content};
});
for(const c of prepared){fs.mkdirSync(path.dirname(c.target),{recursive:true});fs.writeFileSync(c.target,c.data);if(hash(fs.readFileSync(c.target))!==hash(c.data))throw Error('Readback mismatch');}
console.log('Applied '+prepared.length+' reviewed gallery files');
