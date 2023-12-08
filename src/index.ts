import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { moduleControllers } from './configurations/module.controller';
import listEndpoints from 'express-list-endpoints';

const fileEnviroment = path.join(__dirname, "../config/.env");
dotenv.config({
    path: fileEnviroment
});

class Server{

    private static application: Express | any = express();
    private static readonly port = process.env.PORT;

    public static start(): void {
        Server.commonsServer();
        moduleControllers.forEach( controller => {
            Server.application[controller.method]( controller.path , (_req: Request , _res: Response) => {
                let data = {};
                if (controller.method == 'post' || controller.method == 'put') {
                    data = _req.body;
                }
                if (controller.method=='get') {
                    data = _req.query;
                }
                controller.use(data).then( response => {
                    _res.status(200).json(response).send();
                }).catch( _error => {
                    console.error(_error);
                    _res.status(500).send({ description: `${_error}`});
                });
            });
        });
        Server.listen();
    }

    private static commonsServer(): void {
        Server.application.use(express.json());
        Server.application.use(express.urlencoded({ extended: true }));
    }

    private static listen(): void {
        Server.application.listen( Server.port , () => {
            let paths = '';
            listEndpoints(Server.application).forEach( list => {
                paths += `⚡️[path]: ${list.methods} - '${list.path}' - M : | ${list.middlewares.join(' | ')} |\n`; 
            });
            console.log(`${paths}`);
            console.log(`⚡️[server]: Server is running at http://localhost:${Server.port}`);
        });
    }
}

Server.start();