import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description: string | null;

    @IsDateString()
    @IsOptional()
    deadline: Date | null;

    @IsBoolean()
    @IsOptional()
    completed: boolean;

    @IsString()
    @IsOptional()
    color_code: string | null;
}

export class ModifyTaskDto {
    @IsUUID()
    @IsNotEmpty()
    task_id: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    title: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description: string | null;

    @IsDateString()
    @IsOptional()
    deadline: Date | null;

    @IsBoolean()
    @IsOptional()
    completed: boolean;

    @IsString()
    @IsOptional()
    color_code: string | null;
}

export class MarkCompleteDto {
    @IsUUID()
    @IsNotEmpty()
    task_id: string;

    @IsBoolean()
    @IsNotEmpty()
    completed: boolean;
}

export class DeleteTaskDto {
    @IsUUID()
    @IsNotEmpty()
    task_id: string;
}