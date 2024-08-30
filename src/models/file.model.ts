import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import Person from './user.model'; // Import the Person model if `user_id` references the `Person` model

@Table({
    timestamps: false, // If you don't want `createdAt` and `updatedAt` columns
})
class File extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id!: number;

    @ForeignKey(() => Person) // This establishes a foreign key relationship with the Person model
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    file_name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    file_path!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    uploaded_at!: Date;
}

export default File;
