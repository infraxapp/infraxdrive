(()=>{const C=window.CONFIG,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mob=()=>matchMedia('(max-width:767px)').matches,hover=matchMedia('(hover:hover) and (pointer:fine)').matches;
$$('[data-brand]').forEach(e=>e.textContent=C.brand);
$$('[data-yr]').forEach(e=>e.textContent=new Date().getFullYear());
$$('[data-phone]').forEach(e=>{e.innerHTML=e.classList.contains('crow')?`<svg><use href="#i-phone"/></svg><span><small>Phone</small>${C.phone}</span>`:C.phone;e.href='tel:'+C.phone.replace(/\s/g,'')});
$$('[data-email]').forEach(e=>{e.innerHTML=e.classList.contains('crow')?`<svg><use href="#i-mail"/></svg><span><small>Email <span class="ph">Placeholder</span></small>${C.email}</span>`:C.email;e.href='mailto:'+C.email});
$$('[data-tel]').forEach(e=>e.href='tel:'+C.phone.replace(/\s/g,''));$$('[data-phone-txt]').forEach(e=>e.textContent=C.phone);$$('[data-email-plain]').forEach(e=>{e.textContent=C.email;e.href='mailto:'+C.email});
$$('[data-address]').forEach(e=>e.textContent=C.address);$$('[data-hours]').forEach(e=>e.textContent=C.hours);
const wa=t=>`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(t)}`;
$$('[data-wa]').forEach(a=>{a.href=wa(`Hi ${C.brand}, I'd like to rent a car.`);a.target='_blank';a.rel='noopener'});
const inr=n=>n==null?'On request':'₹'+n.toLocaleString('en-IN');
const gear=c=>c.trans==='Automatic'?'AT':'MT';
const spec3=c=>`<div><dt>Seats</dt><dd>${c.seats}</dd></div><div><dt>Drive</dt><dd>${c.drive}</dd></div><div><dt>Gear</dt><dd>${gear(c)}</dd></div>`;
const icon=c=>c.id==='offroader'?'i-mtn':'i-car';
/* theme */
const setTheme=t=>{document.documentElement.classList.add('theming');setTimeout(()=>document.documentElement.classList.remove('theming'),450);document.documentElement.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}$('meta[name=theme-color]').content=t==='light'?'#FAFAF8':'#0A0B0D'};
$$('[data-theme-toggle]').forEach(b=>b.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='light'?'dark':'light')));
/* fleet cards */
const card=(c,i)=>`<article class="cat tilt" data-i="${i}"><a class="cat-img${c.studio?" studio":""}" href="car.html?type=${c.id}" aria-label="${c.type} details"><img class="fade" src="${c.image}" alt="${c.examples} — ${c.type}" loading="lazy" decoding="async" width="1200" height="750"><span class="cat-top"><svg><use href="#${icon(c)}"/></svg></span></a>
<div class="cat-body"><h3 class="display sm"><a href="car.html?type=${c.id}">${c.type}</a></h3><p class="ex">${c.examples} <span class="ph">Example</span></p><p class="desc">${c.line}</p>
<dl class="specs">${spec3(c)}</dl>
<div class="cat-foot"><p class="price">${inr(c.price)}${c.price!=null?'<small>/day from</small>':''}<span class="ph">Placeholder</span></p><button class="btn ghost press" data-type="${c.type}" aria-label="Reserve ${c.type}"><svg><use href="#i-arrow"/></svg></button></div></div></article>`;
const grid=$('#fleetgrid');
if(grid){const lim=+grid.dataset.limit||99;grid.innerHTML=C.fleet.slice(0,lim).map(card).join('')}
/* filters */
const fl=$('#filters');let curBtn=null;const dd=$('#dd'),scr=$('#ddscrim');
if(fl){const uniq=k=>[...new Set(C.fleet.map(c=>c[k]))];
const groups=[["type","Type",uniq('type')],["seats","Seats",uniq('seats').sort()],["trans","Gear",uniq('trans')],["fuel","Fuel",uniq('fuel')]];
const sel={};const lbl=(k,v)=>k==='seats'?v+' seats':v;
const q=new URLSearchParams(location.search);if(q.get('fuel'))sel.fuel=q.get('fuel');
const renderF=()=>{fl.innerHTML=groups.map(([k,l])=>sel[k]?`<button class="fbtn set press" data-k="${k}" aria-haspopup="listbox" aria-expanded="false">${l}: ${lbl(k,sel[k])}<span class="clr" data-clr="${k}" role="button" aria-label="Clear ${l}"><svg><use href="#i-x"/></svg></span></button>`:`<button class="fbtn press" data-k="${k}" aria-haspopup="listbox" aria-expanded="false">${l}<svg class="chev"><use href="#i-chev"/></svg></button>`).join('')+(Object.keys(sel).length?'<button class="clearall" data-clrall>Clear all</button>':'')};
const apply=()=>{let n=0;$$('.cat').forEach(el=>{const c=C.fleet[el.dataset.i];const ok=Object.entries(sel).every(([k,v])=>String(c[k])===v);el.hidden=!ok;n+=ok});$('#empty').hidden=n>0;renderF()};
const closeDD=f=>{dd.classList.remove('open');scr.classList.remove('open');if(curBtn&&f){const b=$(`.fbtn[data-k="${curBtn.dataset.k}"]`);b&&b.focus()}if(curBtn)curBtn.setAttribute('aria-expanded','false');curBtn=null};
const openDD=b=>{const k=b.dataset.k,[,l,vals]=groups.find(g=>g[0]===k);curBtn=b;b.setAttribute('aria-expanded','true');dd.setAttribute('aria-label',l);
dd.innerHTML=`<h4>${l}</h4>`+[['','All'],...vals.map(v=>[String(v),lbl(k,v)])].map(([v,t])=>`<button role="option" data-v="${v}" aria-selected="${(sel[k]||'')===v}">${t}</button>`).join('');
if(!mob()){const r=b.getBoundingClientRect();dd.style.left=(r.left+scrollX)+'px';dd.style.top=(r.bottom+scrollY+8)+'px'}
dd.classList.add('open');scr.classList.add('open');(dd.querySelector('[aria-selected=true]')||dd.querySelector('[role=option]')).focus({preventScroll:true})};
fl.addEventListener('click',e=>{const c=e.target.closest('[data-clr]');if(c){e.stopPropagation();delete sel[c.dataset.clr];return apply()}
if(e.target.closest('[data-clrall]')){Object.keys(sel).forEach(x=>delete sel[x]);return apply()}
const b=e.target.closest('.fbtn');if(!b)return;e.stopPropagation();const same=curBtn&&curBtn.dataset.k===b.dataset.k;closeDD();if(!same)openDD(b)});
dd.addEventListener('click',e=>{const o=e.target.closest('[role=option]');if(!o)return;const k=curBtn.dataset.k;if(o.dataset.v)sel[k]=o.dataset.v;else delete sel[k];closeDD();apply();const b=$(`.fbtn[data-k="${k}"]`);b&&b.focus({preventScroll:true})});
dd.addEventListener('keydown',e=>{const os=$$('#dd [role=option]'),i=os.indexOf(document.activeElement);if(e.key==='ArrowDown'){e.preventDefault();os[(i+1)%os.length].focus()}if(e.key==='ArrowUp'){e.preventDefault();os[(i-1+os.length)%os.length].focus()}if(e.key==='Tab')closeDD()});
document.addEventListener('click',e=>{if(curBtn&&!dd.contains(e.target))closeDD()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&curBtn)closeDD(true)});
addEventListener('resize',()=>curBtn&&closeDD());apply()}
/* car detail */
const cd=$('#cardetail');
if(cd){const id=new URLSearchParams(location.search).get('type');const c=C.fleet.find(x=>x.id===id)||C.fleet[0];
document.title=`${c.type} on rent — ${C.brand}`;
cd.innerHTML=`<div class="cd-img${c.studio?" studio":""}"><img class="fade" src="${c.image}" alt="${c.examples} — ${c.type}" width="1200" height="750" fetchpriority="high"></div>
<div class="cd-copy"><a class="back" href="fleet.html">← All cars</a><p class="kicker">SUV class · ${c.seats} seats · ${c.drive}</p><h1 class="display md">${c.type}</h1>
<p class="ex">${c.examples} <span class="ph">Example</span></p><p class="sub">${c.line}</p>
<dl class="specs big"><div><dt>Seats</dt><dd>${c.seats}</dd></div><div><dt>Gear</dt><dd>${gear(c)}</dd></div><div><dt>Drive</dt><dd>${c.drive}</dd></div><div><dt>Fuel</dt><dd>${c.fuel}</dd></div></dl><div class="uses-chips">${c.uses.map(u=>`<span>${u}</span>`).join('')}</div>
<p class="price xl-price">${inr(c.price)}${c.price!=null?'<small>/day from</small>':''}<span class="ph">Placeholder</span></p>
<div class="hero-cta"><button class="btn press" data-type="${c.type}">Reserve this SUV<svg><use href="#i-arrow"/></svg></button><a class="link" data-wa href="${wa(`Hi ${C.brand}, question about the ${c.type}.`)}" target="_blank" rel="noopener">Ask on WhatsApp</a></div></div>`;
$('#cd-included').innerHTML=['Doorstep delivery & pickup in Gurugram / Delhi NCR','360° video walkaround at handover and return','Comprehensive insurance','24×7 roadside & WhatsApp support','Recovery kit on hill & off-road trips','Driver option available'].map(x=>`<li><svg><use href="#i-check"/></svg>${x}</li>`).join('');
const others=C.fleet.filter(x=>x.id!==c.id);$('#cd-more').innerHTML=others.map(x=>card(x,C.fleet.indexOf(x))).join('')}
/* fleet showcase */
const sc=$('#showcase');
if(sc){sc.innerHTML=C.fleet.map((c,i)=>`<article class="show" data-id="${c.id}">
<a class="show-img${c.studio?" studio":""}" href="car.html?type=${c.id}"><img class="fade" src="${c.image}" alt="${c.examples} — ${c.type}" width="1200" height="750" ${i?'loading="lazy"':'fetchpriority="high"'}></a>
<div class="show-body"><p class="kicker">${String(i+1).padStart(2,'0')} · ${c.short}</p><h2 class="display md">${c.type}</h2><p class="ex">${c.examples} <span class="ph">Example</span></p><p class="sub">${c.line}</p>
<dl class="specs big"><div><dt>Seats</dt><dd>${c.seats}</dd></div><div><dt>Drive</dt><dd>${c.drive}</dd></div><div><dt>Gear</dt><dd>${gear(c)}</dd></div><div><dt>${c.roof?'Roof':'Fuel'}</dt><dd>${c.roof||c.fuel}</dd></div></dl>
<div class="uses-chips">${c.uses.map(u=>`<span>${u}</span>`).join('')}</div>
<div class="show-foot"><p class="price">${inr(c.price)}${c.price!=null?'<small>/day from</small>':''}<span class="ph">Placeholder</span></p><div class="row2"><a class="link" href="car.html?type=${c.id}">Details</a><button class="btn press" data-type="${c.type}">Reserve<svg><use href="#i-arrow"/></svg></button></div></div></div></article>`).join('');
const sg=$('#segf');if(sg)sg.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#segf button').forEach(x=>x.setAttribute('aria-pressed',x===b));$$('.show').forEach(s=>s.hidden=b.dataset.f!=='all'&&s.dataset.id!==b.dataset.f)})}
const rq=$('#request');if(rq)rq.addEventListener('submit',e=>{e.preventDefault();const t=rq.querySelector('select').value;window.open(wa(`Hi ${C.brand}, I need a ${t} car. Dates: `),'_blank')});
/* booking forms */
$$('.typepick').forEach((tp,j)=>tp.innerHTML=C.fleet.map((c,i)=>`<label><input type="radio" name="car" value="${c.type}" ${i?'':'checked'}><span>${c.type}<small>${c.examples} · ${c.seats} seats</small></span></label>`).join(''));
const d=new Date().toISOString().slice(0,10);let purpose='';
$$('.bookform').forEach(f=>{f.from.min=f.to.min=d;f.from.addEventListener('change',()=>f.to.min=f.from.value);
f.addEventListener('submit',e=>{e.preventDefault();const v=new FormData(f);
window.open(wa(`Hi ${C.brand}, booking enquiry:\nCar type: ${v.get('car')}\nDrive: ${v.get('mode')}\nCity: ${v.get('city')}${purpose?`\nFor: ${purpose}`:''}\nPickup: ${v.get('from')} ${v.get('fromT')}\nReturn: ${v.get('to')} ${v.get('toT')}${v.get('loc')?`\nPickup at: ${v.get('loc')}`:''}${v.get('note')?`\nNote: ${v.get('note')}`:''}`),'_blank')})});
const sheetForm=$('.bookform.sheet-panel'),inlineForm=$('.bookform.inline');
const B=document.body;const lock=on=>B.classList.toggle('locked',on);
const openBook=type=>{const _f=1;const f=mob()?sheetForm:(sheetForm&&getComputedStyle(sheetForm).display!=='none'?sheetForm:inlineForm);
if(!f){location.href='contact.html'+(type?'?type='+encodeURIComponent(type):'');return}
if(type){const r=f.querySelector(`input[name=car][value="${type}"]`);if(r)r.checked=true}
if(mob()){B.classList.add('sheet');lock(true)}else{f.scrollIntoView({behavior:'smooth',block:'center'});f.classList.add('ping');setTimeout(()=>f.classList.remove('ping'),900)}};
const closeAll=()=>{B.classList.remove('sheet','more');lock(false)};
const qt=new URLSearchParams(location.search).get('type');if(qt&&inlineForm){const r=inlineForm.querySelector(`input[name=car][value="${qt}"]`);if(r)r.checked=true}
document.addEventListener('click',e=>{const t=e.target.closest('[data-open-book],[data-type],[data-trip],[data-close],[data-open-more]');if(!t)return;
if(t.matches('[data-close]'))return closeAll();
if(t.matches('[data-open-more]')){B.classList.add('more');lock(true);return}
if(t.dataset.trip){e.preventDefault();purpose=t.dataset.trip}closeAll();openBook(t.dataset.type)});
addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
/* live summary (contact) */
const sum=$('#sum');if(sum&&inlineForm){const up=()=>{const v=new FormData(inlineForm);const fmt=(d,t)=>d?new Date(d+'T'+(t||'10:00')).toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'}):'—';
const m={mode:v.get('mode'),car:v.get('car')||'—',from:fmt(v.get('from'),v.get('fromT')),to:fmt(v.get('to'),v.get('toT')),city:v.get('city')};$$('#sum [data-s]').forEach(e=>e.textContent=m[e.dataset.s])};inlineForm.addEventListener('input',up);inlineForm.addEventListener('change',up);up()}
/* images */
$$('img.fade').forEach(i=>{const s=()=>i.classList.add('ok');i.complete?s():i.addEventListener('load',s,{once:true})});
/* header state: rAF-throttled, class only (no layout change) */
let tick=false;const onS=()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{B.classList.toggle('scrolled',scrollY>30);tick=false})};addEventListener('scroll',onS,{passive:true});onS();
/* prefetch */
const pf=new Set();const pre=a=>{const u=a.getAttribute('href');if(!u||pf.has(u)||/^(#|http|tel|mailto)/.test(u))return;pf.add(u);const l=document.createElement('link');l.rel='prefetch';l.href=u;document.head.appendChild(l)};
document.addEventListener('pointerover',e=>{const a=e.target.closest('a[href]');a&&pre(a)},{passive:true});
document.addEventListener('touchstart',e=>{const a=e.target.closest('a[href]');a&&pre(a)},{passive:true});
/* desktop-only tilt */
if(hover&&innerWidth>=768&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
document.addEventListener('mousemove',e=>{const c=e.target.closest('.tilt');$$('.tilt.tilting').forEach(x=>{if(x!==c){x.classList.remove('tilting');x.style.transform=''}});if(!c)return;c.classList.add('tilting');const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`perspective(900px) rotateY(${x*5}deg) rotateX(${-y*5}deg) translateY(-4px)`},{passive:true})}
})();
