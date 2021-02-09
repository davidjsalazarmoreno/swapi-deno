import { db } from "../database/db.ts";
import BaseModel from "./base.model.ts";

export interface Vehicle {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[] | null;
  films: string[] | null;
  created: string;
  edited: string;
  url: string;
}

export class Vehicles extends BaseModel {
  static toViewModel(vehicle: Vehicle | any): Vehicle {
    if (vehicle) {
      vehicle.films = Vehicles.toArray(vehicle.films, "films");
      vehicle.pilots = Vehicles.toArray(vehicle.pilots, "pilots");
      vehicle.url = `/api/vehicles/${vehicle.url}`;

      return vehicle as Vehicle;
    } else {
      return {} as Vehicle;
    }
  }

  private getBaseQuery(id = -1) {
    const byId = `/* SQL */WHERE vh.id = ${id}`;

    return `/* SQL */
      SELECT DISTINCT
        tp.name,
        tp.model,
        tp.manufacturer,
        tp.cost_in_credits,
        tp.length,
        tp.max_atmosphering_speed,
        tp.crew,
        tp.passengers,
        tp.cargo_capacity,
        tp.consumables,
        vh.vehicle_class,
        tp.created,
        tp.edited,
        tp.id as url,
        GROUP_CONCAT(
          DISTINCT flvh.filmId
        ) films,
        GROUP_CONCAT(
          DISTINCT vhplt.characterId
        ) pilots
      FROM 
        vehicles vh
      LEFT JOIN
        transports tp
      ON
        tp.id = vh.id
      LEFT JOIN
        filmVehicles flvh
      ON
        flvh.vehicleId = vh.id
      LEFT JOIN
        vehiclePilots vhplt
      ON
        vhplt.vehicleId = vh.id
      ${id !== -1 ? byId : ""}
      GROUP BY
        vh.id
      ORDER BY
        vh.id
      ;
   `;
  }

  public getAll(): Vehicle[] {
    const { getBaseQuery } = this;

    const vehicles = [
      ...db.query(
        `/* SQL */
        ${getBaseQuery()}
        ;
      `,
      ).asObjects(),
    ];

    return vehicles.map(Vehicles.toViewModel);
  }

  public getById(id: number): Vehicle {
    const { getBaseQuery } = this;

    const vehicle = db.query(
      `/* SQL */
        ${getBaseQuery(id)}
        ;
      `,
    ).asObjects().next().value;

    return Vehicles.toViewModel(vehicle);
  }
}
