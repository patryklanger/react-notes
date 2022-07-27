import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNotesActions } from '../hooks/useActions';
import { Notes } from '../repository';
import { useSelector } from './../hooks/useSelector';
import NoteForm from './NoteForm';
import { useProtectedRoute } from './../hooks/useProtectedRoute';
import { useLiveQuery } from 'dexie-react-hooks';
import NotesDb from '../dexie/NotesDb';
import { Note } from './../models/Note.model';

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const EditNoteComponent: React.FC = () => {
  useProtectedRoute();
  let query = useQuery();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { notes } = new NotesDb();

  const queryId = query.get('id');
  let noteId: string;

  if (queryId === null) {
    noteId = '';
    setError('No id parameter provided');
    console.error(error);
  } else noteId = queryId;

  const note = useLiveQuery(() => notes.get(noteId));

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Notes.getNotes();
      setLoading(false);
    };
    fetchData().catch((e: any) => setError(e.message));
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !note && <p>Note with given id not found</p>}
      {note && (
        <NoteForm
          onSubmit={Notes.editNote}
          title={note.title}
          content={note.content}
          id={note.id}
        />
      )}
    </div>
  );
};

export default EditNoteComponent;
