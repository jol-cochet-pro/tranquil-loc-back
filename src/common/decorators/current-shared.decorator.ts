import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const CurrentShared = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const shared = ctx.switchToHttp().getRequest().shared;
        if (!shared) {
            throw new UnauthorizedException();
        }
        return data ? shared[data] : shared; // extract a specific property only if specified or get a user object
    },
);
