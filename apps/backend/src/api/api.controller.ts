import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AppendAddressesDto, GetAddressesQuery } from "./api.dto";
import { ApiService } from "./api.service";

@Controller("api")
@UseInterceptors(CacheInterceptor)
export class ApiController {
  constructor(private notionService: ApiService) {}

  @Get("addresses")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getAddresses(@Query() params: GetAddressesQuery) {
    try {
      const data = await this.notionService.getAddresses(params);
      return { success: true, ...data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch("addresses")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async appendAddresses(@Body() { addresses }: AppendAddressesDto) {
    try {
      const data = await this.notionService.appendAddress(...addresses);
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
