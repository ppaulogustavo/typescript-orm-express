import { ITokenSession } from './ITokenSession';
import { Usuario } from "../entity/Usuario";

export class ValidacaoAuth {

    errorsValidacaoAuth?: string;
    errorsValidacaoUsuario?: string;
    tokenSession?: ITokenSession;
    usuario: Usuario;

    static getErro(ValidacaoAuth: ValidacaoAuth) : string {
        if(ValidacaoAuth.errorsValidacaoAuth) {
            return ValidacaoAuth.errorsValidacaoAuth;
        }

        if(ValidacaoAuth.errorsValidacaoUsuario) {
            return ValidacaoAuth.errorsValidacaoUsuario;
        }

        return null;
    }
}