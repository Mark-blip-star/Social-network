import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Files } from "../../files/entity/file.entity";
import { Likes } from "../../likes/entity/likes.entity";
import { User } from "../../user/entities/user.entity";

@Entity("posts")
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  author: string;

  @OneToMany(() => Files, (files) => files.posts)
  files: Files[];

  @Column({ type: "boolean", default: true })
  draft: boolean;

  @Column({ type: "varchar", nullable: true })
  title: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @OneToMany(() => Likes, (like) => like.post)
  likes: Posts[];

  @Column({ type: "varchar", nullable: true })
  comments: string;
}
