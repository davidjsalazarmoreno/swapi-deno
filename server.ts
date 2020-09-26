import { Application, path, send } from "./deps.ts";
import { router } from "./router.ts";

const app = new Application();

app.addEventListener("listen", (args) => {
  const { hostname, port, secure } = args;

  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ??
      "localhost"}:${port}`,
  );
});

app.addEventListener("error", (event) => {
  console.log(event.error);
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx) => {
  const root = path.join(Deno.cwd(), "/client/public/");
  await send(ctx, ctx.request.url.pathname, {
    root,
    index: "index.html",
  });
});

await app.listen({ port: 8000 });
