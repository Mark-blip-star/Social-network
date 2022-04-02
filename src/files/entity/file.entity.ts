import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "../../posts/entity/post.entity";

@Entity("files")
export class Files {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Posts, (posts) => posts.files)
  posts: Posts;

  @Column()
  url: string;
}
