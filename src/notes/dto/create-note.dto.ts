import { IsArray, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export enum NoteCategories {
    task = 'task',
    randomThought = 'randomThought',
    idea = 'idea'
}

export enum NoteStatus {
    'active',
    'archived'
}

export class NoteDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsEnum(NoteCategories, { message: 'Invalid note category' })
    category: NoteCategories

    @IsUUID('4')
    id: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsEnum(NoteStatus, { message: 'Invalid note status' })
    status: NoteStatus

    @IsNotEmpty()
    @IsString()
    createdAt: string;

    @IsArray()
    dates: Array<string>
}