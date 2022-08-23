import {
    BaseEntity as TypeORMBaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseEntity extends TypeORMBaseEntity {
    @PrimaryGeneratedColumn({
        comment: '自增主键',
    })
    id: number;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
        comment: '创建时间',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
        comment: '更新时间',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        type: 'timestamp',
        name: 'deleted_at',
        nullable: true,
        comment: '删除时间',
    })
    deletedAt?: Date;

    @Column({
        type: 'int',
        name: 'created_by',
        comment: '创建人',
    })
    createdBy: number;

    @Column({
        type: 'int',
        name: 'updated_by',
        comment: '更新人',
    })
    updatedBy: number;

    @Column({
        type: 'int',
        name: 'deleted_by',
        comment: '删除人'
    })
    deletedBy?: number;
}
