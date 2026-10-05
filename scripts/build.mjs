import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const read=p=>fs.readFile(p,'utf8');
await fs.rm('dist',{recursive:true,force:true});
await fs.mkdir('dist/assets',{recursive:true});
await fs.cp('public','dist',{recursive:true});
// Model is stored compressed to reduce transfer; the viewer reconstructs the original GLB.
await fs.rm('dist/assets/models/encanto-propuesta.glb',{force:true});
await fs.writeFile('dist/index.html',await read('src/editor.html'));
await fs.mkdir('dist/presentacion',{recursive:true});
await fs.writeFile('dist/presentacion/index.html',await read('src/viewer.html'));
for(const name of ['editor','model','share','viewer','editor-ui','event-tools'])await fs.copyFile('src/'+name+'.js','dist/assets/'+name+'.js');
await fs.writeFile('dist/assets/editor.css',(await read('src/editor-base.css'))+'\n'+await read('src/studio.css'));
await fs.writeFile('dist/assets/viewer.css',(await read('src/viewer.css'))+'\n.row{flex-wrap:wrap}.row button{min-width:110px}');
let offline='<!--\n'+(await read('public/assets/vendor/LICENSE.txt'))+'\n-->\n'+await read('src/viewer.html');
offline=offline.replace('<link rel="stylesheet" href="/assets/viewer.css">','<style>'+await read('src/viewer.css')+'</style>');
const scripts=['/assets/vendor/three.min.js','/assets/model.js','/assets/share.js','/assets/viewer.js'];
for(const src of scripts){const tag='<script src="'+src+'"></script>';if(src.endsWith('/model.js')){offline=offline.replace(tag,'<script id="presentationData" type="application/json">__JCH_PRESENTATION_DATA__</script><script id="modelData" type="application/octet-stream">__JCH_MODEL_DATA__</script>');}else{const file=src.endsWith('three.min.js')?'public'+src:'src/'+src.split('/').pop();offline=offline.replace(tag,()=>'<script>\n'+awaitReadPlaceholder(src)+'\n</script>');}}
function awaitReadPlaceholder(src){return '__INLINE_'+src.split('/').pop().replaceAll('.','_')+'__'}
for(const src of scripts.filter(s=>!s.endsWith('/model.js'))){const path=src.endsWith('three.min.js')?'public'+src:'src/'+src.split('/').pop();const code=await read(path);offline=offline.replace(awaitReadPlaceholder(src),()=>code.replace(/<\/script/gi,'<\\/script'));}
await fs.writeFile('dist/assets/viewer.template.html',offline);
const versionHash=crypto.createHash('sha256');
for(const file of ['index.html','presentacion/index.html','assets/model.js','assets/viewer.js','assets/share.js','assets/editor-ui.js','assets/event-tools.js','assets/editor.js','assets/editor.css','assets/viewer.css'])versionHash.update(await read('dist/'+file));
const hash=versionHash.digest('hex').slice(0,12);
const shell=['/presentacion/','/assets/vendor/three.min.js','/assets/model.js','/assets/share.js','/assets/viewer.js','/assets/viewer.css','/assets/textures/encanto-mural.jpg'];
await fs.writeFile('dist/sw.js',`const CACHE='jch3d-${hash}';const SHELL=${JSON.stringify(shell)};self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('jch3d-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)))}return r}).catch(()=>caches.match(e.request).then(r=>r||Response.error())))});`);
console.log('JCH 3D construido: editor, visor, modelo y plantilla offline. Versión '+hash);
