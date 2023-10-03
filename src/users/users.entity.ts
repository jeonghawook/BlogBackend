import { Comments } from 'src/comments/comments.entity';
import { Posts } from 'src/posts/posts.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  JoinColumn,
  IntegerType,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  @Unique(['nickname'])
  nickname: string;

  @Column()
  userName: string;

  @Column({ default: false })
  idAdmin: boolean;

  @Column()
  @Unique(['userEmail'])
  userEmail: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: 0 })
  rank: number;

  @Column({ type: 'integer', array: true, nullable: true })
  following: number[];

  @OneToMany(
    () => Posts,
    (posts) => {
      posts.user;
    },
  )
  posts: Posts[];

  @OneToMany(
    () => Comments,
    (comments) => {
      comments.user;
    },
  )
  comments: Comments[];
}
