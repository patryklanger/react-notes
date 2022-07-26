import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectors } from '../state';

interface NoteFormProps {
  id?: string;
  title?: string;
  content?: string;
  onSubmit: (title: string, content: string, id?: string) => void;
}

type FormValues = {
  title: string;
  content: string;
};

const NoteForm: React.FC<NoteFormProps> = (props: NoteFormProps) => {
  const titleDefault = props.title ? props.title : '';
  const contentDefault = props.content ? props.content : '';
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: titleDefault,
      content: contentDefault,
    },
  });

  const { loading } = useSelector(selectors.noteSelectors.selectNoteState);
  const onSubmit = (data: FormValues) => {
    if (!props.id) {
      props.onSubmit(data.title, data.content);
      reset();
    } else {
      if (!loading) props.onSubmit(data.title, data.content, props.id);
      reset({
        title: data.title,
        content: data.content,
      });
      setMessage('Note eddited!');
    }
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {message && <p>{message}</p>}
      {errors.title && <p>{errors.title.message}</p>}
      <div>
        <label>Title</label>
        <input
          type="text"
          {...register('title', {
            required: 'Title for note is required',
          })}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea {...register('content')}></textarea>
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={goBack}>
        Go back
      </button>
    </form>
  );
};

export default NoteForm;
