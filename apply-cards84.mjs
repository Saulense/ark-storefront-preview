import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),root=process.argv[2]||'_site',manifestText=read('baseline84.json','utf8');
if(sha(manifestText)!=='424b8b9ba25fea891bf854d0619f6897988bff11df84416afaf0a33524dfa41d'||sha(read('shop-cards84.css'))!=='f66c6b372aed9a1961416db9e149ed951332c243032a66e1bbee1a8410d7cbc7')throw Error('Cards84 pinned input differs');
const manifest=JSON.parse(manifestText),pending=[];if(Object.keys(manifest).length!==13)throw Error('Expected13 card routes');let total=0,sectionCount=0,gridCount=0;
for(const[path,hash]of Object.entries(manifest)){
 const before=read(root+'/'+path,'utf8');if(sha(before)!==hash)throw Error('Cards84 baseline differs: '+path);let html=before;
 if(before.includes('shop-cards84.css')||before.split('</body>').length!==2)throw Error('Unexpected Cards84 structure');
 const body=before.match(/<body\b[^>]*>/)?.[0];if(!body||!body.includes('class="'))throw Error('Missing body class');
 html=html.replace(body,body.replace(/class="([^"]*)"/,(_,c)=>'class="'+c+' catalog-cards84'+(path.startsWith('collections/')||path==='pages/shop/index.html'?' catalog-page84':'')+'"'));
 let routeCards=0;
 html=html.replace(/<section\b[^>]*>[\s\S]*?<\/section>/g,section=>{
  if(!/class="(?:product-grid63|related-grid76)"/.test(section))return section;sectionCount++;
  let changed=section.replace(/(<section\b[^>]*\bclass=")([^"]+)(")/,(_,a,c,b)=>a+c+' catalog-section84'+b);
  changed=changed.replace(/class="(product-grid63|related-grid76)"/g,(_,c)=>{gridCount++;return'class="'+c+' catalog-grid84"';});
  let count=0;
  changed=changed.replace(/<a class="(product-tile63|related-product76)" href="([^"]+)">([\s\S]*?)<\/a>/g,(_,c,href,card)=>{
   if(!href.startsWith('/ark-storefront-preview/products/')||!card.includes('<h3>')||!card.includes('<img '))throw Error('Unexpected Cards84 item');
   const prices=card.match(/<span(?: class="related-price76")?>£[\d.,]+<\/span>/g),ctas=card.match(/<span class="(?:tile-arrow63|buy-now79|home-buy67)"(?: aria-hidden="true")?>(?:↗|Buy now)<\/span>/g);
   if(prices?.length!==1||ctas?.length!==1)throw Error('Expected one card price/CTA: '+path);
   const content=card.replace(prices[0],'').replace(ctas[0],'<span class="buy-now84">Buy now</span>');if(/£|↗/.test(content))throw Error('Card price/arrow retained');
   count++;routeCards++;total++;return'<a class="'+c+' catalog-card84" href="'+href+'">'+content+'</a>';
  });if(!count)throw Error('Empty Cards84 section');return changed;
 });if(!routeCards)throw Error('Missing Cards84 route');
 const product=s=>s.match(/<script type="application\/json" id="product63">[\s\S]*?<\/script>/)?.[0];if(product(before)!==product(html))throw Error('Cards84 purchase data differs');
 html=html.replace('</body>','<link rel="stylesheet" href="/ark-storefront-preview/shop-cards84.css?v=84"></body>');pending.push([path,html]);
}
if(total!==101||sectionCount!==13||gridCount!==18)throw Error('Cards84 inventory differs');
copy('shop-cards84.css',root+'/shop-cards84.css');for(const[path,html]of pending)write(root+'/'+path,html);
console.log('Applied Cards84:13 routes/18 grids/101 preserved items, no card prices/arrows; all preflight checks before writes.');
