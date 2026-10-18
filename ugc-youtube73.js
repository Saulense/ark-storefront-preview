/* YouTube provider adapter for the shared video62 section/visual controls.
   Native media pages keep their existing62 engine. No SDK or CSP expansion. */
(()=>{'use strict';
 const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
 document.querySelectorAll('.ark-video-study62[data-provider73="youtube"]').forEach(section=>{
  const rail=section.querySelector('.ark-video-rail62'),originals=[...rail.children],count=originals.length;
  if(!count||count>20)return;
  const prev=section.querySelector('.video-prev62'),next=section.querySelector('.video-next62'),status=section.querySelector('.video-position62');
  originals.forEach((c,i)=>c.dataset.videoIndex=i);
  const buffer=count>1?Math.min(count,Math.ceil(screen.width/220/2)+1):0;
  function clone(c){const x=c.cloneNode(true);x.dataset.loopClone='true';x.setAttribute('aria-hidden','true');x.querySelectorAll('button').forEach(b=>b.tabIndex=-1);return x;}
  originals.slice(-buffer).forEach(c=>rail.insertBefore(clone(c),originals[0]));originals.slice(0,buffer).forEach(c=>rail.append(clone(c)));
  const cards=[...rail.children];let physical=buffer,timer=0,playing=null,dialog=null;
  const logical=c=>Number(c.dataset.videoIndex),left=c=>c.offsetLeft-(rail.clientWidth-c.offsetWidth)/2;
  function stop(){if(!playing)return;playing.querySelector('iframe')?.remove();playing.classList.remove('is-playing');playing.querySelector('.video-play62').hidden=false;playing=null;}
  function state(){let distance=Infinity;cards.forEach((c,i)=>{const d=Math.abs(left(c)-rail.scrollLeft);if(d<distance){distance=d;physical=i;}});cards.forEach((c,i)=>c.classList.toggle('is-active',i===physical));status.textContent='Video '+(logical(cards[physical])+1)+' of '+count;prev.disabled=next.disabled=count<2;}
  function settle(){if(dialog)return;state();const c=cards[physical];if(c.dataset.loopClone){physical=buffer+logical(c);rail.scrollTo({left:left(originals[logical(c)]),behavior:'instant'});state();}}
  function navigate(i,behavior=reduced?'auto':'smooth'){stop();clearTimeout(timer);physical=Math.max(0,Math.min(cards.length-1,i));rail.scrollTo({left:left(cards[physical]),behavior});timer=setTimeout(settle,behavior==='auto'?0:180);}
  function play(c){
   stop();const id=c.dataset.youtube73;if(!/^[\w-]{11}$/.test(id))return;
   const frame=document.createElement('iframe');frame.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&playsinline=1&controls=1&mute=0&rel=0';
   frame.title='ARK Hack customer video '+(logical(c)+1);frame.allow='autoplay; encrypted-media; picture-in-picture';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
   c.append(frame);c.classList.add('is-playing');c.querySelector('.video-play62').hidden=true;playing=c;
  }
  prev.addEventListener('click',()=>{state();navigate(physical-1);});next.addEventListener('click',()=>{state();navigate(physical+1);});
  rail.addEventListener('scroll',()=>{state();if(playing&&!dialog&&Math.abs(left(playing)-rail.scrollLeft)>playing.offsetWidth/2)stop();clearTimeout(timer);timer=setTimeout(settle,140);},{passive:true});
  rail.addEventListener('keydown',e=>{if(e.target!==rail||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();state();navigate(e.key==='Home'?buffer:e.key==='End'?buffer+count-1:physical+(e.key==='ArrowRight'?1:-1));});
  cards.forEach(c=>{
   c.querySelector('.video-play62').addEventListener('click',()=>{const real=originals[logical(c)];navigate(buffer+logical(c),'auto');play(real);});
   c.querySelector('.video-expand62').addEventListener('click',()=>{
    stop();const real=originals[logical(c)],placeholder=document.createElement('div'),close=document.createElement('button');placeholder.className='video-card62 video-placeholder62';placeholder.setAttribute('aria-hidden','true');real.replaceWith(placeholder);
    dialog=document.createElement('dialog');dialog.className='video-dialog62';dialog.setAttribute('aria-label','Expanded ARK Hack customer video '+(logical(c)+1));close.type='button';close.className='video-close62';close.textContent='×';close.setAttribute('aria-label','Close expanded video');real.classList.add('is-expanded');dialog.append(close,real);document.body.append(dialog);
    let restored=false;function restore(){if(restored)return;restored=true;stop();placeholder.replaceWith(real);real.classList.remove('is-expanded');dialog.remove();dialog=null;navigate(buffer+logical(c),'auto');real.querySelector('.video-expand62').focus({preventScroll:true});}
    close.addEventListener('click',()=>{dialog.close();restore();});dialog.addEventListener('close',restore);dialog.addEventListener('cancel',()=>{stop();});dialog.showModal();close.focus();play(real);
   });
  });
  new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&!dialog)stop();},{threshold:.15}).observe(section);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
  window.addEventListener('resize',()=>{if(!dialog)navigate(buffer+logical(cards[physical]),'auto');});
  requestAnimationFrame(()=>navigate(buffer,'auto'));
 });
})();
