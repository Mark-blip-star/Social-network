import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Posts } from "../../posts/entity/post.entity";
import { User } from "../../user/entities/user.entity";

@Entity(`likes`)
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Posts, (post) => post.likes)
  post: Posts;
}
