import { HandlerContext, Handlers } from "$fresh/server.ts";
import { asksCollection } from "../../db/db.ts";
import { ContextData, Origin } from "../../types.ts";

export function createGift(senderName: string) {

  const body = JSON.stringify({
    amount: 5000,
    notify: `${Origin}/api/callback`, // optional
    senderName,
    senderMessage: 'Mashroom' // optional
  })
  return fetch('https://api.lightning.gifts/create', {
    method: 'post',
    body
  })
}
export const handler: Handlers<never, ContextData> = {
  async POST(req, ctx): Promise<Response> {
    const {q, satoshi} = await req.json()
    const username = ctx.state.username
    const asks = await asksCollection()
    const ret = await asks.insertOne({ username, q, satoshi: parseInt(satoshi), created: new Date() });

    return new Response(JSON.stringify(ret));
  }
}
