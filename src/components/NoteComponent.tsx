import { Note } from '../models/Note.model';
import { useNotesActions } from './../hooks/useActions';
import { useNavigate } from 'react-router-dom';

const NoteComponent: React.FC<{ note: Note }> = (props: { note: Note }) => {
  const navigate = useNavigate();
  const note: Note = props.note;
  const editParams = new URLSearchParams();
  if (note.id) editParams.append('id', note.id);
  const { deleteNote } = useNotesActions();

  const onClick = () => {
    if (note.id) deleteNote(note.id);
  };

  return (
    <div>
      <div>
        <p>
          <b>Id:</b> <span>{note.id}</span>
        </p>
      </div>
      <div>
        <p>
          <b>Title:</b> <span>{note.title}</span>
        </p>
      </div>
      <div>
        <p>
          <b>Content:</b> <span>{note.content}</span>
        </p>
      </div>
      <div>
        <p>
          <b>Creation Date:</b> <span>{note.creationDate}</span>
        </p>
      </div>
      <button onClick={onClick}>Delete</button>
      {note.id && (
        <button onClick={() => navigate('/edit?' + editParams.toString())}>
          Edit
        </button>
      )}
    </div>
  );
};

export default NoteComponent;
