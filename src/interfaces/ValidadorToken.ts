import { Usuario } from './../entity/Usuario';
import { ValidacaoAuth } from './ValidacaoAuth';

export interface ValidadorToken {
    (erro: Error, usuario: Usuario, info: any) : ValidacaoAuth;    
}