export const tableNames: { [key: string]: string } = {
  film: "films",
  people: "people",
  planet: "planets",
  species: "species",
  starship: "starships",
  transport: "transports",
  vehicle: "vehicles",
};

export const relationsMapping: { [key: string]: string[] } = {
  species: ["people"],
  starship: ["pilots"],
  film: ["starships", "vehicles", "planets", "characters", "species"],
  vehicle: ["pilots"],
};
