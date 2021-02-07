import { RouterContext } from "../deps.ts";
import { Vehicles } from "../models/vehicle.ts";

const model = new Vehicles();

export class VehiclesController {
  async all(ctx: RouterContext) {
    const vehicles = await model.getAll();
    if (vehicles.length) {
      ctx.response.body = vehicles;
    } else {
      ctx.response.body = "No vehicles found";
    }
  }

  async byId(ctx: RouterContext) {
    if (!ctx.params.id) {
      return;
    }

    const id = parseInt(ctx.params.id);
    if (Number.isNaN(id) || id <= 0) {
      ctx.response.body = "Invalid ID for vehicles";
      return;
    }

    const vehicles = await model.getById(id);

    if (Object.keys(vehicles).length) {
      ctx.response.body = vehicles;
    } else {
      ctx.response.body = "Vehicle not found";
    }
  }
}

export default new VehiclesController();
