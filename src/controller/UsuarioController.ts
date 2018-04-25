import { ICaminhoRelativo } from './../express/interfaces/ICaminhoRelativo';
import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Path } from "../express/decorators/Path";
import { HttpMethod } from "../express/HttpMethod";
import { Usuario } from '../entity/Usuario';
import { UsuarioBusiness } from '../business/UsuarioBusiness';

export class UsuarioController implements ICaminhoRelativo {

    private usuarioBusiness = new UsuarioBusiness();

    constructor(){
    }

    getCaminhoRelativo() : string {
        return "/usuario";
    }
    
    @Path(HttpMethod.GET)
    async listarTodos(request: Request, response: Response, next: NextFunction) {
        const usuarios = await this.usuarioBusiness.listarTodos();
        response.send(usuarios);
    }

    @Path(HttpMethod.GET, "/:id")
    async getById(request: Request, response: Response, next: NextFunction) {
        response.send(await this.usuarioBusiness.getById(request.params.id));
    }

    @Path(HttpMethod.POST)
    async save(request: Request, response: Response, next: NextFunction) {
        console.log(request.route);
        await this.usuarioBusiness.save(request.body);
        response.send("cadastrado");
    }

    @Path(HttpMethod.PUT, "/:id")
    async update(request: Request, response: Response, next: NextFunction) {
        await this.usuarioBusiness.update(request.params.id, request.body);
        response.send("editado");
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.usuarioBusiness.remove(request.params.id);
        response.send("removido com sucesso");
    }

}
