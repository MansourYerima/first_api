import { Database } from "../../config/database.js";
import uuid from "../generateur.js";

export default class StudentService {
  students = [
    {
      id: 100,
      firstname: "Mansour",
      lastname: "YERIMA",
      sexe: "Masculin",
      birth_day: "11/07/2004",
    },
  ];

  uuidGen;

  constructor() {
    this.uuidGen = uuid(100);
  }

  async getAll() {
    const db = await Database.getDatatbaseInstance();
    const data = await db.connection.all("SELECT * FROM students");
    return data;
  }

  async create(student_data) {
    const db = await Database.getDatatbaseInstance();

    const result = await db.connection.run(
      `INSERT INTO students (firstname, lastname, sexe, birth_day)
         VALUES (:firstname, :lastname, :sexe, :birth_day)`,
      {
        ":firstname": student_data.firstname,
        ":lastname": student_data.lastname,
        ":sexe": student_data.sexe,
        ":birth_day": student_data.birth_day,
      }
    );

    // Récupérer le nouvel étudiant inséré
    return await db.connection.get(
      "SELECT * FROM students WHERE id = :student_id",
      { ":student_id": result.lastID }
    );
  }

  async find(id) {
    //return this.students.find((student) => student.id === id);
    const db = await Database.getDatatbaseInstance();
    return await db.connection.get(
      "SELECT * FROM students WHERE id = :student_id",
      {
        ":student_id": id,
      }
    );
  }

  async update(id, student_data) {
    const db = await Database.getDatatbaseInstance();

    await db.connection.run(
      `UPDATE students 
         SET firstname = :firstname,
             lastname = :lastname,
             sexe = :sexe,
             birth_day = :birth_day
         WHERE id = :student_id`,
      {
        ":firstname": student_data.firstname,
        ":lastname": student_data.lastname,
        ":sexe": student_data.sexe,
        ":birth_day": student_data.birth_day,
        ":student_id": id,
      }
    );

    return await db.connection.get(
      "SELECT * FROM students WHERE id = :student_id",
      { ":student_id": id }
    );
  }

  async delete(id) {
    const db = await Database.getDatatbaseInstance();

    await db.connection.run("DELETE FROM students WHERE id = :student_id", {
      ":student_id": id,
    });

    return { message: `Student with id ${id} deleted successfully` };
  }
}