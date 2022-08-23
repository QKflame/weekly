import { Column, Entity } from 'typeorm';
import BaseEntity from './Base';

@Entity()
export class Plan extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 255,
        comment: '计划标题',
    })
    title: string;

    @Column({
        type: 'varchar',
        name: 'card_link',
        length: 255,
        nullable: true,
        comment: '关联卡片地址',
    })
    cardLink?: string;

    @Column({
        type: 'text',
        nullable: true,
        comment: '卡片内容',
    })
    content?: string;

    @Column({
        type: 'tinyint',
        default: 0,
        comment: '优先级: 0 - 无优先级 1 - 低优先级 2 - 中优先级 3 - 高优先级',
    })
    priority: number;

    @Column({
        type: 'tinyint',
        name: 'process_state',
        comment: '流程状态',
    })
    processState: number;

    @Column({
        type: 'tinyint',
        default: 0,
        comment: '计划状态 0 - 未完成 1 - 已完成',
    })
    status: number;
}
