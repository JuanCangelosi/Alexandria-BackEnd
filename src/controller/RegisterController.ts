import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import { inject } from "inversify";
import { controller, httpGet, interfaces, httpPost, request, response } from "inversify-express-utils";
import { UserEntity } from "../entity/UserEntity";
import { UserDbManager } from "../entityDbManagement/UserDbManager";
import * as bcrypt from "bcrypt";

@controller("/register")
export class RegisterController implements interfaces.Controller {
    @inject("UserDbManager") private userDbManager: UserDbManager;

    @httpPost("/")
    private async register( @request() req: Request, @response() res: Response) {
        try {
            // await this.loginService.authenticate(req.body);
            const userReq: UserEntity = new UserEntity();
            userReq.ParseDTO(req.body);
            userReq.password = bcrypt.hashSync(req.body.password, 10);
            console.log(userReq);
            const existingUsername = await this.userDbManager.getByUsername(userReq.username);
            const existingEmail = await this.userDbManager.getByEmail(userReq.email);
            if (!existingUsername) {
                if (!existingEmail) {
                    this.userDbManager.insert(userReq);
                    res.sendStatus(201);
                } else {
                    res.status(400).json({ error: "Email ya existe" });
                    // res.status(204).send("Ese usuario ya existe");
                }
            } else {
                res.status(400).json({ error: "Usuario ya existe" });
            }

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}