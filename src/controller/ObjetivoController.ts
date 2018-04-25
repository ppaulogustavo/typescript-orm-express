import { ICaminhoRelativo } from './../express/interfaces/ICaminhoRelativo';
import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Path } from "../express/decorators/Path";
import { HttpMethod } from "../express/HttpMethod";
import { ObjetivoBusiness } from '../business/ObjetivoBusiness';

export class ObjetivoController implements ICaminhoRelativo {

    private objetivoBusiness = new ObjetivoBusiness();
    
    getCaminhoRelativo() : string {
        return "/objetivo";
    }
    
    @Path(HttpMethod.GET)
    async listarTodos(request: Request, response: Response, next: NextFunction) {
        const objetivos = await this.objetivoBusiness.listarTodos();
        response.send(objetivos);
    }

    @Path(HttpMethod.GET, "/:id")
    async getById(request: Request, response: Response, next: NextFunction) {
        response.send(await this.objetivoBusiness.getById(request.params.id));
    }

    @Path(HttpMethod.POST)
    async save(request: Request, response: Response, next: NextFunction) {
        await this.objetivoBusiness.save(request.body);
        response.send("cadastrado");
    }

    @Path(HttpMethod.PUT, "/:id")
    async update(request: Request, response: Response, next: NextFunction) {
        await this.objetivoBusiness.update(request.params.id, request.body);
        response.send("editado");
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.objetivoBusiness.remove(request.params.id);
        response.send("removido com sucesso");
    }

}
