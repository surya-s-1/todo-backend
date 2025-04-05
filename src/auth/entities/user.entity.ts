import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import { Task } from '../../todo/entities/task.entity';

@Entity('users')
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 20, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];
}