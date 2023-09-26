import { Posts } from "src/posts/posts.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Comments extends BaseEntity{
    @PrimaryGeneratedColumn()
    commentId:number

    @Column()
    comment:string

    @ManyToOne(()=>Users, (user)=>user.comments)
    @JoinColumn({name:"userId"})
    user:Users

    @Column()
    userId:number

    @ManyToOne(()=>Posts,(post)=>post.comments)
    @JoinColumn({name:"postId"}) //없으면 자동으로 생겨서 column 따로 만들필요 없음
    post:Posts

    @Column()
    postId:number

    @Column()
    nickname:string
    
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}