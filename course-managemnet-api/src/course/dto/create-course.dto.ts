import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsString()
    @IsNotEmpty()
    code!: string;

    @IsString()
    @IsNotEmpty()
    instructor!: string;

    @IsNumber()
    @Min(1)
    @Max(6)
    @IsNotEmpty()
    credits!: number;

    @IsOptional()
    @IsString()
    description!: string;
}