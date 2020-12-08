export class BaseModel {
  static toArray(field: string | null, prefix: string) {
    if (field == null || typeof field !== "string") {
      return [];
    }

    if (field.length === 0) {
      return [];
    }

    return field.split(",").map((id) => {
      return `/api/${prefix}/${id.trim()}`;
    });
  }
}

export default BaseModel;
