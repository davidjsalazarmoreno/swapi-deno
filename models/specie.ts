import { Model, DataTypes } from "../deps.ts";

export class Specie extends Model {
  static table = "species";

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    average_height: DataTypes.STRING,
    average_lifespan: DataTypes.STRING,
    classification: DataTypes.STRING,
    designation: DataTypes.STRING,
    eye_colors: DataTypes.STRING,
    hair_colors: DataTypes.STRING,
    homeworld: DataTypes.STRING,
    language: DataTypes.STRING,
    name: DataTypes.STRING,
    skin_colors: DataTypes.STRING,
    url: DataTypes.STRING,
  };
}
