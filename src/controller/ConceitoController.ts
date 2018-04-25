import { ICaminhoRelativo } from './../express/interfaces/ICaminhoRelativo';
import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Path } from "../express/decorators/Path";
import { HttpMethod } from "../express/HttpMethod";
import { ConceitoBusiness } from '../business/ConceitoBusiness';

export class ConceitoController implements ICaminhoRelativo {

    private conceitoBusiness = new ConceitoBusiness();

    getCaminhoRelativo() : string {
        return "/conceito";
    }
    
    @Path(HttpMethod.GET)
    async listarTodos(request: Request, response: Response, next: NextFunction) {
        const conceitos = await this.conceitoBusiness.listarTodos();
        response.send(conceitos);
    }

    @Path(HttpMethod.GET, "/:id")
    async getById(request: Request, response: Response, next: NextFunction) {
        response.send(await this.conceitoBusiness.getById(request.params.id));
    }

    @Path(HttpMethod.POST)
    async save(request: Request, response: Response, next: NextFunction) {
        await this.conceitoBusiness.save(request.body);
        response.send("cadastrado");
    }

    @Path(HttpMethod.PUT, "/:id")
    async update(request: Request, response: Response, next: NextFunction) {
        await this.conceitoBusiness.update(request.params.id, request.body);
        response.send("editado");
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.conceitoBusiness.remove(request.params.id);
        response.send("removido com sucesso");
    }

}
