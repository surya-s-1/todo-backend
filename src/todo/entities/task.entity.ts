import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { User } from '../../auth/entities/user.entity'

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, user => user.tasks, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;

    @Column({ type: 'timestamp', nullable: true })
    deadline: Date | null;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @Column({ type: 'char', length: 7, nullable: true })
    color_code: string | null;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}