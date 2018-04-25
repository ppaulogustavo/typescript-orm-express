import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Departamento } from "./Departamento";

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    login: string;

    @ManyToOne(type => Departamento, departamento => departamento.usuarios)
    departamento: Departamento;


}