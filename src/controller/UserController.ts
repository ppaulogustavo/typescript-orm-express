import { ICaminhoRelativo } from './../express/interfaces/ICaminhoRelativo';
import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { Path } from "../express/decorators/Path";
import { HttpMethod } from "../express/HttpMethod";

export class UserController implements ICaminhoRelativo {

    private userRepository = getRepository(User);

    constructor(){
    }

    getCaminhoRelativo() : string {
        return "/usuario";
    }
    
    @Path(HttpMethod.GET)
    async all(request: Request, response: Response, next: NextFunction) {
        const users = await this.userRepository.find();
        response.send(users);
    }

    @Path(HttpMethod.GET, "/:id")
    async one(request: Request, response: Response, next: NextFunction) {
        response.send(await this.userRepository.findOne(request.params.id));
    }

    @Path(HttpMethod.POST)
    async save(request: Request, response: Response, next: NextFunction) {
        await this.userRepository.save(request.body);
        response.send("cadastrado");
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.userRepository.remove(request.params.id);
        response.send("removido com sucesso");
    }

}
