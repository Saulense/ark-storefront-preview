/* One shared, user-operated footer rail. No autoplay, timers or network calls. */
(()=>{
 const section=document.querySelector('.footer-trust67'),rail=section?.querySelector('.trust-rail81'),controls=section?.querySelector('.trust-controls81');
 if(!rail||!controls)return;
 const cards=[...rail.querySelectorAll('article')],dots=[...controls.querySelectorAll('.trust-dot81')],prev=controls.querySelector('[data-trust-prev]'),next=controls.querySelector('[data-trust-next]'),status=controls.querySelector('.trust-status81');
 if(cards.length!==4||dots.length!==cards.length)return;
 let index=0,frame=0;
 const offsets=()=>cards.map(card=>card.offsetLeft-cards[0].offsetLeft);
 const active=()=>matchMedia('(max-width:767px)').matches&&!document.documentElement.classList.contains('ark-large-text64')&&rail.scrollWidth>rail.clientWidth+2;
 function sync(){
  frame=0;const points=offsets();index=points.reduce((best,x,i)=>Math.abs(x-rail.scrollLeft)<Math.abs(points[best]-rail.scrollLeft)?i:best,0);
  dots.forEach((dot,i)=>{if(i===index)dot.setAttribute('aria-current','true');else dot.removeAttribute('aria-current');});
  prev.disabled=index===0;next.disabled=index===cards.length-1;status.textContent=(index+1)+' of '+cards.length;
  if(active())rail.setAttribute('tabindex','0');else rail.removeAttribute('tabindex');
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(sync);}
 function go(i){if(!active())return;rail.scrollTo({left:offsets()[Math.max(0,Math.min(cards.length-1,i))],behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 prev.addEventListener('click',()=>go(index-1));next.addEventListener('click',()=>go(index+1));dots.forEach((dot,i)=>dot.addEventListener('click',()=>go(i)));
 rail.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
 rail.addEventListener('keydown',event=>{if(event.target!==rail||!active())return;const keys={ArrowLeft:index-1,ArrowRight:index+1,Home:0,End:cards.length-1};if(Object.hasOwn(keys,event.key)){event.preventDefault();go(keys[event.key]);}});
 new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 section.classList.add('trust-ready81');sync();
})();
