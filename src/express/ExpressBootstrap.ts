import { passport } from './../config/Passport';
import {expressConfigs} from "./ExpressManager"
import * as bodyParser from "body-parser"
import * as validator from "express-validator"
import { createConnection } from "typeorm";
import { authBusiness } from '../business/AuthBusiness';


class ExpressBoostrap {

    public boostrap() {
        createConnection().then(async connection => {
            expressConfigs
                .registrarRotas("../controller/index")
                .registrarMiddlewareAntesDaRota(validator())
                .registrarMiddlewareAntesDaRota(bodyParser.json())
                .registrarMiddlewareAntesDaRota(passport.initialize(authBusiness.constroiStrategy()))
                .commit()
                .startServer(3000, "localhost");
        });

    }
}

new ExpressBoostrap().boostrap();