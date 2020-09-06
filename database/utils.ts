import { escapeHtml } from "../utils/escape-html.ts";
import { tableNames } from "./constants.ts";
import { Fixtures } from "./fixtures/fixtures.ts";
import { Mapping } from "./db.ts";
import { titleCase } from "../deps.ts";

export function getTableName(model: string) {
  return model.split("resources.").join("");
}

export function prepareFields(entries: any) {
  const keyToIgnore = [
    "pilots",
    "characters",
    ...Object.values(tableNames),
  ];
  return Object.fromEntries(entries.filter((entry: string) => {
    return !keyToIgnore.includes(entry[0]);
  }));
}

export function prepareValues(values: any[]) {
  return values.map((value) => {
    if (!value) {
      return "null";
    }

    if (typeof value === "string") {
      return `'${escapeHtml(value)}'`;
    } else {
      return value;
    }
  });
}

export function onlyRelations(mapping: Mapping) {
  return (fixture: Fixtures) => {
    const { model } = fixture;
    const relationName = mapping[getTableName(model)];
    const relations = Object.keys(fixture.fields).filter((relation) =>
      relationName && relationName.includes(relation)
    );

    return Array.isArray(relations) && relations.length;
  };
}

export function prepareRelationValues(mapping: Mapping) {
  return (fixture: Fixtures) => {
    const { model } = fixture;
    const tableName = getTableName(model);
    const relationName = mapping[tableName];
    const { pk, fields } = fixture;
    const values = relationName.map((relation) => {
      const relationTable = tableName + titleCase(relation);
      return [
        relationTable,
        pk,
        ...fields[relation] as any,
      ];
    });

    return values;
  };
}
