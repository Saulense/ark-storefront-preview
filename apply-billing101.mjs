import{readFileSync as read,writeFileSync as write}from'node:fs';import{createHash}from'node:crypto';
const root=process.argv[2]||'_site',sha=x=>createHash('sha256').update(x).digest('hex'),bytes=read('changes101.json');
if(sha(bytes)!=='67d738f1090dacdfc0e11bdb46aa557ba8d31526206d20bbf62997b0842c5f3a')throw Error('Billing101 manifest differs');
const fix=s=>s.replaceAll(/(\.native-select64:has\(>select:focus-visible\)\{)outline:2px solid (?:currentColor|#405216);outline-offset:3px;/g,'$1outline:none;text-decoration:underline;text-underline-offset:3px;').replaceAll(/(\.billing-pill(?:62)?:has\(select:focus-visible\)\{)outline:2px solid #405216;outline-offset:3px/g,'$1outline:none');
const outputs=[];for(const item of JSON.parse(bytes)){
 const before=read(root+'/'+item.path);if(sha(before)!==item.before)throw Error('Billing101 baseline differs '+item.path);let s=before.toString();
 if(['accessibility64.js','accessibility64.css','catalog62.css','products/ark-drops-lemon-ice/index.html'].includes(item.path))s=fix(s);
 if(item.path.endsWith('.html'))s=s.replaceAll(/((?:accessibility64\.(?:js|css)|catalog62\.css)\?v=)[^"'<>\s]+/g,'$1'+'101');
 if(sha(s)!==item.after)throw Error('Billing101 output differs '+item.path);outputs.push([item.path,s]);
}for(const [f,s]of outputs)write(root+'/'+f,s);console.log('Billing101: no billing interaction outlines, keyboard underline retained, native controls unchanged.');
