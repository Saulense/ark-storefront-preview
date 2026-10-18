import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';
import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),root=process.argv[2]||'_site',path=root+'/products/the-sacred-pair/index.html',before=read(path,'utf8');
if(sha(before)!=='150c2c4d09558087850d8353d29fe7f97e16599c23048e0d5747711e231d3413')throw Error('Sacred78 baseline differs');
if(sha(read('sacred-pair78.css'))!=='8133568d9a264f156dd80520530320e78ff3131e60cb039958b53b3f22b90f5b')throw Error('Sacred78 CSS differs');
let html=before;
function once(a,b){if(!a||html.split(a).length!==2)throw Error('Expected one Sacred78 source match');html=html.replace(a,b);}
function section(id){const matches=[...html.matchAll(new RegExp('<section\\b[^>]*id="'+id+'"[^>]*>[\\s\\S]*?<\\/section>','g'))];if(matches.length!==1)throw Error('Expected one Sacred78 section '+id);return matches[0][0];}
once('product-system66 sacred63"','product-system66 sacred63 sacred-page78"');
once('<small>14 Mind + 14 Energy · Total 28 bars</small>','<small><span>14 Mind + 14 Energy</span><span>28 bars total</span></small>');
once('<small>28 Mind + 28 Energy · Total 56 bars</small>','<small><span>28 Mind + 28 Energy</span><span>56 bars total</span></small>');
once('Features compared with ARK compared with OTHERS','Features compared: ARK and other ceremonial cacao');
once('<th scope="col" class="">OTHERS</th>','<th scope="col" class="">Other ceremonial cacao</th>');
once('BETTER THAN PILLS, BETTER <span>THEN GUMMIES</span>','BETTER THAN PILLS, BETTER <span>THAN GUMMIES</span>');
once('Drink it like rich hot chocolateEat it like a satisfying snack','<ul class="sacred-ways78" aria-label="Two ways to enjoy"><li>Drink it like rich hot chocolate</li><li>Eat it like a satisfying snack</li></ul>');
const oldReview=section('rich_text_VYXLtn'),handoff=section('177598104161bafece'),link=handoff.match(/<a class="button63" href="\/ark-storefront-preview\/pages\/all-reviews\/">Read customer reviews<\/a>/)?.[0];
if(!oldReview.includes('Customer reviews ⭐⭐⭐⭐⭐ (4.8)')||!link)throw Error('Sacred78 review source differs');
once(oldReview,oldReview.slice(0,oldReview.indexOf('<div class="inner63">'))+'<div class="inner63"><div class="sacred-review78"><p class="review-eyebrow78">THE SACRED PAIR</p><h2>LOVED BY CUSTOMERS WORLDWIDE</h2><div class="sacred-review-score78"><span class="sacred-stars78" aria-hidden="true">★★★★★</span><p><strong>4.8<span> / 5</span></strong><span>Customer reviews</span></p></div>'+link+'</div></div></section>');
once(handoff,'');
once('<link rel="stylesheet" href="/ark-storefront-preview/shared-sections76.css?v=76">','<link rel="stylesheet" href="/ark-storefront-preview/sacred-pair78.css?v=78"><link rel="stylesheet" href="/ark-storefront-preview/shared-sections76.css?v=76">');
const product=s=>s.match(/<script type="application\/json" id="product63">[\s\S]*?<\/script>/)?.[0];
if(product(before)!==product(html))throw Error('Sacred78 commerce changed');
copy('sacred-pair78.css',root+'/sacred-pair78.css');write(path,html);console.log('Applied nine scoped Sacred Pair78 refinements; source product data and media preserved.');
