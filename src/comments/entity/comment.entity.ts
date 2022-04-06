import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Posts } from "../../posts/entity/post.entity";
import { User } from "../../user/entities/user.entity";

@Entity(`comments`)
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Posts, (posts) => posts.comments)
  post: Posts;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  author: User;

  @Column({ type: "varchar", nullable: false })
  text: string;

  @ManyToOne(() => User, (user) => user.id)
  answerTo: User;
}
