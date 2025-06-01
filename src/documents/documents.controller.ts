import { Controller, Get, Param } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { documentDtoSchema } from "./dto/document.dto";
import { CurrentUser } from "src/common/decorators/current-user.decorator";


@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Get(':id')
    async findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
        return this.documentsService.findOne(userId, id).then((document) => documentDtoSchema.parse(document));
    }
}