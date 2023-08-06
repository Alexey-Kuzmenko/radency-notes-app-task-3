# Author: Oleksii Kuzmenko

**Endpoints**:

| Query type | Endpoint          | Action                         |
| ---------- | ----------------- | ------------------------------ |
| GET        | notes             | Get all notes                  |
| GET        | notes/:id         | Get note by id                 |
| GET        | notes/archive     | Get all archived notes         |
| GET        | notes/stats       | Get notes stats                |
| POST       | notes             | Add new note                   |
| DELETE     | notes/:id         | Delete note by id              |
| PATCH      | notes/:id/edit    | Edit note by id                |
| PATCH      | notes/:id/archive | Archive note by id             |
| PATCH      | notes/:id         | Remove note from archive by id |
