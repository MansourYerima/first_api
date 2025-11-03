import { json } from "node:stream/consumers";
import StudentService from "../services/studentService.js";

export default class StudentController {

    studentService;

    constructor(){
        this.studentService = new StudentService;
    }

    async create(req, res){
        const {firstname, lastname, sexe, birth_day} = await json(req);
        const student = {
            'firstname' : firstname !== undefined ? firstname : "",
            'lastname' : lastname !== undefined ? lastname : "",
            'sexe' : sexe !== undefined ? sexe : "Masculin",
            'birth_day' : birth_day !== undefined ? birth_day : "",
        }
        const new_student = this.studentService.create(student);

        res.writeHead(200);
        res.end(JSON.stringify(new_student));
    }

    async read(req, res){
        res.writeHead(200);
        res.end(JSON.stringify(await this.studentService.getAll()));
        //res.end(this.students);
    }

    async update(req, res){
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = parseInt(url.searchParams.get("id"));  
        const {firstname, lastname, sexe, birth_day} = await json(req);
        const student = {
            'firstname' : firstname !== undefined ? firstname : "",
            'lastname' : lastname !== undefined ? lastname : "",
            'sexe' : sexe !== undefined ? sexe : "Masculin",
            'birth_day' : birth_day !== undefined ? birth_day : "",
        }

        const updated_student = await this.studentService.update(id, student)

        if (updated_student) {
            res.writeHead(200);
            res.end(JSON.stringify(updated_student));
            return;
        }
        res.writeHead(404);
        res.end(JSON.stringify({
            "message":"Ressource not found"
        }));
    }

    async delete(req, res){
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = parseInt(url.searchParams.get("id"));  

        await this.studentService.delete(id);
        res.writeHead(200);
        res.end("Student succesfully deleted...");
    }

    async find(req, res){
        const url = new URL(req.url, `http://${req.headers.host}`);
        const id = Number.parseInt(url.searchParams.get("id"));  
        const student = await this.studentService.find(id)

        if (student===undefined) {
            res.writeHead(404);
            res.end(JSON.stringify({
                "message":"Ressource note found"
            }));
        } else {
            res.writeHead(200);
            res.end(JSON.stringify(student));
        }  
        
    }
}

