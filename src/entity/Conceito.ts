import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import { Objetivo } from "./Objetivo";

@Entity()
export class Conceito {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    missao: string;

    @Column()
    visao: string;
    
    @Column()
    valores: string;

    @OneToMany(type => Objetivo, objetivo => objetivo.conceito, {
        eager: true
    })
    @JoinTable()
    objetivos: Objetivo[];

}