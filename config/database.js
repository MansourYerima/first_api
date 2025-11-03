import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from "node:fs/promises";
import { dirname, join } from 'node:path';

export class Database {

    connection;
    static instance;
    static url = new URL(import.meta.url);
    static parent_directory = dirname(this.url.pathname);
    static base_directory = join(this.parent_directory, '..');
    static db_path = join(this.base_directory, "src/database.db");
    //static db_path = "/home/mansour/S5/Cours/Nodes/projects/first_api/src/database.db";
    static ddlPath = join(this.base_directory, "config/ddl.sql");
    static dmlPath = join(this.base_directory, "config/dml.sql");

    constructor(){}

    static async getDatatbaseInstance(){
        if (Database.instance === undefined) {
            Database.instance = new Database();
            await Database.instance.openDb(Database.db_path);
        }
        //console.log(Database.base_directory);
        
        return Database.instance;
    }

    async openDb (db_path) {
    this.connection = await open({
        filename: db_path,
        driver: sqlite3.Database
    });
    await this.initDb()
    }

    async initDb (){
        try {
            const ddlRequete = await fs.readFile(Database.ddlPath, "utf8");
            const dmlRequete = await fs.readFile(Database.dmlPath, "utf8");

            //await db.exec(ddlRequete);
            await this.connection.exec(ddlRequete);
            console.log("✅ Tables créées");        

            //await db.exec(dmlRequete);
            await this.connection.exec(dmlRequete);
            console.log("✅ Données insérées");
            
        } catch (err) {
            console.error("Erreur d'initialisation :", err);
        }
    }
}