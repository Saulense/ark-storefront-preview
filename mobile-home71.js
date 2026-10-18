/* Mobile-only additions; one bounded scroll animation, no network or commerce. */
(()=>{
  'use strict';
  const mobile=matchMedia('(max-width:767px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
  const grid=document.querySelector('.home-stat-grid67');
  if(!grid)return;
  const cards=[...grid.children],values=cards.map(x=>x.querySelector('strong'));
  const originals=values.map(x=>x.textContent),labels=cards.map(x=>x.querySelector('p').innerHTML);
  const lines=[['Happy Customers','Worldwide'],['Countries Reached','& Growing'],['Drops Taken','Every Minute'],['Repeat Purchase','Rate']];
  const badges=[['neurofuel-kit','BEST-SELLER!'],['ark-melts-energy-focus-mint-extra-strong','EXTRA STRONG']];
  let observer=null,frame=0,finished=false;
  function finish(){cancelAnimationFrame(frame);frame=0;values.forEach((x,i)=>x.textContent=originals[i]);}
  function animate(){
    if(finished||!mobile.matches)return;
    finished=true;
    if(reduced.matches||document.hidden){finish();return;}
    let start=null,frames=0;
    function tick(now){
      if(!mobile.matches||reduced.matches||document.hidden){finish();return;}
      start??=now;
      const progress=Math.min((now-start)/1100,1),ease=1-Math.pow(1-progress,3);
      values.forEach((el,i)=>el.textContent=String(Math.round(parseFloat(originals[i])*ease))+originals[i].replace(/[\d.]/g,''));
      if(progress<1&&++frames<120)frame=requestAnimationFrame(tick);else finish();
    }
    frame=requestAnimationFrame(tick);
  }
  function setup(){
    observer?.disconnect();finish();
    document.querySelectorAll('.home-product-badge71').forEach(x=>x.remove());
    cards.forEach((x,i)=>x.querySelector('p').innerHTML=labels[i]);
    if(!mobile.matches)return;
    badges.forEach(([handle,text])=>{
      const card=document.querySelector('#favorites-rail67>a[href$="/products/'+handle+'/"]');
      if(card){const badge=document.createElement('span');badge.className='home-product-badge71';badge.textContent=text;card.prepend(badge);}
    });
    cards.forEach((x,i)=>{
      const p=x.querySelector('p');p.replaceChildren();
      lines[i].forEach(text=>{const span=document.createElement('span');span.className='home-stat-line71';span.textContent=text;p.append(span);});
    });
    if(finished||reduced.matches||!('IntersectionObserver'in window))return;
    observer=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){observer.disconnect();animate();}},{threshold:.25});
    observer.observe(grid);
  }
  mobile.addEventListener('change',setup);
  reduced.addEventListener('change',()=>{if(reduced.matches)finish();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)finish();});
  setup();
})();
