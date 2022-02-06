import { Sequelize } from "sequelize";
import 'dotenv/config'

const connection = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    define: {
        timestamps: false,
    },
})
import { Administradores } from "../models/Administradores";
import { Categorias } from "../models/Categorias";
import { Cidades } from "../models/Cidades";
import { Clientes } from "../models/Clientes";
import { Compras } from "../models/Compras";
import { ComprasProdutos } from "../models/ComprasProdutos";
import { Enderecos } from "../models/Enderecos";
import { Estados } from "../models/Estados";
import { Marcas } from "../models/Marcas";
import { Produtos } from "../models/Produtos";

connection.authenticate().then(() => {
    console.log('Database connected!')
}).catch((error) => {
    console.log({
        message: 'Failed to connect database',
        error
    })
})

Administradores.init(connection)
Categorias.init(connection)
Cidades.init(connection)
Clientes.init(connection)
Compras.init(connection)
ComprasProdutos.init(connection)
Enderecos.init(connection)
Estados.init(connection)
Marcas.init(connection)
Produtos.init(connection)

Cidades.associate(connection.models)
Clientes.associate(connection.models)
Compras.associate(connection.models)
ComprasProdutos.associate(connection.models)
Enderecos.associate(connection.models)
Produtos.associate(connection.models)