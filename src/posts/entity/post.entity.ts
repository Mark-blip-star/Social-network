import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity("posts")
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  @ManyToOne(() => User, (user) => user.id)
  author: string;

  @Column({ type: "varchar", nullable: false })
  files: string[];

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @Column({ type: "varchar", nullable: true })
  likes: string;

  @Column({ type: "varchar", nullable: true })
  comments: string;
}
