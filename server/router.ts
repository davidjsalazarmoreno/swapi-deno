import { Router } from "./deps.ts";
import filmsController from "./controllers/films.controller.ts";
import peopleController from "./controllers/people.controller.ts";
import planetsController from "./controllers/planets.controller.ts";
import rootController from "./controllers/root.controller.ts";
import speciesController from "./controllers/species.controller.ts";
import starshipsController from "./controllers/starships.controller.ts";
import vehiclesController from "./controllers/vehicles.controller.ts";

export const router = new Router();

router.get("/api", rootController.all);
router.get("/api/films", filmsController.all);
router.get("/api/films/:id", filmsController.byId);
router.get("/api/people", peopleController.all);
router.get("/api/people/:id", peopleController.byId);
router.get("/api/planets", planetsController.all);
router.get("/api/planets/:id", planetsController.byId);
router.get("/api/species", speciesController.all);
router.get("/api/species/:id", speciesController.byId);
router.get("/api/starships", starshipsController.all);
router.get("/api/starships/:id", starshipsController.byId);
router.get("/api/vehicles", vehiclesController.all);
router.get("/api/vehicles/:id", vehiclesController.byId);
