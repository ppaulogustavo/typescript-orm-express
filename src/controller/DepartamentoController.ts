import { ICaminhoRelativo } from './../express/interfaces/ICaminhoRelativo';
import {getRepository, getConnection} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Path } from "../express/decorators/Path";
import { HttpMethod } from "../express/HttpMethod";
import { Departamento } from '../entity/Departamento';
import { DepartamentoBusiness } from '../business/DepartamentoBusiness';

export class DepartamentoController {

    private departamentoBusiness = new DepartamentoBusiness();

    constructor(){
    }

    getCaminhoRelativo() : string {
        return "/departamento";
    }
    
    @Path(HttpMethod.GET)
    async listarTodos(request: Request, response: Response, next: NextFunction) {
        const departamentos = await this.departamentoBusiness.listarTodos();
        response.send(departamentos);
    }

    @Path(HttpMethod.GET, "/:id")
    async getById(request: Request, response: Response, next: NextFunction) {
        response.send(await this.departamentoBusiness.getById(request.params.id));
    }

    @Path(HttpMethod.POST)
    async save(request: Request, response: Response, next: NextFunction) {
        await this.departamentoBusiness.save(request.body);
        response.send("cadastrado");
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.departamentoBusiness.remove(request.params.id);
        response.send("removido com sucesso");
    }

}