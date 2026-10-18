import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';
import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),root=process.argv[2]||'_site',path=root+'/products/ark-hack-nose-dilator/index.html',before=read(path,'utf8');
if(sha(before)!=='0d85bb10ca0912f0ebea560db00588e1c317c259f901139f901abdb0e6c84c9c')throw Error('Hack baseline differs; reconcile instead of overwriting');
const assets={'ark-hack73.css':'ec43c4b635a3224cee2dedc3fdb0276789627560bdb516dff20fcdd4424706b9','ugc-youtube73.js':'8c3e1c616ba35435972dada22ef07a0754903ccd4aaef14790d075901c06d28c'};
for(const[name,expected]of Object.entries(assets))if(sha(read(name))!==expected)throw Error('Asset differs: '+name);
let html=before;
function once(a,b){if(html.split(a).length!==2)throw Error('Expected one source match: '+a.slice(0,80));html=html.replace(a,b);}
function section(id){const re=new RegExp('<section\\b[^>]*\\bid="'+id+'"[^>]*>[\\s\\S]*?<\\/section>','g'),m=[...html.matchAll(re)];if(m.length!==1)throw Error('Expected one section '+id);return m[0][0];}
const wrap=(id,cls,content)=>'<section id="'+id+'" class="section63 '+cls+'"><div class="inner63">'+content+'</div></section>';
const shapes={
 air:'<path class="icon-fill73" d="M19 7c1 9-1 15-5 22-2 4 0 9 5 9 3 5 10 5 13 0 5 0 7-5 4-9-4-6-6-13-6-22"/><path d="M18 33c2-3 4-2 5 1m5 0c1-3 3-4 5-1M6 17h7m-9 7h7m26-7h6m-4 7h5"/><path d="m9 14 4 3-4 3m31-6 3 3-3 3"/>',
 moon:'<path class="icon-fill73" d="M30 7A17 17 0 1 0 41 30 17 17 0 0 1 30 7Z"/><path d="m36 7 1.6 4.4L42 13l-4.4 1.6L36 19l-1.6-4.4L30 13l4.4-1.6ZM18 9l1 2m-8 8 2 1m3 15 2-1"/><circle cx="42" cy="22" r="1" fill="currentColor" stroke="none"/>',
 reuse:'<path d="M10 16A16 16 0 0 1 37 11l4 5m0-9v9h-9M38 32A16 16 0 0 1 11 37l-4-5m0 9v-9h9"/><path class="icon-fill73" d="M16 21c5-4 11-4 16 0l-2 10c-4-3-8-3-12 0Z"/><path d="M19 24c3-2 7-2 10 0"/>',
 focus:'<path class="icon-fill73" d="M23 10c-3-5-10-3-10 2-6 0-9 6-6 11-4 5-1 11 4 12 0 6 8 10 12 5Zm2 0c3-5 10-3 10 2 6 0 9 6 6 11 4 5 1 11-4 12 0 6-8 10-12 5Z"/><path d="M13 12c0 4 2 6 6 6M7 23c4-2 8 0 9 4m-5 8c1-4 3-5 7-5m17-18c0 4-2 6-6 6m12 5c-4-2-8 0-9 4m5 8c-1-4-3-5-7-5M24 4V1m-9 5-2-3m20 3 2-3"/>',
 fit:'<path class="icon-fill73" d="M20 7c0 9-1 15-5 22-3 5 0 9 5 9 2 4 7 4 9 0 5 0 8-4 5-9-4-7-5-13-5-22"/><rect x="8" y="22" width="9" height="12" rx="3" transform="rotate(12 12 28)"/><rect x="32" y="22" width="9" height="12" rx="3" transform="rotate(-12 36 28)"/><path d="m18 27 5-2 7 2M9 10l-4 3m35-3 4 3"/>',
 move:'<path class="icon-fill73" d="m27 4-17 24h13l-2 16 17-25H26Z"/><path d="m10 8-3-3M4 20h5m30 20 3 3m-3-13h5"/>',
 setup:'<rect class="icon-fill73" x="5" y="27" width="10" height="15" rx="4" transform="rotate(12 10 34)"/><rect class="icon-fill73" x="33" y="27" width="10" height="15" rx="4" transform="rotate(-12 38 34)"/><path class="icon-fill73" d="M11 21c8-7 18-7 26 0l-3 9c-6-5-14-5-20 0Z"/><path d="M17 7v6m14-6v6m-7-9v7m-5-1 5 5 5-5M18 23c4-2 8-2 12 0"/>'
};
const svg=key=>'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+shapes[key]+'</svg>';
const icon=key=>'<span class="hack-icon73" aria-hidden="true">'+svg(key)+'</span>';
once('class="product-page66 site63 product-system66 "','class="product-page66 site63 product-system66 hack-page73"');
const benefitUl=html.match(/<ul class="hero-benefits63">[\s\S]*?<\/ul>/)[0];
once(benefitUl,'<ul class="hero-benefits63"><li>'+svg('air')+'Supports nasal airflow</li><li>'+svg('moon')+'Made for restful routines</li><li>'+svg('reuse')+'Reusable for everyday use</li></ul>');
const plan=html.match(/<button class="plan63 is-selected" data-mode63="once">[\s\S]*?<\/button>/)[0];
once(plan,'<div class="hack-price73"><div><span class="price-label73">Your selected pack</span><span class="price-note73">One-time purchase · No subscription</span></div><div><strong data-price63="once"></strong><small data-reference63="once"></small></div></div>');
const clarity=section('image_with_text_mU6ndD'),photo=clarity.match(/<img class="clarity-photo66"[^>]*>/)[0].replace('class="clarity-photo66"','class=""').replace('alt="Mobile image"','alt="Reusable ARK Hack nasal dilator"');
once(clarity,wrap('image_with_text_mU6ndD','hack-clarity73','<div class="hack-clarity-layout73"><div class="hack-clarity-photo73">'+photo+'</div><div class="hack-clarity-copy73"><h2>UNLOCK YOUR BREATH.<br><span>FIND YOUR FLOW.</span></h2><p>Make room for easier nasal breathing. A reusable magnetic dilator for your wind-down, workout and everyday routine.</p></div></div><ul class="hack-highlights73">'+[['air','Easier nasal breathing'],['moon','Made for wind-down'],['reuse','Reusable by design'],['focus','Ready for your routine']].map(([key,text])=>'<li>'+icon(key)+'<h3>'+text+'</h3></li>').join('')+'</ul>'));
let stories=section('multicolumn_jaNd6U');
const storyCopy=[['Instant Focus &amp; Clarity','Room to Breathe','Gentle outward support helps open the nasal passages for easier airflow.'],['Deeper, Better Sleep','Your Night-Time Ritual','A simple addition to your wind-down routine, designed for comfortable wear.'],['Natural Energy Boost','Ready for Movement','Use during workouts, walks or everyday activity — without another drink or supplement.'],['Effortless Breathing Anytime','Small Tool. Daily Routine.','Reusable dilator, fresh adhesive tabs. Simple to fit into the moments that matter.']];
for(const[a,b,c]of storyCopy){stories=stories.replace('<h3>'+a+'</h3>','<h3>'+b+'</h3>');}
let storyIndex=0;stories=stories.replace(/(<article class="card63">[\s\S]*?<h3>[^<]*<\/h3>)<p>[\s\S]*?<\/p>/g,(_,prefix)=>prefix+'<p>'+storyCopy[storyIndex++][2]+'</p>');
if(storyIndex!==4)throw Error('Expected four benefit stories');
let altIndex=0;stories=stories.replace(/(<article class="card63"><img\b[^>]*\balt=")[^"]*(")/g,(_,a,b)=>a+storyCopy[altIndex++][1]+b);
if(altIndex!==4)throw Error('Expected four benefit image labels');
once(section('multicolumn_jaNd6U'),stories);
once(section('image_with_text_EeYBbB'),wrap('image_with_text_EeYBbB','hack-benefits73','<h2>SMALL HACK.<br><span>MORE ROOM TO BREATHE.</span></h2><p>A simple tool, designed to work with your everyday rhythm.</p><div class="hack-benefit-grid73">'+[['reuse','Reusable design','Keep the nasal bridge. Replace the adhesive tabs as directed.'],['fit','Comfortable fit','Use the size guide to find the fit that feels right for you.'],['air','Supports nasal airflow','Gentle outward support, without putting anything inside your nose.'],['moon','Made for wind-down','A lightweight addition to your evening routine.'],['move','Ready for movement','Wear it for workouts, walks and daily activities.'],['setup','Simple daily setup','Apply the tabs, attach the bridge and breathe naturally.']].map(([key,title,text])=>'<article>'+icon(key)+'<h3>'+title+'</h3><p>'+text+'</p></article>').join('')+'</div>'));
let steps=section('video_with_text_kXWepE');
steps=steps.replace('Apply the TabAttach the DilatorTake a Deep Breathe in','<ol class="hack-steps73"><li><div><h3>Apply the tabs</h3><p>Start with clean, dry skin. Place the adhesive tabs on either side of your nose.</p></div></li><li><div><h3>Attach the dilator</h3><p>Connect the magnetic bridge to the tabs and adjust it for a comfortable fit.</p></div></li><li><div><h3>Take a natural breath</h3><p>Check the fit, breathe normally and carry on with your routine.</p></div></li></ol>');
once(section('video_with_text_kXWepE'),steps);
const expert=section('image_with_text_overlay_zFeRwk'),folder=expert.match(/<img class="editorial-image63"[^>]*>/)[0].replace('class="editorial-image63"','class=""').replace('alt="Mobile image"','alt="" aria-hidden="true"');
once(expert,wrap('image_with_text_overlay_zFeRwk','hack-expert73','<article class="hack-file73">'+folder+'<h2>EXPERT INSIGHT ON<br>BETTER BREATHING</h2><blockquote>“There’s a clear link between proper breathing and overall well-being. ARK Hack supports natural airflow, making breathing feel effortless and improving focus, sleep, and daily performance.”</blockquote><p class="expert-attribution73">— Dr. Mark Evans, Breath &amp; Wellness Specialist</p><p class="expert-note73">Based on user experiences and expert observations in breathing performance, sleep quality, and daily energy.</p></article>'));
once(section('advanced_content_grid_6dzBjf'),'');
const ugc=section('shoppable_media_z4MDcn'),ids=[...ugc.matchAll(/data-youtube="([\w-]{11})"/g)].map(x=>x[1]);
if(ids.length!==9||new Set(ids).size!==9)throw Error('Expected nine original Hack video IDs');
const play='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z" fill="currentColor"/></svg>';
once(ugc,'<section id="shoppable_media_z4MDcn" class="ark-video-study62" data-provider73="youtube"><div class="ark-video-inner62"><header><h2>THE RITUAL, IN REAL LIFE</h2><p>ARK Hack, in everyday moments. Watch the community put it to use.</p></header><div id="ugc-rail62" class="ark-video-rail62" role="region" aria-label="ARK Hack customer videos" tabindex="0">'+ids.map((id,i)=>'<article class="video-card62" data-youtube73="'+id+'"><img class="video-poster73" src="https://img.youtube.com/vi/'+id+'/maxresdefault.jpg" alt="ARK Hack customer video '+(i+1)+'" loading="lazy" decoding="async"><button class="video-play62" type="button" aria-label="Play customer video '+(i+1)+'"><span>'+play+'</span></button><div class="video-tools62"><button class="video-expand62" type="button" aria-label="Expand customer video '+(i+1)+'">⛶</button></div></article>').join('')+'</div><div class="ark-review-controls"><button class="video-prev62" type="button" aria-label="Previous videos">‹</button><span class="video-position62" aria-live="polite">Video 1 of 9</span><button class="video-next62" type="button" aria-label="Next videos">›</button></div></div></section>');
once('<script defer src="/ark-storefront-preview/video-slider62.js?v=67h"></script>','<script defer src="/ark-storefront-preview/ugc-youtube73.js?v=73"></script>');
once('</body>','<link rel="stylesheet" href="/ark-storefront-preview/ark-hack73.css?v=73"></body>');
if(html.match(/<script type="application\/json" id="product63">[\s\S]*?<\/script>/)[0]!==before.match(/<script type="application\/json" id="product63">[\s\S]*?<\/script>/)[0])throw Error('Product data changed');
for(const name of Object.keys(assets))copy(name,root+'/'+name);
write(path,html);
console.log('Applied Hack design73; source product data and other pages preserved.');
