import React, { useEffect } from 'react';
import { useSelector } from '../hooks/useSelector';
import { useAuthAction, useNotesActions } from './../hooks/useActions';
import NoteComponent from './NoteComponent';
import { selectors } from '../state';
import NoteForm from './NoteForm';
import { useProtectedRoute } from './../hooks/useProtectedRoute';

const NoteList: React.FC = () => {
  useProtectedRoute();
  const { data, loading } = useSelector(
    selectors.noteSelectors.selectNoteState
  );
  const { addNote, fetchNotes } = useNotesActions();
  const { logoutUser } = useAuthAction();

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <React.Fragment>
      <div>
        <NoteForm onSubmit={addNote} />

        {loading && <p>Loading...</p>}

        {data.map((e) => (
          <NoteComponent key={e.id} note={e} />
        ))}
      </div>
      <button onClick={logoutUser}>Logout</button>
    </React.Fragment>
  );
};

export default NoteList;
