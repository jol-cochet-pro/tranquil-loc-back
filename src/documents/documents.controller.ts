import { Controller, Delete, Get, Param, Put, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { documentUrlDtoSchema } from "./dto/document-url.dto";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Get(':id')
    async findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
        return this.documentsService.findOne(userId, id, true).then((document) => documentUrlDtoSchema.parse(document));
    }

    @Put(':id/file')
    @UseInterceptors(FileInterceptor('file'))
    async createFile(@CurrentUser('id') userId: string, @Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
        return this.documentsService.createFile(userId, id, file);
    }
}