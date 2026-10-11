const en = {
headline:'Keep the thought.<br>Let the rest go.',try:'Download for Android',heroNote:'Write offline. Saved as you go.',note1:'Clarity can wait.<br>Capture the thought.',note2:'Less to do.<br>More to notice.',note3:'Take a walk.<br>Choose the trees.',note4:'Leave the weekend open.',release:'Android 8+ · Beta',installation:'Installation ↗'
};
const elements=[...document.querySelectorAll('[data-i18n]')];
const zh=Object.fromEntries(elements.map(element=>[element.dataset.i18n,element.innerHTML]));
let language='zh';
document.getElementById('language').addEventListener('click',()=>{
 language=language==='zh'?'en':'zh';document.documentElement.lang=language==='zh'?'zh-CN':'en';
 const dictionary=language==='zh'?zh:en;elements.forEach(element=>element.innerHTML=dictionary[element.dataset.i18n]);
 const toggle=document.getElementById('language');toggle.textContent=language==='zh'?'EN':'中文';toggle.setAttribute('aria-label',language==='zh'?'切换英文':'Switch to Chinese');
 document.querySelector('nav').setAttribute('aria-label',language==='zh'?'主导航':'Main navigation');
 document.querySelector('.brand').setAttribute('aria-label',language==='zh'?'Linko Lite 首页':'Linko Lite home');
 document.querySelector('.phone').setAttribute('aria-label',language==='zh'?'Linko Lite 概念界面':'Linko Lite concept interface');
 document.title=language==='zh'?'Linko Lite — 留住念头，其余留白':'Linko Lite — Keep the thought. Let the rest go.';
 document.querySelector('meta[name="description"]').content=language==='zh'?'Linko Lite，Linko 的轻量笔记本。离线写，自动存。留住念头，其余留白。':'Linko, with less. A quiet Android notebook. Write offline. Saved as you go.';
});

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
