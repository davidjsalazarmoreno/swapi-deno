import peopleController from "./controllers/people.controller.ts";
import filmsController from "./controllers/films.controller.ts";
import { Router } from "./deps.ts";

export const router = new Router();

router.get("/api/people", peopleController.all);
router.get("/api/people/:id", peopleController.byId);
router.get("/api/films", filmsController.all);
router.get("/api/films/:id", filmsController.byId);
