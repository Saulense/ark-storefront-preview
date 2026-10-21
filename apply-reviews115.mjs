import fs from 'node:fs';
const root=process.argv[2]||'_site',file=root+'/home-favorites111.css';
const css=fs.readFileSync(file,'utf8'),html=fs.readFileSync(root+'/index.html','utf8');
if(css.includes('Reviews115')||!html.includes('home-favorites111.css?v=114'))throw Error('Unexpected homepage baseline');
fs.writeFileSync(file,css+'\n/* Reviews115: clip moving review cards at viewport edges, not the text gutter. */\n@media(max-width:767px){.home67 .home-reviews67 .ark-review-track{width:calc(100% + 40px);max-width:none;margin-inline:-20px!important;padding-inline:20px!important;scroll-padding-inline:20px;grid-auto-columns:calc(86vw - 39.56px)!important}}\n');
fs.writeFileSync(root+'/index.html',html.replace('home-favorites111.css?v=114','home-favorites111.css?v=115'));
console.log('Reviews115: mobile review rail full bleed; desktop and card content unchanged.');
