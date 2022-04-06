import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./entity/profile.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileEntity: Repository<Profile>,
    @Inject(forwardRef(() => UserService)) private userSerivce: UserService
  ) {}

  async createUserProfile(user) {
    return await this.profileEntity.save({ userid: user });
  }

  async getProfileByUserId(userid) {
    return await this.profileEntity.findOne({ userid });
  }
}
