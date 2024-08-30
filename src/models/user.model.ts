import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true, // This automatically adds `createdAt` and `updatedAt` columns
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
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role!: string;

    @Column({
        type: DataType.DATE,
        allowNull: true, // `last_login` might be null if the user hasn't logged in yet
    })
    last_login?: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullname!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true, // `status` might be null if not set
    })
    status?: string;
}

export default Person;
