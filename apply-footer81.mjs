import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';
import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),root=process.argv[2]||'_site',manifestText=read('baseline81.json','utf8');
if(sha(manifestText)!=='065dbac5c98acf30c85448abdc9d505e45c41b0f5e7ed498e3ce9dbb6ec756db')throw Error('Footer81 manifest differs');
const assets={'footer-carousel81.css':'71d26d8a8053ddd82620aa96ead526445758da74281b3f3bc5aa52f824a8f6c8','footer-carousel81.js':'9fe97d7bb1a38528a6cc955b4f85168431366a1393731ee2a5692294b6b977df'};
for(const[name,hash]of Object.entries(assets))if(sha(read(name))!==hash)throw Error('Footer81 asset differs: '+name);
const manifest=JSON.parse(manifestText),pending=[];if(Object.keys(manifest).length!==36)throw Error('Expected36 footer routes');
const arrow=direction=>'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+(direction==='prev'?'M15 5l-7 7 7 7':'M9 5l7 7-7 7')+'"/></svg>';
for(const[path,hash]of Object.entries(manifest)){
 const before=read(root+'/'+path,'utf8');if(sha(before)!==hash)throw Error('Footer81 baseline differs: '+path);
 const sections=before.match(/<section class="footer-trust67"[\s\S]*?<\/section>/g);if(sections?.length!==1||sha(sections[0])!=='fe9ac31c342e5b1a1a14747afa85778867701b97650399f40f3c4f9bef68f11b'||before.includes('footer-carousel81')||before.split('</body>').length!==2)throw Error('Footer81 anatomy differs: '+path);
 const old=sections[0],names=[...old.matchAll(/<h3>([^<]+)<\/h3>/g)].map(m=>m[1]);if(names.length!==4||old.split('</h2><div>').length!==2||!old.endsWith('</div></div></section>'))throw Error('Unexpected trust rail');
 const controls='<nav class="trust-controls81" aria-label="Why people choose us slides"><button type="button" class="trust-arrow81" data-trust-prev aria-label="Previous benefit" aria-controls="footer-trust-rail81" disabled>'+arrow('prev')+'</button><span class="trust-dots81" role="group" aria-label="Choose a benefit">'+names.map((name,i)=>'<button type="button" class="trust-dot81" aria-label="Show '+name+'" aria-controls="footer-trust-rail81"'+(i===0?' aria-current="true"':'')+'></button>').join('')+'</span><button type="button" class="trust-arrow81" data-trust-next aria-label="Next benefit" aria-controls="footer-trust-rail81">'+arrow('next')+'</button><span class="trust-status81" role="status" aria-live="polite" aria-atomic="true">1 of 4</span></nav>';
 let section=old.replace('</h2><div>','</h2><div class="trust-rail81" id="footer-trust-rail81" role="region" aria-label="Why people choose ARK. Scroll for more.">');section=section.slice(0,-16)+controls+'</div></section>';
 // Preserve all original card content; add controls after the rail, not inside it.
 if(section.match(/<article>/g)?.length!==4||!section.includes('</article></div><nav'))throw Error('Unexpected footer insertion');
 const tags='<link rel="stylesheet" href="/ark-storefront-preview/footer-carousel81.css?v=81"><script defer src="/ark-storefront-preview/footer-carousel81.js?v=81"></script>';
 const after=before.replace(old,section).replace('</body>',tags+'</body>');pending.push([path,after]);
}
for(const name of Object.keys(assets))copy(name,root+'/'+name);for(const[path,html]of pending)write(root+'/'+path,html);
console.log('Applied identical footer81 controls to36pages; all preflight checks complete before writes.');
