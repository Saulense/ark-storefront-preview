import{readFileSync as read,writeFileSync as write,copyFileSync as copy}from'node:fs';
import{createHash}from'node:crypto';
const sha=x=>createHash('sha256').update(x).digest('hex'),root=process.argv[2]||'_site',index=root+'/index.html',before=read(index,'utf8'),sheet=read('home-captions80.css');
if(sha(before)!=='825288209ad66d4e10cee11f7ccfbac0fb982d421df8120da10623e6e6d5eb54'||sha(sheet)!=='09331d9474f66d73fe1ad49bdbe57baac960fe2dd604066afb558c2bbab30612')throw Error('Homepage80 pinned inputs differ; reconcile before writes');
if(before.split('</body>').length!==2||before.includes('home-captions80.css'))throw Error('Unexpected homepage80 structure');
const after=before.replace('</body>','<link rel="stylesheet" href="/ark-storefront-preview/home-captions80.css?v=80"></body>');
copy('home-captions80.css',root+'/home-captions80.css');write(index,after);
console.log('Applied homepage80 caption contrast; all other page content preserved.');
