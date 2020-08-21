import { Router } from "./deps.ts";

export const router = new Router();

router.get("/", () => {
  console.log("Hi");
});