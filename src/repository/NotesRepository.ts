import NotesDb from '../dexie/NotesDb';
import { Note } from '../models/Note.model';
import {
  addNoteDb,
  deleteNoteDb,
  editNoteDb,
  getNotesDb,
} from '../services/firebase';

const { notes } = new NotesDb();

export const addNote = async (title: string, content: string) => {
  try {
    const note: Note = {
      title: title,
      content: content,
      creationDate: new Date().toISOString(),
    };
    var id = await addNoteDb(note);
    const noteWithId: Note = { ...note, id: id };
    notes.add(noteWithId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getNotes = async () => {
  try {
    const response = await getNotesDb();
    notes.bulkPut(response);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteNote = async (id: string) => {
  try {
    await deleteNoteDb(id);
    notes.delete(id);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const editNote = async (title: string, content: string, id?: string) => {
  if (!id) throw new Error('You must provide note id');
  try {
    await editNoteDb(title, content, id);
    notes.update(id, {
      title: title,
      content: content,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
