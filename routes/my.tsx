import { asksCollection, IAsk } from "../db/db.ts";
import { Handlers, MiddlewareHandlerContext, PageProps } from "$fresh/server.ts";
import NewAsk from "../islands/NewAsk.tsx";
import { ContextData } from "../types.ts";
import Header from "../components/Header.tsx";

type State = {
  username: string;
  asks: IAsk[];
}
export const handler: Handlers<State, ContextData> = {
  async GET(_req, ctx) {
    const username = ctx.state.username
    const asks = await (await asksCollection()).findMany({ username }).retrieveData();
    return ctx.render({ username, asks });
  },
};

export default function Page(props: PageProps<State>) {
  return (
    <>
      <Header>{props.data.username} のマイページ</Header>
      <main>
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div class='container bg-green-100 rounded-3xl'>
            <h1></h1>
            <h2>募集</h2>
            <ul>
              {props.data.asks.map((ask) =>
                <li class='container bg-green-50'>
                  <p><a href={`/my/asks/${ask.id}`}>{ask.q}</a></p>
                </li>
              )}
            </ul>
            <NewAsk />
          </div>
        </div>
      </main>
    </>
  );
}
