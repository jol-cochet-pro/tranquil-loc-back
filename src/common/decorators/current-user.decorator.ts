import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const user = ctx.switchToHttp().getRequest().user;
        if (!user) {
            throw new UnauthorizedException();
        }
        return data ? user[data] : user; // extract a specific property only if specified or get a user object
    },
);
