import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  username: string;
  @Column('text', { nullable: true })
  name: string;
  @Column('text')
  access_token: string;
  @Column('text', { nullable: true })
  refresh_token: string;
  @Column('text')
  repos_url: string;
}
