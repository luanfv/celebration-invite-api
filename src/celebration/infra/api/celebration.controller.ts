import { Post, Controller } from '@nestjs/common';

@Controller('/celebration')
export class CelebrationController {
  @Post()
  create() {
    return 'hello world';
  }
}
