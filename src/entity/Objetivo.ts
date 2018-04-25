import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, ManyToOne} from "typeorm";
import { Conceito } from "./Conceito";

@Entity()
export class Objetivo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(type => Conceito, conceito => conceito.objetivos)
    conceito: Conceito;

}