import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return 'Hello world!';
  }
}
