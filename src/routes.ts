import { Router } from "express";

const routes = Router()

import multer from "multer";
import { multerMiddleware } from "./middlewares/multer";

import { CategoriasController } from "./controllers/CategoriasController";
import { CidadesController } from "./controllers/CidadesController";
import { UsuariosController } from "./controllers/UsuariosController";
import { ComprasController } from "./controllers/ComprasController";
import { ComprasProdutosController } from "./controllers/ComprasProdutosController";
// import { EnderecosController } from "./controllers/EnderecosController";
import { EstadosController } from "./controllers/EstadosController";
import { MarcasController } from "./controllers/MarcasController";
import { ProdutosController } from "./controllers/ProdutosController";
import { ensuredAuthenticated } from "./middlewares/auth";
import { AuthController } from "./controllers/AuthController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

routes.get('/categorias', new CategoriasController().index)
routes.post('/categorias', ensureAdmin(), ensuredAuthenticated(), new CategoriasController().store)
routes.put('/categorias/:id_categoria', ensureAdmin(), ensuredAuthenticated(), new CategoriasController().edit)
routes.delete('/categorias/:id_categoria', ensureAdmin(), ensuredAuthenticated(), new CategoriasController().destroy)

routes.get('/cidades', new CidadesController().index)
routes.post('/cidades', ensureAdmin(), ensuredAuthenticated(), new CidadesController().store)
routes.put('/cidades/:id_cidade', ensureAdmin(), ensuredAuthenticated(), new CidadesController().edit)
routes.delete('/cidades/:id_cidade', ensureAdmin(), ensuredAuthenticated(), new CidadesController().destroy)

routes.get('/usuarios', new UsuariosController().index)
routes.put('/usuarios/:id_usuario', ensuredAuthenticated(), new UsuariosController().edit)
routes.delete('/usuarios/:id_usuario', ensuredAuthenticated(), new UsuariosController().destroy)

routes.get('/compras', new ComprasController().index)
routes.get('/compras/:id_cliente', new ComprasController().indexByProduct)
routes.post('/compras', new ComprasController().store)
routes.put('/compras/:id_compra', new ComprasController().edit)
routes.delete('/compras/:id_compra', ensureAdmin(), ensuredAuthenticated(), new ComprasController().destroy)

routes.get('/compras_produtos', new ComprasProdutosController().index)
routes.post('/compras_produtos', new ComprasProdutosController().store)
routes.put('/compras_produtos/:id_compras_produtos', new ComprasProdutosController().edit)
routes.delete('/compras_produtos/:id_compras_produtos', new ComprasProdutosController().destroy)

// routes.get('/enderecos', ensureAdmin(), ensuredAuthenticated(), new EnderecosController().index)
// routes.post('/enderecos', ensuredAuthenticated(), new EnderecosController().store)
// routes.put('/enderecos/:id_endereco', ensuredAuthenticated(), new EnderecosController().edit)
// routes.delete('/enderecos/:id_endereco', ensuredAuthenticated(), new EnderecosController().destroy)

routes.get('/estados', new EstadosController().index)
routes.post('/estados', ensureAdmin(), ensuredAuthenticated(), new EstadosController().store)
routes.put('/estados/:id_estado', ensureAdmin(), ensuredAuthenticated(), new EstadosController().edit)
routes.delete('/estados/:id_estado', ensureAdmin(), ensuredAuthenticated(), new EstadosController().destroy)

routes.get('/marcas', new MarcasController().index)
routes.post('/marcas', ensureAdmin(), ensuredAuthenticated(), new MarcasController().store)
routes.put('/marcas/:id_marca', ensureAdmin(), ensuredAuthenticated(), new MarcasController().edit)
routes.delete('/marcas/:id_marca', ensureAdmin(), ensuredAuthenticated(), new MarcasController().destroy)

routes.get('/produtos', new ProdutosController().index)
routes.post('/produtos', ensureAdmin(), ensuredAuthenticated(), multer(multerMiddleware).single('file'), new ProdutosController().store)
routes.put('/produtos/:id_produto', ensureAdmin(), ensuredAuthenticated(), multer(multerMiddleware).single('file'), new ProdutosController().edit)
routes.delete('/produtos/:id_produto', ensureAdmin(), ensuredAuthenticated(), new ProdutosController().destroy)

routes.post('/cadastrar', new AuthController().register)
routes.post('/login', new AuthController().authenticate)


export { routes }