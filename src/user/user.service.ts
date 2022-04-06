import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserCreateDto } from "./dto/UserCreateDto";
import {
  alreadyExistsMessage,
  createError,
} from "../common/messages/error.messages";
import { hashSync } from "bcrypt";
import { TokenService } from "../token/token.service";
import { ConfirmLink } from "./types/confirm";
import { MailMessage } from "../mail/types/mail.type";
import { MailService } from "../mail/mail.service";
import { ProfileService } from "../profile/profile.service";
import { isNull } from "lodash";
import { userCreateSuccessfully } from "../common/messages/crud.messages";

@Injectable()
export class UserService {
  private readonly backendProtocol: string;
  private readonly backendPort: number;
  private readonly backendHost: string;

  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
    private readonly profileService: ProfileService,
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {
    this.backendProtocol = this.configService.get<string>("BACKEND_PROTOCOL");
    this.backendPort = this.configService.get<number>("BACKEND_PORT");
    this.backendHost = this.configService.get<string>(`BACKEND_HOST`);
  }

  async createUser(user: UserCreateDto) {
    const getUserByEmail = await this.getUserByEmail(user.email);

    if (getUserByEmail)
      return new ConflictException(alreadyExistsMessage(user.email));

    const createdUser: User = await this.userEntity.save({
      ...user,
      password: this.hashPassword(user.password),
    });

    const profile = await this.profileService.createUserProfile(createdUser);

    if (isNull(profile)) throw new BadRequestException(createError(profile));

    const confirmEmail = await this.getConfirmEmail(
      createdUser.firstName,
      createdUser.email
    );

    await this.mailService.sendMailMessage(confirmEmail);

    return userCreateSuccessfully();
  }

  private async getConfirmEmail(
    firstName: string,
    email: string
  ): Promise<MailMessage> {
    const token = await this.tokenService.getToken(email);

    return {
      to: email,
      subject: "Verify Email Address",
      html:
        `<h3>Hello ${firstName}</h3> <a href="${this.getConfirmLink(
          token
        )}" style="font: bold 11px Arial; ` +
        "text-decoration: none; " +
        "background-color: #EEEEEE; " +
        "color: #333333; padding: 2px 6px 2px 6px; " +
        "border-top: 1px solid #CCCCCC; " +
        "border-right: 1px solid #333333; " +
        "border-bottom: 1px solid #333333; " +
        'border-left: 1px solid #CCCCCC;">Confirm</a>',
      text: "",
    };
  }

  private getConfirmLink(token): ConfirmLink {
    return `${this.backendProtocol}://${this.backendHost}:${this.backendPort}/auth/confirm/?token=${token}`;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return await this.userEntity.findOne({ email });
  }

  public hashPassword(password: string): string {
    return hashSync(password, 5);
  }

  public async getUserById(id): Promise<User> {
    return await this.userEntity.findOne(id);
  }

  public async upDateUserEmailConfirm(email: string, status): Promise<void> {
    await this.userEntity.update({ email }, { emailActivated: true, status });
  }
}
