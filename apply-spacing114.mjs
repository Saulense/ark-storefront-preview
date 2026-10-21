import fs from 'node:fs';
const root=process.argv[2]||'_site';let restored=0;
const outputs=[];
for(const f of fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'))){let s=fs.readFileSync(root+'/'+f,'utf8');
 s=s.replace(/<button\b[^>]*type="submit"[^>]*>[\s\S]*?<\/button>/g,b=>{
  if(!/aria-label="(?:Sign up for early access|Subscribe to exclusive offers)"/.test(b)||(f==='index.html'&&b.includes('aria-label="Sign up for early access"')))return b;
  const n=b.replaceAll('M4 12h16M13 5l7 7-7 7','M5 19 19 5M5 5h14v14').replaceAll('→','↗');if(n!==b)restored++;return n;
 });
 if(f==='index.html')s=s.replace('home-favorites111.css?v=111','home-favorites111.css?v=114');
 outputs.push([root+'/'+f,s]);
}
if(restored!==38)throw Error('Unexpected excluded signup arrow count '+restored);
const sheet=root+'/home-favorites111.css',css=fs.readFileSync(sheet,'utf8');
if(css.includes('Spacing114'))throw Error('Already applied');
outputs.push([sheet,css+'\n/* Spacing114: additional breathing room above View all only. */\n#featured_collection_ywHzkV .home-inner67>.home-button67{margin-top:48px!important}\n@media(max-width:767px){#featured_collection_ywHzkV .home-inner67>.home-button67{margin-top:44px!important}}\n']);
for(const [f,s]of outputs)fs.writeFileSync(f,s);
console.log('Spacing114: homepage CTA spacing increased; footer and other signup arrows restored.');
