/* Shared responsive additions. One bounded animation; no network or commerce. */
(()=>{
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const grid=document.querySelector('.home-stat-grid67');
  if(!grid)return;
  const cards=[...grid.children],values=cards.map(x=>x.querySelector('strong'));
  const originals=values.map(x=>x.textContent);
  const lines=[['Happy Customers','Worldwide'],['Countries Reached','& Growing'],['Drops Taken','Every Minute'],['Repeat Purchase','Rate']];
  const badges=[['neurofuel-kit','BEST-SELLER!'],['ark-melts-energy-focus-mint-extra-strong','EXTRA STRONG']];
  let observer=null,frame=0,finished=false;
  function finish(){cancelAnimationFrame(frame);frame=0;values.forEach((x,i)=>x.textContent=originals[i]);}
  function animate(){
    if(finished)return;
    finished=true;
    if(reduced.matches||document.hidden){finish();return;}
    let start=null,frames=0;
    function tick(now){
      if(reduced.matches||document.hidden){finish();return;}
      start??=now;
      const progress=Math.min((now-start)/1100,1),ease=1-Math.pow(1-progress,3);
      values.forEach((el,i)=>el.textContent=String(Math.round(parseFloat(originals[i])*ease))+originals[i].replace(/[\d.]/g,''));
      if(progress<1&&++frames<120)frame=requestAnimationFrame(tick);else finish();
    }
    frame=requestAnimationFrame(tick);
  }
  badges.forEach(([handle,text])=>{
    const card=document.querySelector('#favorites-rail67>a[href$="/products/'+handle+'/"]');
    if(card&&!card.querySelector('.home-product-badge71')){const badge=document.createElement('span');badge.className='home-product-badge71';badge.textContent=text;card.prepend(badge);}
  });
  cards.forEach((x,i)=>{
    const p=x.querySelector('p');p.replaceChildren();
    lines[i].forEach(text=>{const span=document.createElement('span');span.className='home-stat-line71';span.textContent=text;p.append(span);});
  });
  if(!reduced.matches&&'IntersectionObserver'in window){
    observer=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){observer.disconnect();animate();}},{threshold:.25});
    observer.observe(grid);
  }
  reduced.addEventListener('change',()=>{if(reduced.matches){observer?.disconnect();finished=true;finish();}});
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame)finish();});
})();
