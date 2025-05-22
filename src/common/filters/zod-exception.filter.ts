import { BadRequestException, Catch, ExceptionFilter } from "@nestjs/common";
import { ZodError } from "zod";

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
    catch(error: ZodError) {
        console.error(error);
        throw new BadRequestException();
    }
}