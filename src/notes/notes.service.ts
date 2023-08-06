import { findDates } from 'src/helpers/findDates';
import { Injectable } from '@nestjs/common';
import { NoteCategories, NoteDto, NoteStatus } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/upadate-note.dto';

@Injectable()
export class NotesService {
    private notes: Array<NoteDto> = [
        {
            name: "Lorem ipsum dolor",
            category: NoteCategories.task,
            id: "dbfe60b1-7b44-466e-a16c-1c960e0a7ddc",
            content: "mollitia repellendus natus a voluptas",
            status: NoteStatus.active,
            createdAt: "August 4, 2023",
            dates: [
                "25.11.2023"
            ]
        },
        {
            name: "Cum qui blanditiis",
            category: NoteCategories.idea,
            id: "75c79b4d-da1f-49e1-9fd7-4fcdc53bec6e",
            content: "consectetur adipisicing elit",
            status: NoteStatus.active,
            createdAt: "August 4, 2023",
            dates: [
                "15/03/2023"
            ]
        },
        {
            name: "Voluptas cum qui blanditiis",
            category: NoteCategories.idea,
            id: "5ac98c39-b4eb-475a-b91c-f0d33712b06a",
            content: "facere explicabo quo, mollitia repellendus natus a voluptas cum qui blanditiis",
            status: NoteStatus.active,
            createdAt: "August 4, 2023",
            dates: []
        },
        {
            name: "Non,officiis!",
            category: NoteCategories.randomThought,
            id: "b3787ec1-2d8d-45cf-84c3-ab0c70522897",
            content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
            status: NoteStatus.active,
            createdAt: "August 4, 2023",
            dates: ["10-05-2023"]
        },

    ]
    private archive: Array<NoteDto> = [{
        name: "Note 1",
        category: NoteCategories.task,
        id: "ab87b8a3-61ed-4711-9a11-cd954cd477dc",
        content: "Some content",
        status: NoteStatus.archived,
        createdAt: "August 4, 2023",
        dates: [
            "11.01.2023"
        ]
    }]

    private stats = {
        [NoteCategories.task]: { active: 0, archived: 0 },
        [NoteCategories.randomThought]: { active: 0, archived: 0 },
        [NoteCategories.idea]: { active: 0, archived: 0 },
    }

    getAllNotes(): Array<NoteDto> {
        return this.notes
    }

    getArchivedNotes(): Array<NoteDto> {
        return this.archive
    }

    getNote(id: string): NoteDto {
        const note = this.notes.find((note) => note.id === id)
        return note
    }

    addNote(noteDto: NoteDto): NoteDto {
        this.notes.push(noteDto)
        return noteDto
    }

    deleteNote(id: string): void {
        this.notes = this.notes.filter((note) => note.id !== id)
    }

    editNote(updatedDto: UpdateNoteDto, id: string): void {
        const note = this.notes.find((note) => note.id === id);

        if (note) {
            const noteIndex = this.notes.indexOf(note);

            note.name = updatedDto.name;
            note.category = updatedDto.category;
            note.content = updatedDto.content;
            note.dates = findDates(updatedDto.content);

            const notesCopy = [...this.notes];
            notesCopy[noteIndex] = note;
            this.notes = notesCopy;
        }
    }

    archiveNote(id: string): void {
        const note = this.notes.find((note) => note.id === id)

        if (this.archive.find((note) => note.id === id)) {
            return;
        }

        if (note) {
            note.status = NoteStatus.archived
            this.archive.push(note)
            this.notes = this.notes.filter((note) => note.id !== id)
        }
    }

    removeNoteFromArchive(id: string): void {
        const note = this.archive.find((note) => note.id === id)

        if (this.notes.find((note) => note.id === id)) {
            return;
        }

        if (note) {
            note.status = NoteStatus.active
            this.notes.push(note)
            this.archive = this.archive.filter((note) => note.id !== id)
        }
    }

    getStats(): typeof this.stats {
        this.calcStats()
        return this.stats
    }

    calcStats(): void {
        const allNotes = [...this.notes, ...this.archive];

        const stats = {
            [NoteCategories.task]: { active: 0, archived: 0 },
            [NoteCategories.randomThought]: { active: 0, archived: 0 },
            [NoteCategories.idea]: { active: 0, archived: 0 }
        };

        allNotes.forEach((note) => {
            const { category, status } = note;

            if (status === NoteStatus.archived) {
                stats[category].archived++;
            } else {
                stats[category].active++;
            }
        });

        this.stats = stats;
    }
}
