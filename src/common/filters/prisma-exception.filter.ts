import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(error: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let httpError = new InternalServerErrorException(error);

        switch (error.code) {
            case "P2025":
                httpError = new NotFoundException(error.meta);
                break;
            case "P2002":
                httpError = new ConflictException(error.meta);
                break;
        }
        response.status(httpError.getStatus()).json(httpError);
    }
}