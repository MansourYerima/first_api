export default class Repository {
  constructor() {
    if (new.target == Repository) {
      throw new Error("No instance of this classe");
    } else {
    }
  }

  save(object) {
    throw new Error("");
  }

  delete(id) {}

  find(id) {}
  findAll() {}
}
