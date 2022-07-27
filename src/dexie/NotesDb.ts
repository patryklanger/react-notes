import Dexie from 'dexie';
import { Note } from '../models/Note.model';

class NotesDb extends Dexie {
  notes!: Dexie.Table<Note, string>;

  constructor() {
    super('Notes');
    this.version(1).stores({
      notes: 'id,title,content,creationDate',
    });
  }
}

export default NotesDb;
