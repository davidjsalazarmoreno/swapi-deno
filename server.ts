import { Application, Database } from "./deps.ts";
import { Character } from "./models/character.ts";
import { Film } from "./models/film.ts";
import { Planet } from "./models/planet.ts";
import { Specie } from "./models/specie.ts";
import { Starship } from "./models/starship.ts";
import { Vehicle } from "./models/vehicle.ts";
import { router } from "./router.ts";

const db = new Database("sqlite3", {
  filepath: "./database.sqlite",
});

db.link([Character, Film, Planet, Specie, Starship, Vehicle]);

Character.hasMany(Film);
Character.hasMany(Specie);
Character.hasMany(Starship);
Character.hasMany(Vehicle);

Film.hasMany(Character);
Film.hasMany(Planet);
Film.hasMany(Starship);
Film.hasMany(Vehicle);

Starship.hasMany(Film);
Starship.hasMany(Character);

Vehicle.hasMany(Film);
Vehicle.hasMany(Character);

Specie.hasMany(Film);
Specie.hasMany(Character);

Planet.hasMany(Film);
Planet.hasMany(Character);

await db.sync({ drop: true });

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
