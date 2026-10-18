import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),root=process.argv[2]||'_site',path=root+'/products/nose-strips/index.html',before=read(path,'utf8');
if(sha(before)!=='402a6aabcdd633655e00a39bd919cd4260c57e0cb8039d4a12f8dd8a2ed26c2f'||sha(read('nasal-palette82.css'))!=='ea4441cd4e4b9df89895b32fa64fdf01bc9007ffa461193fa81fcdf2680d25c6')throw Error('Nasal82 pinned input differs; reconcile before writes');
let html=before;function once(a,b){if(html.split(a).length!==2)throw Error('Unexpected Nasal82 unique match');html=html.replace(a,b);}
once('shared-product79 breathing-page79"','shared-product79 breathing-page79 nasal-page82"');
once('<h2>INSTANT AIRWAY UPGRADE</h2>','<h2>INSTANT <span>AIRWAY UPGRADE</span></h2>');
once('<h2>LOVED BY BREATHERS WORLDWIDE</h2>','<h2>LOVED BY <span>BREATHERS WORLDWIDE</span></h2>');
const start=html.indexOf('<section class="section63 clarity66"'),end=html.indexOf('</section>',start);if(start<0||end<start)throw Error('Missing clarity section');const old=html.slice(start,end),paths=[
 '<path d="M9 3c0 7-4 9-4 13 0 3 4 4 7 1 3 3 7 2 7-1 0-4-4-6-4-13M8 16h1m6 0h1"/>',
 '<path d="M19 15a8 8 0 0 1-10-10 8 8 0 1 0 10 10Z"/><path d="M16 3h4l-4 4h4"/>',
 '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
 '<path d="M9 3v7c0 2-3 3-3 6 0 2 3 3 5 1M14 9h5a2 2 0 1 0-2-2M14 13h7M14 17h4a2 2 0 1 1-2 2"/>'
];let n=0;const next=old.replace(/(<div class="clarity-icon66">)<img\b[^>]*>/g,(_,prefix)=>{if(n>=paths.length)throw Error('Too many clarity icons');return prefix+'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+paths[n++]+'</svg>';});if(n!==4)throw Error('Expected four clarity icons');once(old,next);
if(html.split('</body>').length!==2||html.includes('nasal-palette82.css'))throw Error('Unexpected Nasal82 body');
html=html.replace('</body>','<link rel="stylesheet" href="/ark-storefront-preview/nasal-palette82.css?v=82"></body>');
const product=s=>s.match(/<script type="application\/json" id="product63">[\s\S]*?<\/script>/)?.[0];if(product(before)!==product(html))throw Error('Nasal82 commerce differs');
copy('nasal-palette82.css',root+'/nasal-palette82.css');write(path,html);console.log('Applied one Nasal82 page palette/clarity refinement; preserved commerce and all other routes.');
