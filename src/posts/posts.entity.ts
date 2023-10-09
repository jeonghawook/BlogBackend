import { Comments } from "src/comments/comments.entity";
import { Users } from "src/users/users.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Posts extends BaseEntity{
    @PrimaryGeneratedColumn()
    postId: number

    @Column({unique:true,nullable:true})
    kakao_postId: string

    @Column()
    postDescription:string;

    @Column({nullable:true})
    location: string;

    @Column("text",{array:true, nullable:true}) 
    images: string[];

    @Column({default:'none'})
    category:string

    @Column("text",{array:true, nullable:true})
    tags: string[]

    @Column("bytea",{nullable:true})
    ImageData: Buffer;

    @Column({nullable:true})
    group:string

    @ManyToOne(()=>Users, (user)=>user.posts)
    @JoinColumn({name:'userId'})
    user:Users

    @Column()
    userId:number

    // @ManyToOne(()=>Category,(category)=>category.posts)
    // @JoinColumn({name:'categoryId'})
    // category:Category
    @OneToMany(()=>Comments, (comments)=>comments.post)
    comments:Comments

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}