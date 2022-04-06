import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserStatus } from "../../common/enums/user.enums";
import { Likes } from "../../likes/entity/likes.entity";
import { Comments } from "../../comments/entity/comment.entity";
import { Profile } from "../../profile/entity/profile.entity";
import { Posts } from "../../posts/entity/post.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  firstName: string;

  @Column({ type: "varchar", nullable: true })
  lastName: string;

  @Column({ type: "varchar", nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ default: UserStatus.Pending, type: "enum", enum: UserStatus })
  status: UserStatus;

  @Column({ default: false })
  emailActivated: boolean;

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];

  @OneToMany(() => Comments, (comments) => comments.author)
  comments: Comments[];

  @OneToMany(() => Posts, (posts) => posts.author)
  author: Posts;
}
