import { Body, Controller, Get, HttpException, HttpStatus, Patch } from "@nestjs/common";

import { NotionService } from "./notion.service";

@Controller("notion")
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
  async appendAddress(@Body("addresses") addresses: string[]) {
    if (!addresses || !Array.isArray(addresses) || addresses.length === 0) {
      throw new HttpException(
        "`addresses` is required and it should be an `Array` of `string`",
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const data = await this.notionService.appendAddress(...addresses);
      return { success: true, data };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
