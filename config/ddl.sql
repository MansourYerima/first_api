DROP TABLE IF EXISTS students;

CREATE TABLE IF NOT EXISTS students(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    firstname TEXT NOT NULL, 
    lastname TEXT NOT NULL, 
    sexe TEXT, 
    birth_day DATE, 
    check(sexe in ("M","F"))
);