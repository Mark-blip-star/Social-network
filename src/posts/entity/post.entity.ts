import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Files } from "../../files/entity/file.entity";
import { Likes } from "../../likes/entity/likes.entity";
import { User } from "../../user/entities/user.entity";
import { Comments } from "../../comments/entity/comment.entity";
import { Profile } from "../../profile/entity/profile.entity";

@Entity("posts")
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.author)
  @JoinColumn({ name: "author" })
  author: User;

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

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Posts[];

  @ManyToOne(() => Profile, (profile) => profile.posts)
  profile: Profile;
}
