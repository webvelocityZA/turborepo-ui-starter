import { CacheInterceptor } from "@nestjs/cache-manager";
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AppendAddressesDto } from "./notion.dto";
import { NotionService } from "./notion.service";

@Controller("notion")
@UseInterceptors(CacheInterceptor)
export class NotionController {
  constructor(private notionService: NotionService) {}

  @Get()
  async getAddresses() {
    try {
      const data = await this.notionService.getAddresses();
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch()
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
