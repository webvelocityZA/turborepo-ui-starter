import { join } from "node:path";
import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class FilesService {
  getFile(filename: string, res: Response) {
    const filePath = join(process.cwd(), "public", filename);
    return res.sendFile(filePath);
  }
}
