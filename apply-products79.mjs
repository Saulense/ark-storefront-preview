import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';
import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),root=process.argv[2]||'_site',manifestText=read('baseline79.json','utf8'),sheet=read('product-consistency79.css','utf8');
if(sha(manifestText)!=='8bb19901f527286b3a8b0353489ebc898f7ad0969c85524be7818215b65b11a3'||sha(sheet)!=='f3314f3f2f58e0ec81689539fb77b3d1477468011af786b33cbb247987645fdc')throw Error('Product79 pinned input differs');
const manifest=JSON.parse(manifestText),pending=[];if(Object.keys(manifest).length!==12)throw Error('Expected twelve matching section pages');
for(const[path,expected]of Object.entries(manifest)){
 const before=read(root+'/'+path,'utf8');if(sha(before)!==expected)throw Error('Product79 baseline differs: '+path);let html=before;
 const family=/products\/(mouth-tape|nose-strips|sleep-bundle)\//.test(path),light=/products\/(mouth-tape|sleep-bundle)\//.test(path);
 function once(a,b){if(!a||html.split(a).length!==2)throw Error('Expected unique Product79 match: '+path);html=html.replace(a,b);}
 const sections=()=>[...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)].map(m=>m[0]);
 const body=html.match(/<body\b[^>]*class="([^"]+)"/)?.[1];if(!body)throw Error('Missing product body');once('class="'+body+'"','class="'+body+' shared-product79'+(family?' breathing-page79':'')+'"');
 let reviews=sections().filter(s=>s.includes('class="section63 text63"')&&s.includes('4.8 · 11,432 Reviews')),handoffs=sections().filter(s=>s.includes('review-handoff63'));if(reviews.length!==(path.startsWith('products/')?1:0)||handoffs.length!==reviews.length)throw Error('Unexpected original review count: '+path);
 if(reviews.length){
 const old=reviews[0],handoff=handoffs[0],title=old.match(/<h2>([\s\S]*?)<\/h2>/)?.[1].replace(/<\/?span\b[^>]*>/g,''),link=handoff.match(/<a class="button63" href="\/ark-storefront-preview\/pages\/all-reviews\/">Read customer reviews<\/a>/)?.[0],name=html.match(/<h1>([\s\S]*?)<\/h1>/)?.[1];if(!title||!link||!name)throw Error('Missing review source content');
 once(old,old.slice(0,old.indexOf('<div class="inner63">')).replace('class="section63 text63"','class="section63 text63 review-section79"')+'<div class="inner63"><div class="shared-review79"><p class="review-eyebrow79">'+name+'</p><h2>'+title+'</h2><div class="review-score79"><span class="review-stars79" aria-hidden="true">★★★★★</span><p><strong>4.8<span> / 5</span></strong><span>11,432 reviews</span></p></div>'+link+'</div></div></section>');once(handoff,'');
 }
 for(const section of sections().filter(s=>s.includes('class="product-grid63"'))){let count=0,next=section.replace('class="section63 shop-grid63"','class="section63 shop-grid63 recommendations79"').replace(/<span class="tile-arrow63" aria-hidden="true">↗<\/span>/g,()=>{count++;return'<span class="buy-now79">Buy now</span>';});if(!count||!next.includes('recommendations79'))throw Error('Unexpected recommendation markup');once(section,next);}
 if(family){
  if(path.includes('/mouth-tape/'))once('<h2>TINY TAPE, BIG CHANGE</h2>','<h2>TINY TAPE, <span>BIG CHANGE</span></h2>');
  if(light)once('class="section63 benefits66"','class="section63 benefits66 benefits-light79"');
  const stories=sections().filter(s=>s.includes('class="section63 stories63"'));if(stories.length!==1)throw Error('Expected one family photo rail');let count=0;
  const next=stories[0].replace(/(<article class="card63">)(<img\b[^>]*>)(<span class="number63">\d+<\/span>)/g,(_,a,img,number)=>{count++;return a+'<div class="story-media79">'+img+number+'</div>';});if(!count)throw Error('Missing family photo badges');once(stories[0],next);
 }
 once('<link rel="stylesheet" href="/ark-storefront-preview/shared-sections76.css?v=76">','<link rel="stylesheet" href="/ark-storefront-preview/product-consistency79.css?v=79"><link rel="stylesheet" href="/ark-storefront-preview/shared-sections76.css?v=76">');
 const product=s=>s.match(/<script type="application\/json" id="product63">[\s\S]*?<\/script>/)?.[0];if(product(before)!==product(html))throw Error('Product79 commerce changed');pending.push([path,html]);
}
copy('product-consistency79.css',root+'/product-consistency79.css');for(const[path,html]of pending)write(root+'/'+path,html);console.log('Applied Product79 to twelve audited matching section pages; all preflight checks complete before writes.');
