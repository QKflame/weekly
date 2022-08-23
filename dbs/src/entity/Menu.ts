import { Column, Entity } from 'typeorm';
import BaseEntity from './Base';

@Entity()
export class Menu extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 255,
        comment: '菜单名称',
    })
    name: string;

    @Column({
        type: 'tinyint',
        comment: '菜单类型',
        default: 0,
    })
    type: number;

    @Column({
        type: 'int',
        name: 'user_id',
        comment: '用户ID',
    })
    userId: number;
}
