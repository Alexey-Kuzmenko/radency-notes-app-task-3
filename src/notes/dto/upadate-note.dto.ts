import { NoteCategories } from "./create-note.dto"

export class UpdateNoteDto {
    name: string
    category: NoteCategories
    content: string
}