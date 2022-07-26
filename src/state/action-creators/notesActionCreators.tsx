import { Dispatch } from 'redux';
import { addNoteDb, deleteNoteDb, getNotesDb } from '../../services/firebase';
import { NotesActionType as ActionType } from '../action-types';
import { NotesAction as Action } from '../actions';
import { Note } from './../../models/Note';
import { editNoteDb } from './../../services/firebase';

export const addNote = (title: string, content: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.ADD_NOTE,
    });
    const date = new Date();
    const note: Note = {
      title: title,
      content: content,
      creationDate: date.toTimeString(),
    };
    try {
      note.id = await addNoteDb(note);
      dispatch({
        type: ActionType.ADD_NOTE_SUCCESS,
        payload: note,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.ADD_NOTE_ERROR,
        payload: error.message,
      });
    }
  };
};

export const fetchNotes = () => {
  return async (disptach: Dispatch<Action>) => {
    disptach({
      type: ActionType.FETCH_NOTE,
    });
    try {
      const notes = await getNotesDb();
      disptach({
        type: ActionType.FETCH_NOTE_SUCCESS,
        payload: notes,
      });
    } catch (error: any) {
      disptach({
        type: ActionType.FETCH_NOTE_ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteNote = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.DELETE_NOTE,
    });

    try {
      deleteNoteDb(id);
      dispatch({
        type: ActionType.DELETE_NOTE_SUCCESS,
        payload: id,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.DELETE_NOTE_ERROR,
        payload: error.message,
      });
    }
  };
};

export const editNote = (title: string, content: string, id?: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.EDIT_NOTE,
    });
    try {
      if (!id) throw new Error('You must provide note id!');
      await editNoteDb(title, content, id);
      dispatch({
        type: ActionType.EDIT_NOTE_SUCCESS,
        payload: { title, content, id },
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.EDIT_NOTE_ERROR,
        payload: error.message,
      });
    }
  };
};
