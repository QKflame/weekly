import { Column, Entity } from "typeorm";
import BaseEntity from "./Base";

@Entity()
export class User extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 30,
        comment: '用户邮箱'
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 30,
        comment: '用户姓名'
    })
    userName: string;

    @Column({
        type: 'varchar',
        length: 255,
        comment: '用户密码'
    })
    password: string;
}
