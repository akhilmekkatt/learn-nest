import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' }) // Match the exact table name (case-sensitive)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ name: 'created_at' })
  createdAt: Date;
}
