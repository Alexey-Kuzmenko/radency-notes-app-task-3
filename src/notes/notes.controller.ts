/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { NoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/upadate-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {

    constructor(private readonly notesService: NotesService) { }

    @Get()
    getNotes(): Array<NoteDto> {
        return this.notesService.getAllNotes()
    }

    @Get(':id')
    getNote(@Param('id') id: string): NoteDto {
        return this.notesService.getNote(id)
    }

    @Get('stats')
    getStats() {
        // ! testing
        return { stats: {} }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    addNote(@Body() dto: NoteDto): NoteDto {
        return this.notesService.addNote(dto)
    }

    @Delete(':id')
    deleteNote(@Param('id') id: string) {
        this.notesService.deleteNote(id)
    }

    @Patch(':id')
    editNote(@Body() updateDto: UpdateNoteDto, @Param('id') id: string) {
        return { updatedDto: updateDto, id: id }
    }

    @Patch(':id')
    archiveNote(@Param('id') id: string) { }

    @Patch(':id')
    removeFromArchiveNote(@Param('id') id: string) { }
}
