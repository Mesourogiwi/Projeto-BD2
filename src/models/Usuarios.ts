import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Usuarios extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_usuario: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                nome: DataTypes.STRING,
                email: DataTypes.STRING,
                senha: DataTypes.STRING,
                cpf: DataTypes.STRING,
                endereco: DataTypes.INTEGER,
                admin: DataTypes.TINYINT
            },
            {
                sequelize,
                tableName: 'usuarios'
            }
        )
    }

    static associate(models) {
        //@ts-ignore
        this.belongsTo(models.Enderecos, { foreignKey: 'endereco' })
    }
}