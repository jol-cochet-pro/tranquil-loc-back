import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { Response } from 'express';
import { ApiException } from "../dto/api-exception.dto";

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(error: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let httpError = new InternalServerErrorException(error);

        let errorContent: ApiException = {
            code: "unknown"
        };

        switch (error.code) {
            case "P2025":
                errorContent = { code: "not-found" },
                httpError = new NotFoundException(errorContent);
                break;
            case "P2002":
                errorContent = { code: "conflict" },
                httpError = new ConflictException(errorContent);
                break;
        }
        response.status(httpError.getStatus()).json(httpError);
    }
}