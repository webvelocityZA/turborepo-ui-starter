import { Controller, Get, Param, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { Response } from "express";

import { GetFileParams } from "./files.dto";
import { FilesService } from "./files.service";

@Controller("files")
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get(":filename")
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  getFile(@Param() { filename }: GetFileParams, @Res() res: Response) {
    return this.filesService.getFile(filename, res);
  }
}
