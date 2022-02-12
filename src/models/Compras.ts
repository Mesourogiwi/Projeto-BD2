import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Compras extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_compra: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                cliente: DataTypes.INTEGER,
                total: DataTypes.FLOAT,
            },
            {
                sequelize,
                tableName: 'compras'
            }
        )
    }

    static associate(models) {
        //@ts-ignore
        this.belongsTo(models.Usuarios, { foreignKey: 'cliente' })
    }
}