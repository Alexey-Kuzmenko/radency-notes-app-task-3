export type NoteCategories = 'task' | 'randomThought' | 'idea';
export type NoteStatus = 'active' | 'archived';

export class NoteDto {
    name: string
    category: NoteCategories
    id: string
    content: string
    status: NoteStatus
    createdAt: string;
    dates: Array<string>
}