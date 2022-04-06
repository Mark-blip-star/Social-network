import { Module } from '@nestjs/common';
import { FollowingController } from './following.controller';
import { FollowingService } from './following.service';

@Module({
  controllers: [FollowingController],
  providers: [FollowingService]
})
export class FollowingModule {}
