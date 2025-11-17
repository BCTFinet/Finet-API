import { AuthGuard } from "@nestjs/passport";
import { BadRequestException, ExecutionContext, Injectable } from "@nestjs/common";
// import { plainToInstance } from "class-transformer";
// import { CreateUserDto } from "src/user/dto/create-user.dto";
// import { validate } from "class-validator";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    // async canActivate(context : ExecutionContext) {
    //     const req = context.switchToHttp().getRequest();

    //     const dto = plainToInstance(CreateUserDto, req.body);
    //     const errors = await validate(dto);

    //     if (errors.length > 0) {
    //         throw new BadRequestException(errors);
    //     }

    //     return (await super.canActivate(context) as boolean);
    // }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}