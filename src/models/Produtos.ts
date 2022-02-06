import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Produtos extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_produto: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: DataTypes.STRING,
                descricao: DataTypes.STRING,
                imagem: DataTypes.STRING,
                preco: DataTypes.FLOAT,
                estoque: DataTypes.INTEGER,
                categoria: DataTypes.INTEGER,
                marca: DataTypes.INTEGER,
                imposto: DataTypes.FLOAT,
            },
            {
                sequelize,
                tableName: 'produtos'
            }
        )
    }

    static associate(models) {
        //@ts-ignore
        this.belongsTo(models.Categorias, { foreignKey: 'categoria' })
        //@ts-ignore
        this.belongsTo(models.Marcas, { foreignKey: 'marca' })
    }
}

