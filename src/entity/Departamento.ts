import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import { Usuario } from "./Usuario";

@Entity()
export class Departamento {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @OneToMany(type => Usuario, usuario => usuario.departamento, {
        eager: true
    })
    
    @JoinTable()
    usuarios: Usuario[];

}