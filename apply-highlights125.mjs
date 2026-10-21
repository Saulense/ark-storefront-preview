import fs from'node:fs';import path from'node:path';import crypto from'node:crypto';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex'),changes=JSON.parse(fs.readFileSync('changes125.json','utf8'));
for(const c of changes){if(path.isAbsolute(c.file)||c.file.includes('..'))throw Error('Invalid path');const p=path.join('_site',c.file);if(c.before===null){if(fs.existsSync(p))throw Error('Unexpected existing file '+c.file);}else if(!fs.existsSync(p)||hash(fs.readFileSync(p))!==c.before)throw Error('Baseline mismatch '+c.file);}
for(const c of changes)fs.writeFileSync(path.join('_site',c.file),c.content);
