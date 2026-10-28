(()=>{const C=window.CONFIG,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const mob=()=>matchMedia('(max-width:767px)').matches,hover=matchMedia('(hover:hover) and (pointer:fine)').matches;
$$('[data-req]').forEach(e=>{if(!(C[e.dataset.req]||'').trim())e.remove()});$$('[data-email]').forEach(e=>{if(!(C.email||'').trim())e.remove()});$$('[data-social]').forEach(e=>{const u=(C.social||{})[e.dataset.social];if(!u||u==='#')e.remove();else{e.href=u;e.target='_blank';e.rel='noopener'}});$$('.cinfo2').forEach(e=>{if(!e.querySelector('.mapcard'))e.classList.add('solo')});
$$('[data-brand]').forEach(e=>e.innerHTML=C.brand.replace('4X4','<b>4X4</b>'));
$$('[data-yr]').forEach(e=>e.textContent=new Date().getFullYear());
$$('[data-phone]').forEach(e=>{e.innerHTML=e.classList.contains('crow')?`<svg><use href="#i-phone"/></svg><span><small>Phone</small>${C.phone}</span>`:C.phone;e.href='tel:'+C.phone.replace(/\s/g,'')});
$$('[data-email]').forEach(e=>{e.innerHTML=e.classList.contains('crow')?`<svg><use href="#i-mail"/></svg><span><small>Email</small>${C.email}</span>`:C.email;e.href='mailto:'+C.email});
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
/* home: original big cards */
const bigcard=(c,i)=>`<article class="cat tilt" data-i="${i}"><a class="cat-img${c.studio?" studio":""}" href="car.html?id=${c.id}" aria-label="${c.type} details"><img class="fade" src="${c.image}" srcset="${c.image.replace('.webp','-640.webp')} 640w, ${c.image} 1200w" sizes="(max-width:767px) 92vw, 560px" alt="${c.examples} — ${c.type}" loading="lazy" decoding="async" width="1200" height="750"><span class="cat-top"><svg><use href="#${icon(c)}"/></svg></span></a>
<div class="cat-body"><h3 class="display sm"><a href="car.html?id=${c.id}">${c.type}</a></h3><p class="ex">${c.examples}</p><p class="desc">${c.line}</p>
<dl class="specs">${spec3(c)}</dl>
<div class="cat-foot"><p class="price">${inr(c.price)}${c.price!=null?'<small>/day from</small>':''}</p><button class="btn ghost press" data-type="${c.type}" aria-label="Reserve ${c.type}"><svg><use href="#i-arrow"/></svg></button></div></div></article>`;
const hf=$('#homefleet');if(hf)hf.innerHTML=C.fleet.filter(c=>c.line).slice(0,2).map((c,i)=>bigcard(c,C.fleet.indexOf(c))).join('');
/* fleet cards (compact, data-driven) */
const nm=c=>c.name||c.examples||c.type;
const card=(c,i)=>{const im=c.image||'img/fleet/suv7.webp',sm=im.replace('.webp','-640.webp');return `<article class="vc" data-i="${i}"><a class="vc-img${c.studio?" studio":""}" href="car.html?id=${c.id}" aria-label="${nm(c)} details"><img src="${sm}" srcset="${sm} 640w, ${im} 1200w" sizes="(max-width:767px) 46vw, (max-width:1099px) 45vw, 300px" alt="${nm(c)}" loading="lazy" decoding="async" width="640" height="400"></a>
<div class="vc-body"><span class="vchip">${c.category||c.short||'Car'}</span><h3><a href="car.html?id=${c.id}">${nm(c)}</a></h3><p class="vc-model">${c.model||c.type||''}</p>
<ul class="vc-spec" aria-label="Specs"><li title="Seats"><svg aria-hidden="true"><use href="#i-seat"/></svg>${c.seats}</li><li title="Fuel"><svg aria-hidden="true"><use href="#i-fuel"/></svg>${c.fuel}</li><li title="Gearbox"><svg aria-hidden="true"><use href="#i-gear"/></svg>${gear(c)}</li><li title="Drive"><svg aria-hidden="true"><use href="#i-wheel"/></svg>${c.drive||'2WD'}</li></ul>
<div class="vc-foot"><p class="vc-price">${inr(c.price)}${c.price!=null?'<small>/day</small>':''}</p><div class="vc-act"><a class="link sm" href="car.html?id=${c.id}">Details</a><button class="btn sm press" data-type="${c.type||nm(c)}" aria-label="Reserve ${nm(c)}">Reserve</button></div></div></div></article>`};
const fcard=(c,i)=>{const im=c.cutout||c.image||'img/fleet/suv7.webp',sm=im.replace('.webp','-640.webp'),u=`car.html?id=${c.id}`;
const sp=[['i-seat',c.seats,'Seats'],['i-fuel',c.fuel,'Fuel'],['i-gear',`<i class="g-l">${c.trans}</i><i class="g-s">${gear(c)}</i>`,'Gearbox'],['i-wheel',c.drive||'2WD','Drive']];
return `<article class="fc" data-i="${i}"><a class="fc-stage${c.cutout||c.studio?'':' photo'}" href="${u}" aria-hidden="true" tabindex="-1"><span class="fc-cat">${c.category||'Car'}</span><img src="${sm}" srcset="${sm} 640w, ${im} 1200w" sizes="(max-width:767px) 92vw, (max-width:1099px) 46vw, 420px" alt="${nm(c)} ${c.model||''}" loading="${i<3?'eager':'lazy'}" decoding="async" width="1200" height="750"></a>
<div class="fc-body"><div class="fc-head"><div><h3><a href="${u}">${nm(c)}</a></h3><p class="fc-model">${c.model||c.type||''}</p></div><p class="fc-price">${c.price!=null?`<small>from</small><span>${inr(c.price)}<small> /day</small></span>`:'<span class="fc-req">Price on request</span>'}</p></div>
<ul class="fc-spec" aria-label="Specs">${sp.map(([ic,v,l])=>`<li><svg aria-hidden="true"><use href="#${ic}"/></svg><b>${v}</b><span>${l}</span></li>`).join('')}</ul>
<div class="fc-act"><a class="btn ghost sm press" href="${u}">View details</a><button class="btn sm press" data-type="${c.type||nm(c)}" aria-label="Reserve ${nm(c)}">Reserve<svg><use href="#i-arrow"/></svg></button></div></div></article>`};
const fx=$('#fxstats');if(fx){const pr=C.fleet.map(c=>c.price).filter(p=>p!=null),cats=[...new Set(C.fleet.map(c=>c.category).filter(Boolean))],mx=Math.max(...C.fleet.map(c=>c.seats||0));
fx.innerHTML=[[C.fleet.length,C.fleet.length===1?'Car':'Cars'],[cats.length,cats.length===1?'Category':'Categories'],[mx,'Max seats'],[pr.length?inr(Math.min(...pr)):'On request',pr.length?'Per day, from':'Pricing']].map(([v,l])=>`<div><dd>${v}</dd><dt>${l}</dt></div>`).join('')}
const grid=$('#fleetgrid');const isF=grid&&grid.classList.contains('fgrid');const cardF=isF?fcard:card;
const sizeG=n=>{if(isF)grid.dataset.n=n>=3?'many':n};
if(grid){const lim=+grid.dataset.limit||999;grid.innerHTML=C.fleet.slice(0,lim).map(cardF).join('');sizeG(Math.min(lim,C.fleet.length))}
/* filters + sort */
const fl=$('#filters');let curBtn=null;const dd=$('#dd'),scr=$('#ddscrim');
if(fl){const uniq=k=>[...new Set(C.fleet.map(c=>c[k]).filter(v=>v!=null))];
const PB=[['u3','Under ₹3,000',p=>p!=null&&p<3000],['3to6','₹3,000–6,000',p=>p!=null&&p>=3000&&p<6000],['6to10','₹6,000–10,000',p=>p!=null&&p>=6000&&p<10000],['10p','₹10,000+',p=>p!=null&&p>=10000],['req','On request',p=>p==null]];
const SO=[['','Recommended'],['pa','Price: low to high'],['pd','Price: high to low'],['sd','Seats: most first']];
const groups=[["category","Category",uniq('category')],["seats","Seats",uniq('seats').sort((a,b)=>a-b)],["fuel","Fuel",uniq('fuel')],["trans","Gear",uniq('trans')],["price","Price",PB.filter(b=>C.fleet.some(c=>b[2](c.price))).map(b=>b[0])],["sort","Sort",SO.slice(1).map(x=>x[0])]];
const sel={};const lbl=(k,v)=>k==='seats'?v+' seats':k==='price'?PB.find(b=>b[0]===v)[1]:k==='sort'?SO.find(x=>x[0]===v)[1]:v;
const q=new URLSearchParams(location.search);['category','fuel','seats','trans'].forEach(k=>q.get(k)&&(sel[k]=q.get(k)));
const ok=c=>Object.entries(sel).every(([k,v])=>k==='sort'||(k==='price'?PB.find(b=>b[0]===v)[2](c.price):String(c[k])===v));
const renderF=()=>{fl.innerHTML=groups.map(([k,l])=>sel[k]?`<button class="fbtn set press" data-k="${k}" aria-haspopup="listbox" aria-expanded="false">${k==='sort'?'':l+': '}${lbl(k,sel[k])}<span class="clr" data-clr="${k}" role="button" aria-label="Clear ${l}"><svg><use href="#i-x"/></svg></span></button>`:`<button class="fbtn press${k==='sort'?' sortb':''}" data-k="${k}" aria-haspopup="listbox" aria-expanded="false">${l}<svg class="chev"><use href="#i-chev"/></svg></button>`).join('')+(Object.keys(sel).length?'<button class="clearall" data-clrall>Clear all</button>':'')};
const tb=$('#fxtabs');const renderT=()=>{if(!tb)return;const cats=uniq('category');tb.innerHTML=[['','All',C.fleet.length],...cats.map(c=>[c,c,C.fleet.filter(x=>x.category===c).length])].map(([v,l,n])=>`<button class="fx-tab press" data-cat="${v}" aria-pressed="${(sel.category||'')===v}">${l}<span>${n}</span></button>`).join('')};
if(tb)tb.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;if(b.dataset.cat)sel.category=b.dataset.cat;else delete sel.category;apply()});
const apply=()=>{let list=C.fleet.map((c,i)=>[c,i]).filter(([c])=>ok(c));const s=sel.sort,P=c=>c.price==null?1e9:c.price;
if(s==='pa')list.sort((a,b)=>P(a[0])-P(b[0]));if(s==='pd')list.sort((a,b)=>(b[0].price||0)-(a[0].price||0));if(s==='sd')list.sort((a,b)=>b[0].seats-a[0].seats);
grid.innerHTML=list.map(([c,i])=>cardF(c,i)).join('');sizeG(list.length);renderT();$('#count').textContent=`${list.length} car${list.length===1?'':'s'}`+(list.length<C.fleet.length?` of ${C.fleet.length}`:'');$('#empty').hidden=list.length>0;renderF()};
const closeDD=f=>{dd.classList.remove('open');scr.classList.remove('open');if(curBtn&&f){const b=$(`.fbtn[data-k="${curBtn.dataset.k}"]`);b&&b.focus()}if(curBtn)curBtn.setAttribute('aria-expanded','false');curBtn=null};
const openDD=b=>{const k=b.dataset.k,[,l,vals]=groups.find(g=>g[0]===k);curBtn=b;b.setAttribute('aria-expanded','true');dd.setAttribute('aria-label',l);
dd.innerHTML=`<h4>${l}</h4>`+[['',k==='sort'?'Recommended':'All'],...vals.map(v=>[String(v),lbl(k,v)])].map(([v,t])=>`<button role="option" data-v="${v}" aria-selected="${(sel[k]||'')===v}">${t}</button>`).join('');
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
if(cd){const _q=new URLSearchParams(location.search),id=_q.get('id')||_q.get('type');const c=C.fleet.find(x=>x.id===id)||C.fleet[0];
document.title=`${nm(c)} on rent — ${C.brand}`;
cd.innerHTML=`<div class="cd-img${c.studio?" studio":""}"><img class="fade" src="${c.image}" srcset="${c.image.replace('.webp','-640.webp')} 640w, ${c.image} 1200w" sizes="(max-width:767px) 96vw, 60vw" alt="${c.examples} — ${c.type}" width="1200" height="750" fetchpriority="high"></div>
<div class="cd-copy"><a class="back" href="fleet.html">← All cars</a><p class="kicker">${c.category||""} · ${c.seats} seats · ${c.drive||""}</p><h1 class="display md">${nm(c)}</h1>
<p class="ex">${c.model||""}</p><p class="sub">${c.line||""}</p>
<dl class="specs big"><div><dt>Seats</dt><dd>${c.seats}</dd></div><div><dt>Gear</dt><dd>${gear(c)}</dd></div><div><dt>Drive</dt><dd>${c.drive}</dd></div><div><dt>Fuel</dt><dd>${c.fuel}</dd></div></dl><div class="uses-chips">${(c.uses||[]).map(u=>`<span>${u}</span>`).join('')}</div>
<p class="price xl-price">${inr(c.price)}${c.price!=null?'<small>/day from</small>':''}</p>
<div class="hero-cta"><button class="btn press" data-type="${c.type}">Reserve this car<svg><use href="#i-arrow"/></svg></button><a class="link" data-wa href="${wa(`Hi ${C.brand}, question about the ${c.type}.`)}" target="_blank" rel="noopener">Ask on WhatsApp</a></div></div>`;
$('#cd-included').innerHTML=['Doorstep delivery & pickup in Gurugram / Delhi NCR','360° video walkaround at handover and return','Comprehensive insurance','24×7 roadside & WhatsApp support','Recovery kit on hill & off-road trips','Driver option available'].map(x=>`<li><svg><use href="#i-check"/></svg>${x}</li>`).join('');
const others=C.fleet.filter(x=>x.id!==c.id).slice(0,4);$('#cd-more').innerHTML=others.map(x=>card(x,C.fleet.indexOf(x))).join('')}
const qk=$('#quick');if(qk){const t0=new Date(),iso=d=>d.toISOString().slice(0,10),f1=qk.querySelector('[name=from]'),f2=qk.querySelector('[name=to]');f1.min=f2.min=iso(t0);f1.addEventListener('change',()=>{f2.min=f1.value;if(f2.value&&f2.value<f1.value)f2.value=f1.value});qk.addEventListener('submit',e=>{e.preventDefault();const v=new FormData(qk);window.open(wa(`Hi ${C.brand}, is a car available?\nPickup: ${v.get('city')}\nFrom: ${v.get('from')}\nTo: ${v.get('to')}`),'_blank','noopener')})}
const rq=$('#request');if(rq)rq.addEventListener('submit',e=>{e.preventDefault();const t=rq.querySelector('select').value;window.open(wa(`Hi ${C.brand}, I need a ${t} car. Dates: `),'_blank')});
/* booking forms */
$$('.typepick').forEach((tp,j)=>tp.innerHTML=C.fleet.map((c,i)=>`<label><input type="radio" name="car" value="${c.type}" ${i?'':'checked'}><span>${nm(c)}<small>${c.category||''} · ${c.seats} seats</small></span></label>`).join(''));
const d=new Date().toISOString().slice(0,10);let purpose='';
$$('.bookform').forEach(f=>{f.from.min=f.to.min=d;f.from.addEventListener('change',()=>f.to.min=f.from.value);
f.addEventListener('submit',e=>{e.preventDefault();const v=new FormData(f);
window.open(wa(`Hi ${C.brand}, booking enquiry:\nCar type: ${v.get('car')}\nDrive: ${v.get('mode')}\nCity: ${v.get('city')}${purpose?`\nFor: ${purpose}`:''}\nPickup: ${v.get('from')} ${v.get('fromT')}\nReturn: ${v.get('to')} ${v.get('toT')}${v.get('loc')?`\nPickup at: ${v.get('loc')}`:''}${v.get('note')?`\nNote: ${v.get('note')}`:''}`),'_blank')})});
const sheetForm=$('.bookform.sheet-panel'),inlineForm=$('.bookform.inline')||$('#quick');
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
/* page transitions: shared car photo + non-VT fallback */
(()=>{const H=document.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target&&a.target!=='_self'||a.hasAttribute('download'))return;
let u;try{u=new URL(a.href,location.href)}catch(_){return}if(u.origin!==location.origin||!/\.html$|\/$/.test(u.pathname))return;if(u.pathname===location.pathname&&u.search===location.search)return;
const im=a.matches('.cat-img,.show-img')&&a.querySelector('img');if(im&&!H.classList.contains('nvt'))im.style.viewTransitionName='car-photo';
if(H.classList.contains('nvt')&&!rm){e.preventDefault();H.classList.add('leaving');setTimeout(()=>{location.href=u.href},150)}});
addEventListener('pageshow',()=>{H.classList.remove('leaving');document.querySelectorAll('img[style*="view-transition-name"]').forEach(i=>i.style.viewTransitionName='')})})();
