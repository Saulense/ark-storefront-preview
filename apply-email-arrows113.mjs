import fs from 'node:fs';
const root=process.argv[2]||'_site';
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'));
if(files.length!==36)throw Error('Unexpected page count');
const output=[];let count=0;
for(const f of files){const old=fs.readFileSync(root+'/'+f,'utf8');
 const next=old.replace(/<button\b[^>]*type="submit"[^>]*>[\s\S]*?<\/button>/g,b=>{
  if(!/aria-label="(?:Sign up for early access|Subscribe to exclusive offers)"/.test(b))return b;
  const n=b.replaceAll('M5 19 19 5M5 5h14v14','M4 12h16M13 5l7 7-7 7').replaceAll('↗','→');if(n!==b)count++;return n;
 });output.push([root+'/'+f,next]);
}
if(count!==39)throw Error('Unexpected signup arrow count '+count);
for(const [file,content] of output)fs.writeFileSync(file,content);
console.log('Email113: '+count+' signup arrows horizontal; form behavior unchanged.');
