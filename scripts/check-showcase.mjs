// Dependency-free checks for the public showcase, not the private application.
import assert from 'node:assert/strict';
import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname,join,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const files=[];
async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){if(item.name==='.git')continue;assert.equal(item.isSymbolicLink(),false,'No linked private directories');const path=join(dir,item.name);if(item.isDirectory())await walk(path);else files.push(path);}}
await walk(root);
const forbidden=/(?:^|\/)(?:\.env(?:\..*)?|\.runtime|node_modules|qa|private-source-snapshot|server\.mjs|app\.js|ai-config[^/]*|document-engine[^/]*)$/;
for(const path of files){const name=relative(root,path).replaceAll('\\','/');assert.ok(!forbidden.test(name),'Private or runtime file: '+name);assert.ok(!/\.(?:docx|pdf|dpapi|pem|key)$/i.test(name),'Unexpected document or credential: '+name);const info=await stat(path);assert.ok(info.size<2*1024*1024,'Unexpectedly large file: '+name);if(/\.(?:html|css|js|mjs|md|ya?ml|json|svg)$/i.test(name)){const text=await readFile(path,'utf8');const patterns=[new RegExp('gh'+'[pousr]_[A-Za-z0-9]{30,}'),new RegExp('github'+'_pat_[A-Za-z0-9_]{30,}'),new RegExp('sk'+'-[A-Za-z0-9]{28,}'),new RegExp('-----BEGIN '+'(?:RSA |EC |OPENSSH )?PRIVATE KEY-----')];assert.ok(!patterns.some(p=>p.test(text)),'Possible credential in '+name);}}
const html=await readFile(join(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){const ref=match[1];if(/^(?:https?:|#)/.test(ref))continue;await stat(join(root,ref));}
for(const name of ['build','themes','collaboration'])await stat(join(root,'docs/images/'+name+'.png'));
const js=await readFile(join(root,'showcase.js'),'utf8');
assert.ok(!/\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage)\s*(?:\(|\.)/.test(js),'Demo must not transmit or store input');
assert.equal((html.match(/data-case=/g)||[]).length,3);
assert.equal((html.match(/data-screen=/g)||[]).length,3);
assert.match(html,/不调用 AI/);
assert.match(await readFile(join(root,'README.md'),'utf8'),/核心应用源码保持私有/);
console.log('PASS: '+files.length+' public files; local links and screenshots resolve; no core application, user documents, credential patterns or demo network calls.');
