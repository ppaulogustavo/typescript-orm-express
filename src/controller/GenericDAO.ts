import { getRepository, getConnection, Repository} from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Departamento } from "../entity/Departamento";
import { Usuario } from "../entity/Usuario";

export class GenericDAO <T> {

    repository = getRepository(this.clazz);

    constructor(private clazz: new () => T) {
        this.clazz = clazz;
    }
    
    async getById(id: number) {
        return await this.repository.createQueryBuilder('e')
            .where("e.id = :id", {id: id})
            .getOne();
    };
    
    async getAll() {
        return await this.repository.find();
    }

    async insert(dto) {
        return await this.repository.save(dto);
    }

    async update(id:number, dto) {
         await this.repository.createQueryBuilder()
            .update(this.clazz)
            .set(dto)
            .where("id = :id", {id: id})
            .execute();
        
        return this.getById(id);
    }

    async remove(id) {
        return await this.repository.createQueryBuilder()
            .delete()
            .from(this.clazz)
            .where("id = :id", {id: id})
            .execute();
    }

}