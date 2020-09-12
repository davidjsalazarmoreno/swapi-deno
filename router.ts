import { Router, RouterContext } from "./deps.ts";
import { People } from "./models/people.ts";

export const router = new Router();

router.get("/", () => {
  console.log("Hi");
});

router.get("/api/people", async (ctx: RouterContext) => {
  const people = [...await new People().getAll().asObjects()];
  ctx.response.body = people;
});
