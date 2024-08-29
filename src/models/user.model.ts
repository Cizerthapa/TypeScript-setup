import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
})
class Person extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullname!: string;
}

export default Person;
