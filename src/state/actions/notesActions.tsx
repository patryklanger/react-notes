import { Note } from '../../models/Note';
import { NotesActionType as ActionType } from '../action-types';

interface AddNoteAction {
  type: ActionType.ADD_NOTE;
}

interface AddNoteSuccessAction {
  type: ActionType.ADD_NOTE_SUCCESS;
  payload: Note;
}

interface AddNoteErrorAction {
  type: ActionType.ADD_NOTE_ERROR;
  payload: string;
}

interface FetchNotesAcion {
  type: ActionType.FETCH_NOTE;
}

interface FetchNotesSuccess {
  type: ActionType.FETCH_NOTE_SUCCESS;
  payload: Note[];
}

interface FetchNotesError {
  type: ActionType.FETCH_NOTE_ERROR;
  payload: string;
}

interface DeleteNoteAction {
  type: ActionType.DELETE_NOTE;
}

interface DeleteNoteSuccessAction {
  type: ActionType.DELETE_NOTE_SUCCESS;
  payload: string;
}

interface DeleteNoteErrorAction {
  type: ActionType.DELETE_NOTE_ERROR;
  payload: string;
}

interface EditNoteAction {
  type: ActionType.EDIT_NOTE;
}

interface EditNoteSuccessAction {
  type: ActionType.EDIT_NOTE_SUCCESS;
  payload: { title: string; content: string; id: string };
}
interface EditNoteErrorAction {
  type: ActionType.EDIT_NOTE_ERROR;
  payload: string;
}

export type Action =
  | AddNoteAction
  | AddNoteSuccessAction
  | AddNoteErrorAction
  | FetchNotesAcion
  | FetchNotesSuccess
  | FetchNotesError
  | DeleteNoteAction
  | DeleteNoteSuccessAction
  | DeleteNoteErrorAction
  | EditNoteAction
  | EditNoteSuccessAction
  | EditNoteErrorAction;
