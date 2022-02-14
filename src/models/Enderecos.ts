import { Model, DataTypes } from "sequelize";

//@ts-ignore
export class Enderecos extends Model {
    static init(sequelize) {
        //@ts-ignore
        super.init(
            {
                id_endereco: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                rua: DataTypes.STRING,
                bairro: DataTypes.STRING,
                numero: DataTypes.STRING,
                cidade: DataTypes.INTEGER,
                estado: DataTypes.INTEGER,
                CEP: DataTypes.STRING,
            },
            {
                sequelize,
                tableName: 'enderecos'
            }
        )
    }

    static associate(models) {
        //@ts-ignore
        this.belongsTo(models.Estados, { foreignKey: 'estado' })
        //@ts-ignore
        this.belongsTo(models.Cidades, { foreignKey: 'cidade' })
    }
}

export type TypesEndereco = {
    rua: String,
    bairro: String,
    numero?: String,
    cidade: number,
    estado: number,
    CEP: String
}