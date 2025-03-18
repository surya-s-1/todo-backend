import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string | null;

    @IsDateString()
    @IsOptional()
    deadline: Date | null;
}

export class ModifyTaskDto {
    @IsUUID()
    @IsNotEmpty()
    task_id: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string | null;

    @IsDateString()
    @IsOptional()
    deadline: Date | null;

    @IsBoolean()
    @IsOptional()
    completed: boolean;
}

export class DeleteTaskDto {
    @IsBoolean()
    @IsNotEmpty()
    task_id: string;
}