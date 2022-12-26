import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { FileNameValidationPipe } from '../common/pipes/file-name-validation.pipe';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileNameValidationPipe)
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'application/json' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const uploadFile = await this.uploadService.uploadFile(
      file.buffer,
      file.originalname,
    );

    return uploadFile;
  }
}
