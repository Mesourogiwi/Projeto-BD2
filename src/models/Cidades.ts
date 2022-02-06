import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Cidades extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_cidade: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                cidade: DataTypes.STRING,
                estado: DataTypes.INTEGER,
            },
            {
                sequelize,
                tableName: 'cidades'
            }
        )
    }

    static associate(models) {
        //@ts-ignore
        this.belongsTo(models.Estados, { foreignKey: 'estado' })
    }
}