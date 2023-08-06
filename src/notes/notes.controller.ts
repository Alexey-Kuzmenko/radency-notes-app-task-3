/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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

    @Get('archive')
    getArchivedNotes(): Array<NoteDto> {
        return this.notesService.getArchivedNotes()
    }


    @Get('stats')
    getStats() {
        return this.notesService.getStats()
    }

    @Get(':id')
    getNote(@Param('id') id: string): NoteDto {
        return this.notesService.getNote(id)
    }

    @UsePipes(new ValidationPipe())
    @Post()
    @HttpCode(HttpStatus.CREATED)
    addNote(@Body() dto: NoteDto): NoteDto {
        return this.notesService.addNote(dto)
    }

    @Delete(':id')
    deleteNote(@Param('id') id: string): void {
        this.notesService.deleteNote(id)
    }

    @UsePipes(new ValidationPipe())
    @Patch(':id/edit')
    editNote(@Body() updateDto: UpdateNoteDto, @Param('id') id: string): void {
        this.notesService.editNote(updateDto, id)
    }

    @Patch(':id/archive')
    archiveNote(@Param('id') id: string): void {
        this.notesService.archiveNote(id)
    }

    @Patch(':id')
    removeFromArchiveNote(@Param('id') id: string): void {
        this.notesService.removeNoteFromArchive(id)
    }
}
