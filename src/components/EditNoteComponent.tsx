import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNotesActions } from '../hooks/useActions';
import { useSelector } from './../hooks/useSelector';
import NoteForm from './NoteForm';
import { useProtectedRoute } from './../hooks/useProtectedRoute';

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

const EditNoteComponent: React.FC = () => {
  useProtectedRoute();
  let query = useQuery();
  const { fetchNotes, editNote } = useNotesActions();
  const note = useSelector((state) =>
    state.notes.data.find((note) => note.id === query.get('id'))
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {note && (
        <NoteForm
          onSubmit={editNote}
          title={note.title}
          content={note.content}
          id={note.id}
        />
      )}
    </div>
  );
};

export default EditNoteComponent;
