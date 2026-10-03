const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='MENU +';}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'CLOSE ×':'MENU +';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();

// Reveal each content group once; content stays visible without JavaScript.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.fuel-intro,.protocol-grid,.manifesto-main,.lab-grid,.merch-head,.merch-grid').forEach(el => {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('flow-reveal');
      observer.observe(el);
    }
  });
}
