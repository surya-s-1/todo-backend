import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('users')
@Unique(['username'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;
}