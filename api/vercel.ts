#!/usr/bin/env deno run --unstable

import { ServerContext } from "$fresh/src/server/context.ts";
import manifest from "../fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "../twind.config.ts";

const ctx = await ServerContext.fromManifest(manifest, { plugins: [twindPlugin(twindConfig)] });
const handler = ctx.handler()

export default (req: Request, connInfo: unknown) => {
  return handler(req, connInfo as any)
};
