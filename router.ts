import peopleController from "./controllers/people.controller.ts";
import { Router } from "./deps.ts";

export const router = new Router();

router.get("/", () => {
  console.log("Hi");
});

router.get("/api/people", peopleController.all);
