import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Response } from 'express';
import { ZodError } from "zod";

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
    catch(error: ZodError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const httpError = new BadRequestException({ issues: error.issues });
        response.status(httpError.getStatus()).json(httpError);
    }
}