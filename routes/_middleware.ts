// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { ContextData } from "../types.ts";
import { handler as webauthn } from "../webauthn-skeleton/app.ts"

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<ContextData>,
) {
  const res = await webauthn(req, ctx);
  if (res.status !== 404) return res
  ctx.state.username = 'aaa' //await req.session.get("username");
  if(!ctx.state.username){
    const url = new URL(req.url);
    if(url.pathname.startsWith("/my")){
      return new Response(`<head>
      <meta http-equiv="Refresh" content="0; URL=/">
    </head>`, { status: 401, headers: { "Content-Type": "text/html" } });
    }
  }
  const resp = await ctx.next();
  return resp;
}
