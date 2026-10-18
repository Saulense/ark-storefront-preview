import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';
import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),root=process.argv[2]||'_site',baseline=read('baseline-sections76.json','utf8');
if(sha(baseline)!=='144ed8a541b182b9c164bbd7cb408d64e9467505a619845151069ff16565d3fa')throw Error('Section76 route manifest differs');
const manifest=JSON.parse(baseline),css=read('shared-sections76.css');
if(sha(css)!=='f0494b0bdb4f50e0cda41c9f1af4d2438040a08c9c04920c15e6877782256021'||Object.keys(manifest).length!==36)throw Error('Section76 asset or route count differs');
const pending=[];
for(const[route,expected]of Object.entries(manifest)){
 const before=read(root+'/'+route,'utf8');
 if(sha(before)!==expected)throw Error('Section76 baseline differs: '+route);
 const trust=before.match(/<section class="footer-trust67"[\s\S]*?<\/section>/g);
 if(trust?.length!==1||sha(trust[0])!=='fe9ac31c342e5b1a1a14747afa85778867701b97650399f40f3c4f9bef68f11b')throw Error('Shared trust anatomy differs: '+route);
 if(before.split('</body>').length!==2||before.includes('shared-sections76.css'))throw Error('Unexpected body or duplicate Section76 asset');
 let after=before;
 if(route==='products/ark-hack-nose-dilator/index.html'){
  const old=before.match(/<section\b[^>]*id="featured_collection_RNQfcG"[^>]*>[\s\S]*?<\/section>/g);
  if(old?.length!==1)throw Error('Hack recommendations missing');
  const heading=old[0].match(/<h2>[\s\S]*?<\/h2>/)?.[0],intro=old[0].match(/<p class="intro63">[\s\S]*?<\/p>/)?.[0],cards=[...old[0].matchAll(/<a class="product-tile63" href="([^"]+)">([\s\S]*?)<\/a>/g)];
  if(!heading||!intro||cards.length!==2)throw Error('Expected two source recommendations');
  const content=cards.map(([,href,card])=>{
   const img=card.match(/<img\b[^>]*>/)?.[0],name=card.match(/<h3>[\s\S]*?<\/h3>/)?.[0],price=card.match(/<span>(£[\d.,]+)<\/span>/)?.[1];
   if(!img||!name||!price||!href.startsWith('/ark-storefront-preview/products/'))throw Error('Recommendation source incomplete');
   return'<a class="related-product76" href="'+href+'">'+img+name+'<span class="related-price76">'+price+'</span><span class="home-buy67">Buy now</span></a>';
  }).join('');
  after=after.replace(old[0],'<section id="featured_collection_RNQfcG" class="section63 related-products76"><div class="inner63"><header>'+heading+intro+'</header><div class="related-grid76">'+content+'</div></div></section>');
 }
 after=after.replace('</body>','<link rel="stylesheet" href="/ark-storefront-preview/shared-sections76.css?v=76"></body>');
 pending.push([root+'/'+route,after]);
}
copy('shared-sections76.css',root+'/shared-sections76.css');
for(const[path,html]of pending)write(path,html);
console.log('Applied one shared trust stylesheet across36pages and unframed Hack recommendations; no commerce data changes.');
