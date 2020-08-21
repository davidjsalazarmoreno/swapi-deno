import { Model, DataTypes } from "../deps.ts";

export class Planet extends Model {
  static table = "planets";

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    climate: DataTypes.STRING,
    diameter: DataTypes.STRING,
    gravity: DataTypes.STRING,
    name: DataTypes.STRING,
    orbital_period: DataTypes.STRING,
    population: DataTypes.STRING,
    rotation_period: DataTypes.STRING,
    surface_water: DataTypes.STRING,
    terrain: DataTypes.STRING,
    url: DataTypes.STRING,
  };
}
