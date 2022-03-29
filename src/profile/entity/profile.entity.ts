import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("profile")
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  firstName: string;
}
