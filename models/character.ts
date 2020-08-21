import { Model, DataTypes } from "../deps.ts";

export class Character extends Model {
    static table = "characters";
    static timestamps = true;

    static fields = {
        id: {
            primaryKey: true,
            autoIncrement: true,
        },
        birth_year: DataTypes.STRING,
        eye_color: DataTypes.STRING,
        gender: DataTypes.STRING,
        hair_color: DataTypes.STRING,
        height: DataTypes.STRING,
        homeworld: DataTypes.STRING,
        mass: DataTypes.STRING,
        name: DataTypes.STRING,
        skin_color: DataTypes.STRING,
        url: DataTypes.STRING,
    }

}
