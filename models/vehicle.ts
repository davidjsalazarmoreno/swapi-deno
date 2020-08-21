import { Model, DataTypes } from "../deps.ts";

export class Vehicle extends Model {
  static table = "vehicles";

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    cargo_capacity: DataTypes.STRING,
    consumables: DataTypes.STRING,
    cost_in_credits: DataTypes.STRING,
    created:DataTypes.STRING,
    crew: DataTypes.STRING,
    edited: DataTypes.STRING,
    length: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    max_atmosphering_speed: DataTypes.STRING,
    model: DataTypes.STRING,
    name: DataTypes.STRING,
    passengers: DataTypes.STRING,
    url: DataTypes.STRING,
    vehicle_class: DataTypes.STRING
  };
}
