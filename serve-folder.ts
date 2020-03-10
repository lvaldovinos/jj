import { ServerRequest } from 'https://deno.land/std/http/server.ts'
import { contentType } from "https://deno.land/std/media_types/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";

export async function serveFolder (folderPath: string, req: ServerRequest) {
  const fileToServe = path.posix.join(folderPath, req.url)
  const extName = path.posix.extname(fileToServe)
  const headerType = contentType(extName) || ''

  try {
    const [file, fileStat] = await Promise.all([Deno.open(fileToServe), Deno.stat(fileToServe)])

    const headers = new Headers()
    headers.set('content-type', headerType)
    headers.set('content-length', fileStat.len.toString())

    const response = {
      status: 200,
      headers,
      body: file
    }

    req.respond(response)
  } catch (e) {
    console.log(e)
    console.log(fileToServe)
    const response = {
      status: 404
    }

    req.respond(response)
  }
}
