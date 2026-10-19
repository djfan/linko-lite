// Explicit, content-free events only. Analytics failures never block navigation.
(() => {
 const token = 'phc_qFpMV6F7qc75SQHAWEAfMGGe5fXbcZzjdAGHs34PWxqR';
 const host = 'https://us.i.posthog.com';
 const storageKey = 'linko-lite-statistics-disabled';
 const toggle = document.getElementById('statistics');
 const isTest = location.hostname !== 'djfan.github.io' || !location.pathname.startsWith('/linko-lite/');
 let disabled = false;
 try { disabled = localStorage.getItem(storageKey) === 'true'; } catch (_) {}
 let client = null;
 let loading = false;
 const pending = [];
 const allowed = new Set(['token', 'distinct_id', '$device_id', '$session_id', '$window_id', '$lib', '$lib_version', '$browser', '$browser_version', '$os', '$os_version', '$device_type', '$viewport_height', '$viewport_width', '$is_identified', '$process_person_profile', 'source', 'is_test', 'language', 'release_version', '$current_url', '$pathname', '$host', '$referrer', '$referring_domain', 'utm_source', 'utm_medium', 'utm_campaign']);
 function clean(event) {
  if (!['$pageview', 'download_clicked'].includes(event.event)) return null;
  const properties = event.properties || {};
  for (const key of Object.keys(properties)) if (!allowed.has(key)) delete properties[key];
  properties.$current_url = location.origin + location.pathname;
  properties.$pathname = location.pathname;
  try { properties.$referrer = document.referrer ? new URL(document.referrer).origin : ''; } catch (_) { properties.$referrer = ''; }
  properties.source = 'web'; properties.is_test = isTest;
  properties.$geoip_disable = true; properties.$ip = '0.0.0.0';
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
   const value = new URLSearchParams(location.search).get(key);
   if (value) properties[key] = value.slice(0, 100);
  }
  delete event.$set; delete event.$set_once;
  event.properties = properties;
  return event;
 }
 function capture(event, properties = {}) {
  if (disabled) return;
  const payload = {...properties, language: document.documentElement.lang, source: 'web', is_test: isTest};
  try { if (client) client.capture(event, payload); else if (pending.length < 20) pending.push([event, payload]); } catch (_) {}
 }
 function load() {
  if (disabled || client || loading) return;
  loading = true;
  const script = document.createElement('script');
  script.src = 'https://us-assets.i.posthog.com/static/array.js'; script.async = true;
  script.onerror = () => { loading = false; pending.length = 0; };
  script.onload = () => {
   loading = false;
   if (disabled || !window.posthog) return;
   try {
    window.posthog.init(token, {
     api_host: host, ui_host: 'https://us.posthog.com',
     autocapture: false, capture_pageview: false, capture_pageleave: false,
     capture_dead_clicks: false, capture_performance: false,
     disable_session_recording: true, enable_heatmaps: false, disable_surveys: true,
     advanced_disable_feature_flags: true, advanced_disable_flags: true,
     person_profiles: 'never', persistence: 'localStorage', ip: false,
     before_send: clean,
     loaded: instance => { client = instance; if (!disabled && instance.has_opted_out_capturing()) instance.opt_in_capturing({captureEventName: false}); while (pending.length && !disabled) { const [event, props] = pending.shift(); client.capture(event, props); } }
    });
   } catch (_) { pending.length = 0; }
  };
  document.head.appendChild(script);
 }
 function updateToggle() {
  if (!toggle) return;
  const en = document.documentElement.lang.startsWith('en');
  toggle.textContent = en ? `Statistics: ${disabled ? 'off' : 'on'}` : `统计：${disabled ? '关' : '开'}`;
  toggle.setAttribute('aria-pressed', String(!disabled));
  toggle.title = en ? 'Page visits and download clicks only. Click to change.' : '仅统计页面访问与下载点击，点击切换。';
 }
 toggle?.addEventListener('click', () => {
  disabled = !disabled;
  try { localStorage.setItem(storageKey, String(disabled)); } catch (_) {}
  if (disabled) { pending.length = 0; try { client?.opt_out_capturing(); } catch (_) {} }
  else { try { client?.opt_in_capturing({captureEventName: false}); } catch (_) {} capture('$pageview'); load(); }
  updateToggle();
 });
 document.getElementById('language')?.addEventListener('click', updateToggle);
 document.querySelector('.hero-copy .button')?.addEventListener('click', event => {
  const version = event.currentTarget.href.match(/\/download\/(v[^/]+)\//)?.[1];
  capture('download_clicked', version ? {release_version: version} : {});
 });
 updateToggle(); capture('$pageview'); load();
})();
