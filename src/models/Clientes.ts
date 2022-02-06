import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Clientes extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_cliente: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING,
                cpf: DataTypes.STRING,
                endereco: DataTypes.INTEGER,
            },
            {
                sequelize,
                tableName: 'clientes'
            }
        )
    }

    static associate(models) {
        //@ts-ignore
        this.belongsTo(models.Enderecos, { foreignKey: 'endereco' })
    }
}