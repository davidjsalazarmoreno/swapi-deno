import {
  Application,
} from "./deps.ts";
import { router } from "./router.ts";
import {
  createTables,
  populateTables,
  createRelationsTables,
} from "./database/db.ts";

await createTables();
await createRelationsTables();
await populateTables();
console.log("A fresh database was created and populated.\n");

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

await app.listen({ port: 8000 });
