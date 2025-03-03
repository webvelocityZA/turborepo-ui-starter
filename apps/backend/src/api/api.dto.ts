import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class AppendAddressesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Length(48, 48, {
    each: true,
    message: "Each address must be 48 characters long",
  })
  addresses: string[];
}

export class GetAddressesQuery {
  @IsOptional()
  @IsString()
  /**
   * https://developers.notion.com/docs/working-with-page-content#creating-a-page-with-content
   * See the "Where can I find my page's ID?" block about the page ID format
   */
  @MinLength(32)
  @MaxLength(36)
  startCursor?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize?: number;
}
