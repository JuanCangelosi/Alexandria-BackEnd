import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import { BookEntity } from "../entity/BookEntity";
import { BookDbManager } from "../entityDbManagement/BookDbManager";
import { inject } from "inversify";
import { controller, httpGet, interfaces, httpPost, request, response } from "inversify-express-utils";
import { UserEntity } from "../entity/UserEntity";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { UserDbManager } from "../entityDbManagement/UserDbManager";

@controller("/login")
export class LoginController implements interfaces.Controller {
    @inject("UserDbManager") private userDbManager: UserDbManager;

    @httpPost("/")
    private async login( @request() req: Request, @response() res: Response) {
        try {
            // await this.loginService.authenticate(req.body);
            const userReq: UserEntity = new UserEntity();
            userReq.ParseDTO(req.body);
            console.log(userReq);
            const dbUser = await this.userDbManager.getByUsername(userReq.username);
            if (dbUser) {
                if (bcrypt.compareSync(userReq.password, dbUser.password)) {
                    console.log("token para vos");
                    const payload = { user: dbUser };
                    const token = jwt.sign(payload, "test");
                    res.json({
                        success: true,
                        message: "Enjoy your token!",
                        token: token
                    });
                } else {
                    res.status(400).json({ error: "No coinciden las contraseñas" });
                }
            } else {
                res.status(400).json({ error: "Usuario no existe" });
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: err.message });
        }
    }

    @httpPost("/socialAuth")
    private async socialAuth( @request() req: Request, @response() res: Response) {
        try {
            // await this.loginService.authenticate(req.body);
            const userReq: UserEntity = req.body;
            console.log(userReq);
            res.sendStatus(201);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    @httpGet("/authRoute", "AuthenticationMiddleware")
    private async testAuth( @request() req: Request, @response() res: Response) {
        try {
            // await this.loginService.authenticate(req.body);
            const userReq: UserEntity = req.body;
            console.log(userReq);
            res.sendStatus(201);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }


}