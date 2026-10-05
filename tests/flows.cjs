const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path');
(async()=>{const base=process.env.TEST_URL||'http://localhost:4173/';let server;
try{if(!process.env.TEST_URL){server=spawn(process.execPath,['scripts/dev.mjs'],{stdio:'inherit',env:{...process.env,PORT:'4173'}});let started=false;for(let i=0;i<100;i++){try{const r=await fetch(base);if(r.ok){started=true;break}}catch{}await new Promise(r=>setTimeout(r,100))}if(!started)throw Error('No se pudo iniciar el servidor de pruebas')}
fs.mkdirSync('artifacts',{recursive:true});const suites=process.argv.slice(2).length?process.argv.slice(2):['editor-regression','editor-touch','editor-compatibility','presentation','event-organization','venues'];
for(const suite of suites){if(!/^[a-z-]+$/.test(suite))throw Error('Nombre de prueba no válido');const exit=await new Promise((resolve,reject)=>{const child=spawn(process.execPath,[path.join('tests',suite+'.cjs'),base],{stdio:'inherit',env:process.env});child.on('error',reject);child.on('exit',resolve)});if(exit!==0)throw Error('Falló la prueba '+suite)}
console.log('Todas las pruebas seleccionadas pasaron: '+suites.join(', '));
}catch(e){console.error(e.message);process.exitCode=1}finally{server?.kill()}})();
