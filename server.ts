import { serve } from 'https://deno.land/std/http/server.ts'
import { serveFolder } from './serve-folder.ts'

const s = serve({ port: 80 });
console.log("http://localhost:80/");
for await (const req of s) {
  serveFolder('public', req)
}
