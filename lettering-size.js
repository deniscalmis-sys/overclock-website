/* Keep the original text for accessible, resilient layout; overlay supplied artwork. */
(() => {
  const selector = '.fuel h2,.protocol h3,.strike,.answer,.lab > h2,.merch h2';
  const ctx = document.createElement('canvas').getContext('2d');
  const ready = new Set();
  let frame;
  const keyOf = text => text.toLowerCase().replace(/[’'.:]/g, '').replace(' ', '-');
  const fileOf = key => `lettering/words/${key}.svg`;
  function fit() {
    for (const el of document.querySelectorAll(selector)) {
      el.querySelectorAll('.vector-word').forEach(word => word.remove());
      el.classList.remove('lettering-ready');
      const box = el.getBoundingClientRect();
      const jobs = [];
      if (el.matches('.strike')) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const bounds = range.getBoundingClientRect();
        jobs.push({key:'../push',x:bounds.left-box.left,y:bounds.top-box.top,w:bounds.width,h:bounds.height});
      } else {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          for (const match of node.textContent.matchAll(/WE SAY:|[A-Z]+(?:[’'][A-Z]+)?[.:]?/g)) {
            const range = document.createRange();
            range.setStart(node,match.index);
            range.setEnd(node,match.index+match[0].length);
            const bounds = range.getBoundingClientRect();
            const style = getComputedStyle(node.parentElement);
            ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
            const metrics = ctx.measureText(match[0]);
            const ascent = metrics.actualBoundingBoxAscent;
            const fontAscent = metrics.fontBoundingBoxAscent || parseFloat(style.fontSize)*.8;
            jobs.push({key:keyOf(match[0]),x:bounds.left-box.left,y:bounds.top-box.top+fontAscent-ascent,w:bounds.width,h:ascent+metrics.actualBoundingBoxDescent});
          }
        }
      }
      if (!jobs.length || jobs.some(job=>!ready.has(job.key))) continue;
      for (const job of jobs) {
        const span = document.createElement('span');
        span.className = 'vector-word';
        span.setAttribute('aria-hidden','true');
        span.style.cssText = `left:${job.x}px;top:${job.y}px;width:${job.w}px;height:${job.h}px;--word-art:url("${fileOf(job.key)}")`;
        el.append(span);
      }
      el.classList.add('lettering-ready');
    }
  }
  const keys = new Set(['../push']);
  document.querySelectorAll(selector).forEach(el=>{
    if (el.matches('.strike')) return;
    const walker = document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    let node;
    while ((node=walker.nextNode())) for (const match of node.textContent.matchAll(/WE SAY:|[A-Z]+(?:[’'][A-Z]+)?[.:]?/g)) keys.add(keyOf(match[0]));
  });
  const loads = [...keys].map(key=>new Promise(resolve=>{
    const image = new Image();
    image.onload=()=>{ready.add(key);resolve();};
    image.onerror=resolve;
    image.src=fileOf(key);
  }));
  Promise.all([document.fonts.ready,...loads]).then(fit);
  addEventListener('resize',()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(fit);});
})();
