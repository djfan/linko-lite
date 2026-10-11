const en = {
eyebrow:'A quiet notebook for Android',headline:'Keep the thought.<br>Let the rest go.',intro:'Linko, with less.<br>Write it down. Move on.',try:'Download for Android',heroNote:'Write offline. Saved as you go.',note1:'Clarity can wait.<br>Capture the thought.',note2:'Less to do.<br>More to notice.',note3:'Take a walk.<br>Choose the trees.',note4:'Leave the weekend open.',principle1:'Capture it.',principle2:'Keep it.',principle3:'Carry on.',ideaTitle:'Less tool.<br>More thought.',ideaBody:'No title to invent. No format to choose.<br>A thought. A few lines. Enough.',demoTitle:'What is on your mind?',demoNotebook:'A blank page',inputLabel:'Write your thought',demoEmpty:'Web demo · refresh to clear',clear:'Clear',demoDisclaimer:'Words stay here. Nothing is uploaded.',release:'Android 8+ · Beta',statusLabel:'Installation',statusBody:'Physical-phone checks pending.',storageBody:'Sign in. Write offline. Sync online.',recoveryBody:'Install updates over the app. Keep its data.',installDetails:'Full instructions ↗'
};
const elements=[...document.querySelectorAll('[data-i18n]')];
const zh=Object.fromEntries(elements.map(element=>[element.dataset.i18n,element.innerHTML]));
let language='zh';
const input=document.getElementById('thought');
const status=document.getElementById('demoStatus');
const editor=document.getElementById('demoEditor');
const theme=document.getElementById('demoTheme');
function updateStatus(){status.textContent=language==='zh'?zh.demoEmpty:en.demoEmpty;}
function updateThemeLabel(){const dark=editor.classList.contains('dark');const label=language==='zh'?(dark?'切换演示浅色模式':'切换演示深色模式'):(dark?'Switch demo to light mode':'Switch demo to dark mode');theme.setAttribute('aria-label',label);theme.title=label;theme.setAttribute('aria-pressed',String(dark));}
document.getElementById('language').addEventListener('click',()=>{
 language=language==='zh'?'en':'zh';document.documentElement.lang=language==='zh'?'zh-CN':'en';
 const dictionary=language==='zh'?zh:en;elements.forEach(element=>element.innerHTML=dictionary[element.dataset.i18n]);
 const toggle=document.getElementById('language');toggle.innerHTML=language==='zh'?'EN':'中文';toggle.setAttribute('aria-label',language==='zh'?'切换英文':'Switch to Chinese');
 document.querySelector('nav').setAttribute('aria-label',language==='zh'?'主导航':'Main navigation');
 document.querySelector('.brand').setAttribute('aria-label',language==='zh'?'Linko Lite 首页':'Linko Lite home');
 document.querySelector('.phone').setAttribute('aria-label',language==='zh'?'Linko Lite 概念界面':'Linko Lite concept interface');
 input.placeholder=language==='zh'?'从一句话开始。':'Start with a sentence.';
 document.title=language==='zh'?'Linko Lite — 留住念头，其余留白':'Linko Lite — Keep the thought. Let the rest go.';
 document.querySelector('meta[name="description"]').content=language==='zh'?'Linko Lite，Linko 的轻量笔记本。离线写，自动存。留住念头，其余留白。':'Linko, with less. A quiet Android notebook. Write offline. Saved as you go.';
 updateThemeLabel();updateStatus();
});
document.getElementById('clearDemo').addEventListener('click',()=>{input.value='';updateStatus();input.focus();});
theme.addEventListener('click',()=>{editor.classList.toggle('dark');updateThemeLabel();});
updateThemeLabel();

// Share the app's approved release manifest; keep the existing download as a quiet fallback.
fetch('./release.json', {cache:'no-cache'}).then(response=>{
 if(!response.ok) throw new Error('No release metadata');
 return response.json();
}).then(release=>{
 if(release.applicationId==='com.linko.lite.offline' && Number.isInteger(release.versionCode) && release.versionCode>0 &&
  ['stable','beta'].includes(release.channel) && /^https:\/\/github\.com\/djfan\/linko-lite\/releases\/download\/v[0-9A-Za-z.-]+\/linko-lite\.apk$/.test(release.downloadUrl)){
  document.querySelector('.hero-copy .button').href=release.downloadUrl;
 }
}).catch(()=>{});
