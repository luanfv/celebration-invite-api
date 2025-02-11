import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateInviteBodyDto,
  CreateInviteParamsDto,
} from './dto/create-invite.dto';

@Controller('')
export class InviteController {
  @Post('/celebration/:celebrationId/invite')
  create(
    @Param() { celebrationId }: CreateInviteParamsDto,
    @Body() { expireAt, guests, maxGuest }: CreateInviteBodyDto,
  ) {
    console.log('>>>> params:', celebrationId);
    console.log('>>>> body:', expireAt, guests, maxGuest);
  }
}
