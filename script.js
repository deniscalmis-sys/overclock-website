const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='MENU +';}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'CLOSE ×':'MENU +';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.querySelector('#year').textContent=new Date().getFullYear();
