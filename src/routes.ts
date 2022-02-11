import { Router } from "express";

const routes = Router()

import multer from "multer";
import { multerMiddleware } from "./middlewares/multer";

import { AdministradoresController } from "./controllers/AdministradoresController";
import { CategoriasController } from "./controllers/CategoriasController";
import { CidadesController } from "./controllers/CidadesController";
import { ClientesController } from "./controllers/ClientesController";
import { ComprasController } from "./controllers/ComprasController";
import { ComprasProdutosController } from "./controllers/ComprasProdutosController";
import { EnderecosController } from "./controllers/EnderecosController";
import { EstadosController } from "./controllers/EstadosController";
import { MarcasController } from "./controllers/MarcasController";
import { ProdutosController } from "./controllers/ProdutosController";

routes.get('/administradores', new AdministradoresController().index)
routes.post('/administradores', new AdministradoresController().store)
routes.put('/administradores/:id_administrador', new AdministradoresController().edit)
routes.delete('/administradores/:id_administrador', new AdministradoresController().destroy)

routes.get('/categorias', new CategoriasController().index)
routes.post('/categorias', new CategoriasController().store)
routes.put('/categorias/:id_categoria', new CategoriasController().edit)
routes.delete('/categorias/:id_categoria', new CategoriasController().destroy)

routes.get('/cidades', new CidadesController().index)
routes.post('/cidades', new CidadesController().store)
routes.put('/cidades/:id_cidade', new CidadesController().edit)
routes.delete('/cidades/:id_cidade', new CidadesController().destroy)

routes.get('/clientes', new ClientesController().index)
routes.post('/clientes', new ClientesController().store)
routes.put('/clientes/:id_cliente', new ClientesController().edit)
routes.delete('/clientes/:id_cliente', new ClientesController().destroy)

routes.get('/compras', new ComprasController().index)
routes.post('/compras', new ComprasController().store)
routes.put('/compras/:id_compra', new ComprasController().edit)
routes.delete('/compras/:id_compra', new ComprasController().destroy)

routes.get('/compras_produtos', new ComprasProdutosController().index)
routes.post('/compras_produtos', new ComprasProdutosController().store)
routes.put('/compras_produtos/:id_compras_produtos', new ComprasProdutosController().edit)
routes.delete('/compras_produtos/:id_compras_produtos', new ComprasProdutosController().destroy)

routes.get('/enderecos', new EnderecosController().index)
routes.post('/enderecos', new EnderecosController().store)
routes.put('/enderecos/:id_endereco', new EnderecosController().edit)
routes.delete('/enderecos/:id_endereco', new EnderecosController().destroy)

routes.get('/estados', new EstadosController().index)
routes.post('/estados', new EstadosController().store)
routes.put('/estados/:id_estado', new EstadosController().edit)
routes.delete('/estados/:id_estado', new EstadosController().destroy)

routes.get('/marcas', new MarcasController().index)
routes.post('/marcas', new MarcasController().store)
routes.put('/marcas/:id_marca', new MarcasController().edit)
routes.delete('/marcas/:id_marca', new MarcasController().destroy)

routes.get('/produtos', new ProdutosController().index)
routes.post('/produtos', multer(multerMiddleware).single('file'), new ProdutosController().store)
routes.put('/produtos/:id_produto', new ProdutosController().edit)
routes.delete('/produtos/:id_produto', new ProdutosController().destroy)


export { routes }