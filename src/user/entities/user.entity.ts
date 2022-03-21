import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserCharacter, UserStatus } from "../../common/enums/user.enums";

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
}
