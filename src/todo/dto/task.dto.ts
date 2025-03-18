export class ListTasksDto {
    username: string;
}

export class CreateTaskDto {
    username: string;
    title: string;
    description: string;
    deadline: Date | null;
}

export class ModifyTaskDto {
    task_id: string;
    title: string;
    description: string;
    deadline: Date | null;
    completed: boolean;
}

export class DeleteTaskDto {
    task_id: string;
}