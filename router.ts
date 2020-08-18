import { Router } from "./deps.ts";

const router = new Router();

router.get("/", () => {
  console.log("Hi");
});

export default router;