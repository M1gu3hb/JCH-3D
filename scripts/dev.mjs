import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import './build.mjs';
const root=path.resolve('dist');
const types={'.html':'text/html;charset=utf-8','.js':'application/javascript;charset=utf-8','.css':'text/css;charset=utf-8','.json':'application/json','.jpg':'image/jpeg','.glb':'model/gltf-binary','.gz':'application/octet-stream'};
http.createServer(async(req,res)=>{try{let file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return}const stat=await fs.stat(file);if(stat.isDirectory())file=path.join(file,'index.html');const bytes=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(bytes)}catch{res.writeHead(404);res.end('Archivo no encontrado')}}).listen(Number(process.env.PORT||4173),'0.0.0.0',()=>console.log('JCH 3D: http://localhost:'+(process.env.PORT||4173)));
