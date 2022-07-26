import { Note } from '../../models/Note.model';
import { NotesActionType as ActionType } from '../action-types';
import { NotesAction as Action } from '../actions';

export interface NotesState {
  loading: boolean;
  error: string | null;
  data: Note[];
}

const initialNotesState: NotesState = {
  loading: false,
  error: null,
  data: [],
};

const notesReducer = (
  state: NotesState = initialNotesState,
  action: Action
): NotesState => {
  switch (action.type) {
    case ActionType.ADD_NOTE:
      return { loading: true, error: null, data: [...state.data] };

    case ActionType.ADD_NOTE_SUCCESS:
      return {
        loading: false,
        error: null,
        data: [...state.data, action.payload],
      };

    case ActionType.ADD_NOTE_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [...state.data],
      };

    case ActionType.FETCH_NOTE:
      return {
        loading: true,
        error: null,
        data: [...state.data],
      };

    case ActionType.FETCH_NOTE_SUCCESS:
      return {
        loading: false,
        error: null,
        data: [...action.payload],
      };

    case ActionType.FETCH_NOTE_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [...state.data],
      };
    case ActionType.DELETE_NOTE:
      return {
        loading: true,
        error: null,
        data: [...state.data],
      };
    case ActionType.DELETE_NOTE_SUCCESS: {
      const newData = [...state.data];
      return {
        loading: false,
        error: null,
        data: newData.filter((e) => e.id !== action.payload),
      };
    }
    case ActionType.DELETE_NOTE_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [...state.data],
      };
    case ActionType.EDIT_NOTE:
      return {
        loading: true,
        error: null,
        data: [...state.data],
      };
    case ActionType.EDIT_NOTE_SUCCESS: {
      const noteToEdit = state.data.find((e) => e.id === action.payload.id);
      const newData = [...state.data].filter((e) => e.id !== action.payload.id);
      if (noteToEdit === undefined) return { ...state };
      const edditedNote: Note = {
        id: noteToEdit.id,
        title: action.payload.title,
        content: action.payload.content,
        creationDate: noteToEdit.creationDate,
      };
      return {
        loading: false,
        error: null,
        data: [...newData, edditedNote],
      };
    }
    case ActionType.EDIT_NOTE_ERROR:
      return {
        loading: false,
        error: action.payload,
        data: [...state.data],
      };
    default:
      return state;
  }
};

export default notesReducer;
