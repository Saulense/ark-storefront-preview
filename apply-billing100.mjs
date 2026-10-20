import {readFileSync as read,writeFileSync as write} from 'node:fs';
import {createHash} from 'node:crypto';
const root=process.argv[2]||'_site',sha=x=>createHash('sha256').update(x).digest('hex');
const manifestBytes=read('changes100.json');
if(sha(manifestBytes)!=='c1bc2d20fd8eba07ccce1af6fa490948e9d39b72d02fc95aeafbda5dedce35a3')throw Error('Billing100 manifest differs');
const manifest=JSON.parse(manifestBytes);
const oldFocus='.native-select64:focus-within{outline:2px solid ',newFocus='.native-select64:has(>select:focus-visible){outline:2px solid ';
const nested='.billing-pill>.native-select64:focus-within,.billing-pill62>.native-select64:focus-within{outline:none}';
const fix=s=>{if(!s.includes(oldFocus))throw Error('Missing focus contract');return s.replaceAll(oldFocus,newFocus).replaceAll('outline-offset:3px;border-radius:12px}', 'outline-offset:3px;border-radius:12px}'+nested);};
const outputs=[];
for(const item of manifest){
 const before=read(root+'/'+item.path);if(sha(before)!==item.before)throw Error('Billing100 baseline differs '+item.path);
 let s=before.toString();
 if(item.path==='accessibility64.js'||item.path==='accessibility64.css')s=fix(s);
 if(item.path.endsWith('.html')){
  s=s.replaceAll(/(accessibility64\.(?:js|css)\?v=)[^"'<>\s]+/g,'$1'+'100');
  if(item.path==='products/ark-drops-lemon-ice/index.html')s=fix(s);
 }
 if(sha(s)!==item.after)throw Error('Billing100 output differs '+item.path);
 outputs.push([item.path,s]);
}
for(const [path,content] of outputs)write(root+'/'+path,content);
console.log('Billing100: one keyboard-visible focus ring per billing pill; native options, events and all commerce data unchanged.');
