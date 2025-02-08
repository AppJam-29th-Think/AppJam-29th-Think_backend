import { Entity, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @Column()
  uid: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column('text')
  profile_img: string;

  @Column()
  profile_msg: string;

  @CreateDateColumn()
  created_at: Date;

  @Column('int', { array: true })
  skills: number[];
}
