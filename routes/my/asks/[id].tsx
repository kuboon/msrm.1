import { asksCollection, IAsk } from "../../../db/db.ts";

import { Handlers, PageProps } from "$fresh/server.ts";
import { Button } from "../../../components/Button.tsx";

export const handler: Handlers<IAsk> = {
  async GET(_req, ctx) {
    const asks = await asksCollection();
    const ask = asks.findOne({ id: ctx.params.id });
    if (!ask) {
      return new Response("Project not found", { status: 404 });
    }
    return ctx.render(ask);
  },
};

export default function Page(props: PageProps<IAsk>) {
  return (
    <div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">{props.data.q}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">{props.data.created} {props.data.satoshi} sat</p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt class="text-sm font-medium text-gray-500">kuboon</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">3分前</dd>
          </div>
        </dl>
      </div>
      <Button onClick={() => alert("TODO: この質問に回答する")}>回答する</Button>
    </div>

  );
}
