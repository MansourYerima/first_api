import Repository from "../repositories/Repository.js";
import Database from "../config/database.js";

export default class StudentsRepository extends Repository {
  constructor() {
    super();
  }

  async save(student) {
    if (parseInt(student.id) > 0) {
    } else {
      const db = await Database.getDatabaseInstance();

      const { firstname, lastname, sexe, birth_day } = student;
      const sql = `

                INSERT INTO students(firstname, lastname, sexe, birth_day)
                VALUES(:firstname, :lastname, :sexe, :birth_day);

            `;
      console.log(student);

      const { lastID } = await db.connection.run(sql, {
        ":firstname": firstname,
        ":lastname": lastname,
        ":sexe": sexe,
        ":birth_day": birth_day,
      });

      return lastID;
    }
  }

  async find(id) {
    const db = await Database.getDatabaseInstance();
    return await db.connection.get(
      "SELECT * FROM students WHERE id=:student_ id;",
      {
        ":student_ id": id,
      }
    );
  }

  async findAll() {
    const db = await Database.getDatabaseInstance();
    return await db.connection.all("SELECT * FROM students");
  }

  async delete(id) {
    const db = await Database.getDatabaseInstance();
    return await db.connection.get("DELETE students WHERE id=:student_ id;", {
      ":student_ id": id,
    });
  }
}
