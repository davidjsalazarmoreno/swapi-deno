import { RouterContext } from "../deps.ts";
import { People, Person } from "../models/people.ts";

const model = new People();

export class PeopleController {
  async all(ctx: RouterContext) {
    const people = await model.getAll();
    if (people.length) {
      ctx.response.body = people;
    } else {
      ctx.response.body = "No people found";
    }
  }

  async byId(ctx: RouterContext) {
    if (!ctx.params.id) {
      return;
    }

    const id = parseInt(ctx.params.id);
    if (Number.isNaN(id) || id <= 0) {
      ctx.response.body = "Invalid ID for person";
      return;
    }

    const person = await model.getById(id);

    if (Object.keys(person).length) {
      ctx.response.body = person;
    } else {
      ctx.response.body = "Person not found";
    }
  }
}

export default new PeopleController();
