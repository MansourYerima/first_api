import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

// you would have to import / invoke this in another file
export async function openDb () {
  return open({
    filename: '/home/mansour/S5/Cours/Nodes/projects/first_api/src/database.db',
    driver: sqlite3.Database
  })
}

const db = await openDb();

const tableCreate = `CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    firstname TEXT NOT NULL, 
    lastname TEXT NOT NULL, 
    sexe TEXT, 
    birth_day DATE, 
    check(sexe in ("M","F"))
    )`;

const insert = `INSERT INTO students (firstname, lastname, sexe, birth_day ) 
    VALUES ('Mansour', 'YERIMA', 'M', '2004-07-11'),
        ('Socrate', 'DADO', 'M', '1996-01-07'),
        ('Roi', 'AGAO', 'M', '2000-07-11'),
        ('Youssif', 'NAZEGA', 'M', '2003-07-12')`;

await db.exec(tableCreate);
await db.exec(insert);



console.log(db);
