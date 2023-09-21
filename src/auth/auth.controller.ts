import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('/SendOtp')
  async sendOtp(@Body() data: { phone: string }): Promise<{ data: any }> {
    const prefix = '+91';
    const phone = prefix.concat(data.phone);
    return await this.authService.sendOtp(phone);
  }

  @Post('/VerifyOtp')
  async verifyOtp(
    @Body() data: { phone: string; otp: string },
  ): Promise<{ data: any }> {
    const prefix = '+91';
    const phone = prefix.concat(data.phone);
    return await this.authService.verifyOtp(phone, data.otp);
  }

  //   @Post('/Submit')
  //   async submit(
  //     @Body() data: { name: string; phone: string },
  //   ): Promise<{ msg: string }> {
  //     let prefix = '+91';
  //     let phone = prefix.concat(data.phone);
  //     return await this.authService.submit(phone, data.name);
  //   }

  //   @Post('/Get')
  //   async get(@Body() data: { phone: string }): Promise<{ data: any }> {
  //     let prefix = '+91';
  //     let phone = prefix.concat(data.phone);
  //     return await this.authService.get(phone);
  //   }
}
