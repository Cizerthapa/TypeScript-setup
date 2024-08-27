import { Table, Column, Unique, Model, DataType } from 'sequelize-typescript';

@Table
class Person extends Model {
    @Unique
    @Column({ type: DataType.STRING })
    private _username: string = ''; // Initialize with an empty string

    @Column({ type: DataType.STRING })
    password: string = ''; // Initialize with an empty string

    @Column({ type: DataType.STRING })
    role: string = ''; // Initialize with an empty string

    @Column({ type: DataType.STRING })
    fullname: string = ''; // Initialize with an empty string

    @Column({ type: DataType.STRING })
    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this.setDataValue('_username', value);
    }
}

export default Person;
