import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
class File extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    filename: string = 'file';

    @Column({ type: DataType.STRING, allowNull: false })
    path: string = '';

    @Column({ type: DataType.STRING, allowNull: false })
    mimetype: string = '';

    @Column({ type: DataType.BIGINT, allowNull: false })
    size: number = 0;
}

export default File;