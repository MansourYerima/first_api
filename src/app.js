import http from "node:http";
import StudentController from "./controllers/studentController.js";
import dotenv from 'dotenv';
import { HTTP_STATUS_CODE } from "./constants/httpStatus.js";
import { Database } from "../config/database.js";

dotenv.config();

/**
 * GET /students
 * GET /student/:id
 * POST /students
 * PUT | PATCH /student/:id
 * DELETE /student/:id
 */


const db = await Database.getDatatbaseInstance();

const studentController = new StudentController();

const server = http.createServer((req, res) => {
    const method = req.method;
    const url = new URL(req.url, `http://${req.headers.host}`);
    // console.log(url);
    // console.log(req.headers);
    
    
    const endpoint = method+":"+url.pathname;
    res.setHeader('Content-Type', 'application/json');
    
    switch (endpoint) {
        case 'GET:/students':
            studentController.read(req, res);            
            break; 
        case 'GET:/student':
            studentController.find(req, res);
            break; 
        case 'POST:/students':
            studentController.create(req, res);
            break; 
        case 'PUT:/student':
            studentController.update(req, res);
            break; 
        case 'DELETE:/student':
            studentController.delete(req, res);
            break;    
        default:
            res.writeHead(HTTP_STATUS_CODE.NOT_FOUND);
            res.end(JSON.stringify({
                "message":"Page not found !"
            }));
            break;
    }
});

server.listen(process.env.PORT || 3000, () => {
    console.log("Server Start...(>_<)");    
})