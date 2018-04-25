import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Departamento} from "../entity/Departamento";

export class DepartamentoController {

    private departamentoRepository = getRepository(Departamento);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.departamentoRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.departamentoRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.departamentoRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        await this.departamentoRepository.remove(request.params.id);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.departamentoRepository.createQueryBuilder()
            .update(Departamento)
            .set(request.body)
            .where("id = :id", {id: request.params.id})
            .execute();

    }

}