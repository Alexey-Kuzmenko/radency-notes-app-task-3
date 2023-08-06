import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { NoteCategories } from './create-note.dto';

export class UpdateNoteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(NoteCategories, { message: 'Invalid note category' })
  category: NoteCategories;

  @IsNotEmpty()
  @IsString()
  content: string;
}
