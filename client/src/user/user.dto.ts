import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthorizationDto {
    @IsString()
    @MinLength(3)
    username: string = ""

    @IsString()
    @MinLength(3)
    password: string = ""
}

export class SigninResponseDto {

    @IsString()
    @IsNotEmpty()
    id: string = ""

    @IsString()
    @IsNotEmpty()
    username: string = ""

    @IsString()
    @IsNotEmpty()
    token: string = ""
}
