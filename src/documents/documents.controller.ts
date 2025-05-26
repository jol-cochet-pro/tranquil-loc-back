import { Controller, Get, Param } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { documentUrlDtoSchema } from "./dto/document-url.dto";


@Controller('documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.documentsService.findOne(id, "url").then((document) => documentUrlDtoSchema.parse(document));
    }
}