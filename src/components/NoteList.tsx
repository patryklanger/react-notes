import React, { createContext, useEffect, useState } from 'react';
// import { useSelector } from '../hooks/useSelector';
import { useAuthAction } from './../hooks/useActions';
import { Notes } from '../repository';
import NoteComponent from './NoteComponent';
import NoteForm from './NoteForm';
import { useProtectedRoute } from './../hooks/useProtectedRoute';
import { useLiveQuery } from 'dexie-react-hooks';
import NotesDb from './../dexie/NotesDb';

const { notes } = new NotesDb();

interface ContextProps {
  setLoading: (state: boolean) => void;
  setError: (error: string) => void;
}

export const InfoContext = createContext<ContextProps>({
  setLoading: () => {},
  setError: () => {},
});

const NoteList: React.FC = () => {
  useProtectedRoute();

  const data = useLiveQuery(() => notes.toArray());

  const { logoutUser } = useAuthAction();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setLoadingExternal = (state: boolean) => {
    setLoading(state);
  };
  const setErrorMessage = (error: string) => {
    setError(error);
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await Notes.getNotes();
    };
    fetchData().catch((e: any) => setError(e.message));
    setLoading(false);
  }, []);
  return (
    <InfoContext.Provider
      value={{
        setLoading: setLoadingExternal,
        setError: setErrorMessage,
      }}
    >
      <React.Fragment>
        <div>
          <NoteForm onSubmit={Notes.addNote} />

          {loading && <p>Loading...</p>}

          {data && data.map((e) => <NoteComponent key={e.id} note={e} />)}
        </div>
        <button onClick={logoutUser}>Logout</button>
      </React.Fragment>
    </InfoContext.Provider>
  );
};

export default NoteList;
