import { UsuarioController } from "./controller/UsuarioController";
import { DepartamentoController } from "./controller/DepartamentoController";

const DepartamentoRoutes = [{
    method: "get",
    route: "/departamento",
    controller: DepartamentoController,
    action: "all"
},
{
    method: "get",
    route: "/departamento/:id",
    controller: DepartamentoController,
    action: "one"
},
{
    method: "post",
    route: "/departamento",
    controller: DepartamentoController,
    action: "save"
},
{
    method: "post",
    route: "/departamento/:id",
    controller: DepartamentoController,
    action: "update"
},
{
    method: "delete",
    route: "/departamento",
    controller: DepartamentoController,
    action: "remove"
}];

const UsuarioRoutes = [{
    method: "get",
    route: "/usuario",
    controller: UsuarioController,
    action: "teste"
},
{
    method: "get",
    route: "/usuario/:id",
    controller: UsuarioController,
    action: "one"
},
{
    method: "post",
    route: "/usuario",
    controller: UsuarioController,
    action: "save"
},
{
    method: "post",
    route: "/usuario/:id",
    controller: UsuarioController,
    action: "update"
},
{
    method: "delete",
    route: "/usuario/:id",
    controller: UsuarioController,
    action: "remove"
}];

export const Routes = [... UsuarioRoutes, ... DepartamentoRoutes];