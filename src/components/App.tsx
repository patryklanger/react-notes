import { Provider } from 'react-redux';
import { store } from './../state/store';
import NoteList from './NoteList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditNoteComponent from './EditNoteComponent';
import SignUp from './SignUp';
import Login from './Login';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="/edit" element={<EditNoteComponent />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
