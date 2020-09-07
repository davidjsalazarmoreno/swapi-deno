import { getTableName } from "./utils.ts";
import { assertEquals } from "../deps.ts";

Deno.test("should get the table name from model property", () => {
  assertEquals(getTableName("resources.people"), "people");
});
