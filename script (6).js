(()=>{
'use strict';
const $=i=>document.getElementById(i),cl=(v,a,b)=>Math.min(b,Math.max(a,v));
const fmt=n=>(n>=1e9?(n/1e9).toFixed(2).replace('.',',')+' млрд':Math.round(n/1e6)+' млн')+' ГК';
const LB=['Радиус','Масса','Гравитация','Температура','Сутки','Год','Спутники','Атмосфера'];

/* ---------- ДАННЫЕ ПЛАНЕТ ---------- */
const P=[
{n:'Вулкария',t:'Лавовый мир',r:4.2,mode:'lava',pal:['#120504','#5a0d05','#c2310c','#ff8a1f','#ffe08a'],atm:'#ff5a1a',hab:3,price:480e6,
 s:['5 900 км','0,8 M⊕','1,3 g','+740 °C','18 ч','61 сут','нет','СО₂, пары серы'],
 ds:'Живая вулканическая планета: потоки лавы видны из космоса. Подходит для геотермальной энергетики и добычи редких металлов.',
 ev:[['каждые 9 дней','Массовое извержение в северном полушарии'],['через 14 дней','Окно для посадки: пепловая завеса редеет']]},
{n:'Аквана',t:'Океанический мир',r:4.8,mode:'terr',pal:['#06214f','#0d4a94','#2a85cf','#e2d49a','#4c9a47','#2d6a30','#7c6a4b','#f2f2f2'],atm:'#6ec3ff',hab:92,price:3.9e9,disc:10,
 s:['6 700 км','1,1 M⊕','1,0 g','+19 °C','25 ч','402 сут','2','азот, кислород'],
 ds:'Тёплые океаны, архипелаги и мягкий климат. Самая дружелюбная планета каталога для колонистов.',
 ev:[['через 3 дня','Сезон приливов: волны до 40 м'],['через 31 день','Миграция светящегося планктона']]},
{n:'Крион',t:'Ледяной мир',r:3.6,mode:'terr',pal:['#bcd8ee','#e8f4fb','#9cc4e4','#ffffff','#7fb0d6'],atm:'#bfe6ff',hab:18,price:610e6,
 s:['4 300 км','0,4 M⊕','0,6 g','−96 °C','31 ч','720 сут','нет','разреженный азот'],
 ds:'Ледяная пустыня с подлёдным океаном. Подходит для научных станций и зимних курортов.',
 ev:[['через 6 дней','Ледяные гейзеры: пик активности'],['через 52 дня','Полярное сияние на всю планету']]},
{n:'Гигас',t:'Газовый гигант с кольцами',r:8.5,mode:'bands',pal:['#6b4a2c','#b88a58','#e8cfa0','#c99c64','#f3e6c4'],atm:'#ffd9a0',ring:1,hab:0,price:9.8e9,
 s:['72 000 км','95 M⊕','2,3 g','−140 °C','10 ч','29 лет','74','водород, гелий'],
 ds:'Крупнейшая планета каталога с мощной системой колец. Орбитальные станции и добыча гелия-3.',
 ev:[['через 11 дней','Парад спутников: тройное затмение'],['через 90 дней','Шторм-гигант достигает пика']]},
{n:'Рубикон',t:'Пустынный мир',r:3.9,mode:'terr',pal:['#3a1608','#7d2f12','#b9582a','#d98a52','#efc08a'],atm:'#ff9a6a',hab:41,price:1.2e9,disc:15,
 s:['3 400 км','0,15 M⊕','0,4 g','−28 °C','25 ч','687 сут','2','тонкий СО₂'],
 ds:'Каньоны и ржавые дюны. Хороший старт для терраформинга.',
 ev:[['завтра','Пылевая буря: связь ограничена на 2 дня'],['через 20 дней','Старт сезона терраформинга']]},
{n:'Нефрита',t:'Джунглевой мир',r:5,mode:'terr',pal:['#08301d','#0f5a2a','#2e8b3d','#7ac15a','#c9e27a','#2a6f68'],atm:'#7dffb0',hab:78,price:2.7e9,
 s:['7 100 км','1,3 M⊕','1,1 g','+31 °C','22 ч','330 сут','1','азот, кислород'],
 ds:'Планета-сад с плотными джунглями и редкими растениями для фармацевтики.',
 ev:[['через 5 дней','Сезон дождей: ливни по всему экватору'],['через 25 дней','Цветение биолюминесцентных лесов']]},
{n:'Лазурис',t:'Ледяной гигант',r:6.5,mode:'bands',pal:['#0b2a6e','#1a55b8','#3a8be0','#7fc4ff','#2a6fd0'],atm:'#59b4ff',hab:0,price:4.4e9,
 s:['25 000 км','17 M⊕','1,0 g','−200 °C','17 ч','84 года','27','водород, метан'],
 ds:'Синий гигант с метановыми облаками. Тихая орбита для обсерваторий.',
 ev:[['через 8 дней','Алмазный дождь в глубоких слоях'],['через 60 дней','Редкое выравнивание спутников']]},
{n:'Эмбер',t:'Газовый гигант',r:7.2,mode:'bands',pal:['#5a1e0a','#a8441a','#e07a2e','#f0b060','#8f3414'],atm:'#ff9b4a',hab:0,price:6.1e9,disc:5,
 s:['60 000 км','60 M⊕','1,1 g','−90 °C','11 ч','9 лет','31','водород, аммиак'],
 ds:'Огненно-оранжевый гигант с вечными штормами. Топливная станция на пути через галактику.',
 ev:[['через 2 дня','Шторм «Красное око»: максимум мощности'],['через 40 дней','Метеорный поток из пояса астероидов']]},
{n:'Ониксия',t:'Кристаллический мир',r:3.4,mode:'terr',pal:['#0a0714','#241046','#4b1f8a','#8a4fe0','#d6a8ff','#1a1030'],atm:'#b07bff',hab:9,price:1.9e9,
 s:['2 900 км','0,2 M⊕','0,5 g','−40 °C','40 ч','150 сут','3','аргон'],
 ds:'Тёмный мир с гигантскими фиолетовыми кристаллами. Находка для коллекционеров и добытчиков.',
 ev:[['через 10 дней','Резонанс кристаллов: планета «поёт»'],['через 45 дней','Аукцион редких геод']]}
];

/* ---------- СЦЕНА ---------- */
const cv=$('c'),R=new THREE.WebGLRenderer({canvas:cv,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
const S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,1,.5,6000);
const rs=()=>{R.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()};
addEventListener('resize',rs);rs();

const gt=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d'),r=g.createRadialGradient(64,64,0,64,64,64);
r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.25,'rgba(255,255,255,.35)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c)})();
const glow=(col,op)=>new THREE.Sprite(new THREE.SpriteMaterial({map:gt,color:col,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:op}));
const ga=()=>(Math.random()+Math.random()+Math.random()-1.5)/1.5;

/* галактика: ядро + 3 спиральных рукава */
(()=>{const N=50000,pos=new Float32Array(N*3),col=new Float32Array(N*3),c=new THREE.Color(),A=new THREE.Color('#ffd9a0'),B=new THREE.Color('#7fa8ff'),C=new THREE.Color('#ff9ad0');
for(let i=0;i<N;i++){let x,y,z,r;
 if(i<12000){r=Math.abs(ga())*60;const a=Math.random()*6.283;x=Math.cos(a)*r;z=Math.sin(a)*r;y=ga()*r*.35}
 else{r=8+Math.pow(Math.random(),.8)*420;const a=(i%3)*2.094+r*.011+ga()*.32;x=Math.cos(a)*r;z=Math.sin(a)*r;y=ga()*(2+14*Math.exp(-r/100))}
 c.copy(A).lerp(B,cl(r/380,0,1));if(Math.random()<.08)c.lerp(C,.6);c.multiplyScalar(.5+Math.random()*.7);
 pos.set([x,y,z],i*3);col.set([c.r,c.g,c.b],i*3)}
const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
S.add(new THREE.Points(g,new THREE.PointsMaterial({size:1.7,map:gt,vertexColors:true,transparent:true,opacity:.85,blending:THREE.AdditiveBlending,depthWrite:false})));
const M=2500,sp=new Float32Array(M*3);
for(let i=0;i<M;i++){const u=Math.random()*6.283,v=Math.acos(2*Math.random()-1);sp.set([2800*Math.sin(v)*Math.cos(u),2800*Math.cos(v),2800*Math.sin(v)*Math.sin(u)],i*3)}
const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.BufferAttribute(sp,3));
S.add(new THREE.Points(g2,new THREE.PointsMaterial({size:2,sizeAttenuation:false,map:gt,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false})))})();

/* ядро и свет */
S.add(new THREE.Mesh(new THREE.SphereGeometry(12,32,24),new THREE.MeshBasicMaterial({color:0xfff1c9})));
const cg=glow(0xffcf8a,.9);cg.scale.setScalar(230);S.add(cg);
S.add(new THREE.PointLight(0xfff0d8,1.9,0,0),new THREE.AmbientLight(0x556080,.55));

/* ---------- ТЕКСТУРЫ ---------- */
const h3=(x,y,z)=>{const n=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return n-Math.floor(n)};
const L=(a,b,t)=>a+(b-a)*t;
function vn(x,y,z){const xi=Math.floor(x),yi=Math.floor(y),zi=Math.floor(z),xf=x-xi,yf=y-yi,zf=z-zi,u=xf*xf*(3-2*xf),v=yf*yf*(3-2*yf),w=zf*zf*(3-2*zf);
return L(L(L(h3(xi,yi,zi),h3(xi+1,yi,zi),u),L(h3(xi,yi+1,zi),h3(xi+1,yi+1,zi),u),v),L(L(h3(xi,yi,zi+1),h3(xi+1,yi,zi+1),u),L(h3(xi,yi+1,zi+1),h3(xi+1,yi+1,zi+1),u),v),w)}
function fbm(x,y,z,o){let s=0,a=.5,f=1;for(let i=0;i<o;i++){s+=a*vn(x*f,y*f,z*f);a*=.5;f*=2}return s}
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
function makeTex(p,seed){
 const W=384,H=192,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d'),im=g.createImageData(W,H),pal=p.pal.map(rgb),n=pal.length-1;
 for(let y=0;y<H;y++)for(let x=0;x<W;x++){
  const lo=x/W*6.2832,la=(y/H-.5)*3.1416,cx=Math.cos(la)*Math.cos(lo),cy=Math.sin(la),cz=Math.cos(la)*Math.sin(lo);let t;
  if(p.mode==='bands')t=.5+.5*Math.sin(cy*9+fbm(cx*3+seed,cy*1.3,cz*3,4)*5);
  else if(p.mode==='lava'){t=1-Math.abs(fbm(cx*3+seed,cy*3,cz*3,5)*2-1);t*=t}
  else t=cl((fbm(cx*2.2+seed,cy*2.2,cz*2.2,5)-.25)*1.9,0,1);
  const q=cl(t,0,.999)*n,i=Math.floor(q),f=q-i,k=(y*W+x)*4;
  for(let j=0;j<3;j++)im.data[k+j]=L(pal[i][j],pal[i+1][j],f);im.data[k+3]=255}
 g.putImageData(im,0,0);const T=new THREE.CanvasTexture(c);T.anisotropy=4;return T}
const atmMat=c=>new THREE.ShaderMaterial({uniforms:{c:{value:new THREE.Color(c)}},
 vertexShader:'varying vec3 n,v;void main(){n=normalize(normalMatrix*normal);vec4 m=modelViewMatrix*vec4(position,1.);v=normalize(-m.xyz);gl_Position=projectionMatrix*m;}',
 fragmentShader:'uniform vec3 c;varying vec3 n,v;void main(){float f=pow(1.-abs(dot(n,v)),2.)*1.3;gl_FragColor=vec4(c,f);}',
 transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.BackSide});
function ring(r){const a=r*1.5,b=r*2.7,g=new THREE.RingGeometry(a,b,96),pos=g.attributes.position,uv=g.attributes.uv,v=new THREE.Vector3();
 for(let i=0;i<pos.count;i++){v.fromBufferAttribute(pos,i);uv.setXY(i,(v.length()-a)/(b-a),.5)}
 const c=document.createElement('canvas');c.width=256;c.height=2;const x=c.getContext('2d');
 for(let i=0;i<256;i++){const al=cl(.25+.5*Math.sin(i*.35)*Math.sin(i*.09)+.25*Math.sin(i*1.3),0,1)*(i>200&&i<210?.1:1);x.fillStyle=`rgba(225,200,150,${al})`;x.fillRect(i,0,1,2)}
 const m=new THREE.Mesh(g,new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),side:THREE.DoubleSide,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2+.45;return m}

/* ---------- ПЛАНЕТЫ НА РУКАВАХ ГАЛАКТИКИ ---------- */
P.forEach((p,i)=>{
 const orb=80+i*36,a=(i%3)*2.094+orb*.011+((i*1.37)%1-.5)*.25;
 p.g=new THREE.Group();p.g.position.set(Math.cos(a)*orb,(i%2?6:-6),Math.sin(a)*orb);p.dist=Math.round(orb*90);
 const mp={map:makeTex(p,i*7.3),roughness:.9,metalness:0};
 if(p.mode==='lava'){mp.emissive=new THREE.Color(0xff5520);mp.emissiveIntensity=.9}
 p.m=new THREE.Mesh(new THREE.SphereGeometry(p.r,48,32),new THREE.MeshStandardMaterial(mp));
 if(p.mode==='lava')p.m.material.emissiveMap=p.m.material.map;
 p.g.add(p.m,new THREE.Mesh(new THREE.SphereGeometry(p.r*1.15,32,24),atmMat(p.atm)));
 if(p.ring)p.g.add(ring(p.r));
 p.gl=glow(p.atm,.85);p.g.add(p.gl);S.add(p.g);p.sp=.05+(i%3)*.03;
 p.lb=document.createElement('div');p.lb.className='lb';p.lb.textContent=p.n;p.lb.onclick=()=>pick(i);$('labels').appendChild(p.lb);
 const b=document.createElement('button');b.innerHTML=`<i style="background:${p.atm}"></i>${p.n}`;b.onclick=()=>pick(i);$('nav').appendChild(b);p.nb=b});

/* ---------- КАМЕРА ---------- */
const HOME={x:0,y:0,z:0,d:640,th:.6,ph:1};
const cur={...HOME},des={...HOME};let sel=-1,follow=false,spin=true,drag=false;
const minD=()=>sel>=0&&follow?P[sel].r*1.8:12;
function pick(i){
 sel=i;follow=true;const p=P[i];des.d=p.r*4.5;
 $('pn').textContent=p.n;$('pt').textContent=p.t;
 $('pr').innerHTML=[...LB.map((l,j)=>[l,p.s[j]]),['Расстояние до ядра',p.dist.toLocaleString('ru-RU')+' св. лет']].map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join('');
 $('hab').innerHTML=`<span>Пригодность для жизни</span><i><u style="width:${p.hab}%"></u></i><em>${p.hab}%</em>`;
 $('pd').textContent=p.ds;
 $('pe').innerHTML=p.ev.map(([w,t])=>`<li><time>${w}</time>${t}</li>`).join('');
 $('price').innerHTML=(p.disc?`<s>${fmt(p.price)}</s><em>−${p.disc}%</em>`:'')+`<strong>${fmt(cost(p))}</strong>`;
 $('panel').classList.add('open');$('cartbox').classList.remove('open');
 P.forEach((q,j)=>q.nb.classList.toggle('on',j===i));bbState();spinBtn()}
function home(){sel=-1;follow=false;Object.assign(des,HOME,{th:des.th});$('panel').classList.remove('open');P.forEach(q=>q.nb.classList.remove('on'))}
const spinBtn=()=>$('spin').textContent='Авто-осмотр: '+(spin?'вкл':'выкл');
$('spin').onclick=()=>{spin=!spin;spinBtn()};$('back').onclick=home;

/* ---------- УПРАВЛЕНИЕ ---------- */
const ptrs=new Map();let moved=0;
cv.oncontextmenu=e=>e.preventDefault();
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});moved=0;drag=true;cv.style.cursor='grabbing'});
cv.addEventListener('pointermove',e=>{
 const p=ptrs.get(e.pointerId);
 if(!p){cv.style.cursor=hit(e.clientX,e.clientY)>=0?'pointer':'grab';return}
 const dx=e.clientX-p.x,dy=e.clientY-p.y;
 if(ptrs.size===2){const o=[...ptrs.entries()].find(([k])=>k!==e.pointerId)[1];
  des.d=cl(des.d*Math.hypot(p.x-o.x,p.y-o.y)/Math.max(1,Math.hypot(e.clientX-o.x,e.clientY-o.y)),minD(),1500);moved+=99}
 else{moved+=Math.abs(dx)+Math.abs(dy);
  if(e.buttons&2||e.shiftKey){const r=new THREE.Vector3().setFromMatrixColumn(cam.matrix,0),u=new THREE.Vector3().setFromMatrixColumn(cam.matrix,1),s=des.d*.0016;
   des.x+=(-r.x*dx+u.x*dy)*s;des.y+=(-r.y*dx+u.y*dy)*s;des.z+=(-r.z*dx+u.z*dy)*s;follow=false}
  else{des.th+=dx*.006;des.ph=cl(des.ph-dy*.006,.08,3.06)}}
 p.x=e.clientX;p.y=e.clientY});
cv.addEventListener('pointerup',e=>{const was=ptrs.size;ptrs.delete(e.pointerId);drag=ptrs.size>0;cv.style.cursor='grab';
 if(was===1&&moved<6){const h=hit(e.clientX,e.clientY);if(h>=0)pick(h)}});
cv.addEventListener('pointercancel',e=>{ptrs.delete(e.pointerId);drag=ptrs.size>0});
cv.addEventListener('wheel',e=>{e.preventDefault();des.d=cl(des.d*Math.exp(e.deltaY*.0012),minD(),1500)},{passive:false});
const keys=new Set();
addEventListener('keydown',e=>{
 if(e.code==='Escape')return home();
 if(/^Digit[1-9]$/.test(e.code)&&P[+e.code[5]-1])return pick(+e.code[5]-1);
 keys.add(e.code)});
addEventListener('keyup',e=>keys.delete(e.code));
addEventListener('blur',()=>keys.clear());

/* выбор планеты по экрану: ближайшая в пределах её видимого размера */
const V=new THREE.Vector3();
function hit(x,y){let best=-1,bd=1e9;
 P.forEach((p,i)=>{V.copy(p.g.position).project(cam);if(V.z>1)return;
  const sx=(V.x*.5+.5)*innerWidth,sy=(-V.y*.5+.5)*innerHeight,d=cam.position.distanceTo(p.g.position),
  pr=p.r/(d*Math.tan(.4800))*innerHeight/2,th=Math.max(24,pr),dist=Math.hypot(sx-x,sy-y)/th;
  if(dist<1&&dist<bd){bd=dist;best=i}});return best}

/* ---------- КОРЗИНА ---------- */
const cart=new Set(),cost=p=>p.disc?Math.round(p.price*(1-p.disc/100)):p.price;
function toast(t){const e=$('toast');e.textContent=t;e.classList.add('on');clearTimeout(toast.k);toast.k=setTimeout(()=>e.classList.remove('on'),2600)}
function bbState(){if(sel<0)return;const on=cart.has(sel);$('bb').textContent=on?'Убрать из корзины':'В корзину';$('bb').classList.toggle('in',on)}
function drawCart(){let tot=0;$('cc').textContent=cart.size;
 const it=[...cart].map(i=>{tot+=cost(P[i]);return `<div><span>${P[i].n}</span><b>${fmt(cost(P[i]))}</b><button data-r="${i}" aria-label="Убрать ${P[i].n}">×</button></div>`}).join('');
 $('cartbox').innerHTML=cart.size?it+`<div class="tot"><span>Итого</span><b>${fmt(tot)}</b></div><button id="ord">Оформить заявку</button>`:'<p>Корзина пуста. Выберите планету и нажмите «В корзину».</p>';bbState()}
$('bb').onclick=()=>{if(cart.has(sel)){cart.delete(sel)}else{cart.add(sel);toast(P[sel].n+' добавлена в корзину')}drawCart()};
$('cart').onclick=()=>$('cartbox').classList.toggle('open');
$('cartbox').onclick=e=>{const t=e.target;
 if(t.dataset.r){cart.delete(+t.dataset.r);drawCart()}
 if(t.id==='ord'){cart.clear();drawCart();$('cartbox').classList.remove('open');toast('Заявка отправлена. Менеджер свяжется с вами')}};
drawCart();

/* ---------- ЦИКЛ ---------- */
const fw=new THREE.Vector3(),rt=new THREE.Vector3();let last=performance.now();
function loop(t){requestAnimationFrame(loop);const dt=Math.min((t-last)/1000,.05);last=t;
 P.forEach(p=>p.m.rotation.y+=dt*p.sp);
 if(keys.size){cam.getWorldDirection(fw);rt.setFromMatrixColumn(cam.matrix,0);const s=Math.max(25,cur.d)*dt*1.1;let m=false;
  const mv=(k,v,sg)=>{if(keys.has(k)){des.x+=v.x*s*sg;des.y+=v.y*s*sg;des.z+=v.z*s*sg;m=true}};
  mv('KeyW',fw,1);mv('KeyS',fw,-1);mv('KeyD',rt,1);mv('KeyA',rt,-1);
  if(keys.has('KeyE')){des.y+=s;m=true}if(keys.has('KeyQ')){des.y-=s;m=true}
  if(m)follow=false}
 if(sel>=0&&follow){const g=P[sel].g.position;des.x=g.x;des.y=g.y;des.z=g.z;if(spin&&!drag)des.th+=dt*.18}
 else if(sel<0&&!drag)des.th+=dt*.03;
 const k=1-Math.exp(-dt*4.5);for(const q in cur)cur[q]+=(des[q]-cur[q])*k;
 cam.position.set(cur.x+cur.d*Math.sin(cur.ph)*Math.cos(cur.th),cur.y+cur.d*Math.cos(cur.ph),cur.z+cur.d*Math.sin(cur.ph)*Math.sin(cur.th));
 cam.lookAt(cur.x,cur.y,cur.z);
 P.forEach((p,i)=>{const d=cam.position.distanceTo(p.g.position);
  p.gl.material.opacity=cl((d-p.r*5)/(p.r*25),0,.85);p.gl.scale.setScalar(p.r*5+d*.02);
  V.copy(p.g.position).project(cam);const vis=V.z<1&&i!==sel;p.lb.style.display=vis?'':'none';
  if(vis)p.lb.style.transform=`translate(${(V.x*.5+.5)*innerWidth}px,${(-V.y*.5+.5)*innerHeight}px) translate(-50%,16px)`});
 R.render(S,cam)}
requestAnimationFrame(loop);
})();
