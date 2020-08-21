import { Model, DataTypes } from "../deps.ts";

export class Film extends Model {
    static table = "films";
    static timestamps = true;

    static fields = {
        id: {
            primaryKey: true,
            autoIncrement: true,
        },
        director: DataTypes.STRING,
        episode_id: DataTypes.INTEGER,
        opening_craw: DataTypes.STRING,
        producer: DataTypes.STRING,
        release_date: DataTypes.DATE,
        title: DataTypes.STRING,
        url: DataTypes.STRING,
    }

}
