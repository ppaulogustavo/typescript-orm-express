import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Departamento } from "./Departamento";

@Entity()
export class Usuario {

    constructor(login ?: string, senha ?: string) {
        this.login = login;
        this.senha = senha;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    login: string;

    @Column()
    senha: string;

    @ManyToOne(type => Departamento, departamento => departamento.usuarios)
    departamento: Departamento;


}