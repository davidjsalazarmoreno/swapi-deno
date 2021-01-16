import { Router } from "./deps.ts";
import filmsController from "./controllers/films.controller.ts";
import peopleController from "./controllers/people.controller.ts";
import planetsController from "./controllers/planets.controller.ts";
import starshipsController from "./controllers/starships.controller.ts";

export const router = new Router();

router.get("/api/films", filmsController.all);
router.get("/api/films/:id", filmsController.byId);
router.get("/api/people", peopleController.all);
router.get("/api/people/:id", peopleController.byId);
router.get("/api/planets", planetsController.all);
router.get("/api/planets/:id", planetsController.byId);
router.get("/api/starships", starshipsController.all);
router.get("/api/starships/:id", starshipsController.byId);
