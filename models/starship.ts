import { Model, DataTypes } from "../deps.ts";

export class Starship extends Model {
  static table = "starship";

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    MGLT: DataTypes.STRING,
    cargo_capacity: DataTypes.STRING,
    consumables: DataTypes.STRING,
    cost_in_credits: DataTypes.STRING,
    created: DataTypes.STRING,
    crew: DataTypes.STRING,
    edited: DataTypes.STRING,
    hyperdrive_rating: DataTypes.STRING,
    length: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    max_atmosphering_speed: DataTypes.STRING,
    model: DataTypes.STRING,
    name: DataTypes.STRING,
    passengers: DataTypes.STRING,
    starship_class: DataTypes.STRING,
    url: DataTypes.STRING
  };
}
