import{readFileSync as read,writeFileSync as write,existsSync as exists}from'node:fs';import{createHash}from'node:crypto';
const root=process.argv[2]||'_site',route='products/ark-melts-energy-focus-mint-extra-strong/index.html',sha=x=>createHash('sha256').update(x).digest('hex');
const pins={'melts-premium99.html':'aec8b571e82253aaf8a0818161e7a4dc803e40168eeac837d45cdd21c324f8aa','melts-premium99.css':'a9282c0eff496d646cc8602d5c641664145334d37ed232190a2209dee0529bc2','melts-extra-pack99.png':'7a467f18f09068636185a1e04160f095c4f5ac1e60d724a870f0a91509dc907f'},payload={};
for(const[f,pin]of Object.entries(pins)){payload[f]=read(f);if(sha(payload[f])!==pin)throw Error('Melts99 payload differs '+f);}
if(sha(read(root+'/'+route))!=='79c09b28ed01351a93417bff985a11dc4a567f6fdd2272320f27b1170703cd14')throw Error('Melts99 baseline differs');
if(exists(root+'/melts-premium99.css')||exists(root+'/assets/melts-extra-pack99.png'))throw Error('Melts99 asset exists');
write(root+'/melts-premium99.css',payload['melts-premium99.css']);write(root+'/assets/melts-extra-pack99.png',payload['melts-extra-pack99.png']);write(root+'/'+route,payload['melts-premium99.html']);
console.log('Melts99: Extra Strong ritual, uploaded pack and balanced comparison only.');
