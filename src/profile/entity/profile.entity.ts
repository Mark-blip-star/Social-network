import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../user/entities/user.entity";
import { JoinTable } from "typeorm";
import { Posts } from "../../posts/entity/post.entity";

@Entity("profile")
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "userid" })
  userid: User;

  @Column({ type: "varchar", nullable: true })
  logo;

  @OneToMany(() => Posts, (posts) => posts.profile)
  posts: Posts[];

  @Column({ type: "varchar", nullable: true })
  aboutMe: string;
}
