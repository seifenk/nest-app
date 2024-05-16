import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Public } from '@/shared/decorator/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.create(file);
  }

  @Public()
  @Post('chunk')
  @UseInterceptors(FileInterceptor('file'))
  uploadChunk(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return this.fileService.createChunk(file, body);
  }
  @Public()
  @Post('merge')
  mergeChunks(@Body() body) {
    return this.fileService.mergeChunk(body);
  }
}
