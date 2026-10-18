// Deterministic post-extraction overlay. Previous reviewed archives stay immutable.
import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';
import{createHash}from'node:crypto';
const sha=b=>createHash('sha256').update(b).digest('hex');
const root=process.argv[2]||'_site',index=root+'/index.html',before=read(index,'utf8');
if(sha(before)!=='9d118407e1ceb12fe8becafd2c616ca3a0c4fde4ed5065ee273632d5117e72ac')throw Error('Homepage baseline differs; reconcile, do not overwrite');
const assets={'mobile-home71.css':'adc34520b9c862193797ca0ecae8292f8ed0c53263cc5fe99249088cf7add91e','mobile-home71.js':'dc00d59b98b4a44f33ba0d6fba50d038a22c9f40ef92d81998fae702daac25fa'};
for(const[name,expected]of Object.entries(assets)){if(sha(read(name))!==expected)throw Error('Overlay asset differs: '+name);copy(name,root+'/'+name);}
const tags='<link rel="stylesheet" href="/ark-storefront-preview/mobile-home71.css?v=71"><script defer src="/ark-storefront-preview/mobile-home71.js?v=71"></script>';
if(before.split('</body>').length!==2)throw Error('Unexpected homepage body');
write(index,before.replace('</body>',tags+'</body>'));
console.log('Applied mobile-only homepage overlay; all other baseline files preserved.');
