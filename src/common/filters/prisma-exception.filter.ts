import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { ApiException } from "../dto/api-exception.dto";

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(error: PrismaClientKnownRequestError, host: ArgumentsHost) {
        let httpError = new InternalServerErrorException(error);
        switch (error.code) {
            case "P2025":
                httpError = new NotFoundException();
                break;
            case "P2002":
                httpError = new ConflictException();
                break;
        }
        throw httpError;
    }
}