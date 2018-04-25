import { ICaminhoRelativo } from './../express/interfaces/ICaminhoRelativo';
import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Departamento} from "../entity/Departamento";
import { Path } from "../express/decorators/Path";
import { HttpMethod } from "../express/HttpMethod";

export class DepartamentoController implements ICaminhoRelativo {

    private departamentoRepository = getRepository(Departamento);

    getCaminhoRelativo() : string {
        return "/departamento"
    }

    @Path(HttpMethod.GET)
    async all(request: Request, response: Response, next: NextFunction) {
        const departamentos = await this.departamentoRepository.find();
        return response.send(departamentos);
    }

    @Path(HttpMethod.GET, "/:id")
    async one(request: Request, response: Response, next: NextFunction) {
        response.send(await this.departamentoRepository.findOne(request.params.id));
    }

    @Path(HttpMethod.POST)
    async save(request: Request, response: Response, next: NextFunction) {
        await this.departamentoRepository.save(request.body);
        response.send("Deparatamento cadastrado");
    }

    @Path(HttpMethod.DELETE, "/:id")
    async remove(request: Request, response: Response, next: NextFunction) {
        await this.departamentoRepository.remove(request.params.id);
    }

    @Path(HttpMethod.PUT, "/:id")
    async update(request: Request, response: Response, next: NextFunction) {
        await this.departamentoRepository.createQueryBuilder()
            .update(Departamento)
            .set(request.body)
            .where("id = :id", {id: request.params.id})
            .execute();
        response.send("Atualizado");

    }

}