import { ConflictException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { UserCreateDto } from "./dto/UserCreateDto";
import { alreadyExistsMessage } from "../common/messages/error.messages";
import { hashSync } from "bcrypt";
import { TokenService } from "../token/token.service";
import { ConfirmLink } from "./types/confirm";
import { MailMessage } from "../mail/types/mail.type";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UserService {
  private readonly backendProtocol: string;
  private readonly backendPort: number;
  private readonly backendHost: string;

  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
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

    const { firstName, email } = await this.userEntity.save({
      ...user,
      password: this.hashPassword(user.password),
      // profile: await this.profileService.createProfile(),
    });

    const confirmEmail = await this.getConfirmEmail(firstName, email);
    await this.mailService.sendMailMessage(confirmEmail);

    return {
      message:
        "The account was successfully created. A confirmation email was sent to you",
    };
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

  public async upDateUserEmailConfirm(email: string, status): Promise<void> {
    await this.userEntity.update({ email }, { emailActivated: true, status });
  }
}
