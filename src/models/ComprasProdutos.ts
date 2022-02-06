import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class ComprasProdutos extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_compras_produtos: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                produto: DataTypes.INTEGER,
                compra: DataTypes.INTEGER,
                quantidade: DataTypes.INTEGER
            },
            {
                sequelize,
                tableName: 'compras_produtos'
            }
        )
    }

    static associate(models) {
        //@ts-ignore
        this.belongsTo(models.Produtos, { foreignKey: 'produto' })
        //@ts-ignore
        this.belongsTo(models.Compras, { foreignKey: 'compra' })
    }
}