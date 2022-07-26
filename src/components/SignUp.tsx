import { useForm } from 'react-hook-form';
import { useAuthAction } from '../hooks/useActions';
import { useProtectedRoute } from './../hooks/useProtectedRoute';
import { useSelector } from './../hooks/useSelector';
import { selectors } from '../state';

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

const SignUp: React.FC = () => {
  const { createUser } = useAuthAction();
  const { error } = useSelector(selectors.authSelectors.selectAuthState);

  useProtectedRoute();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({});

  var password = watch('password', '');

  const onSubmit = (data: FormValues) => {
    createUser(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p>{error}</p>}
      {errors.email && <p>{errors.email?.message}</p>}
      {errors.password && <p>{errors.password?.message}</p>}
      {errors.passwordConfirm && <p>{errors.passwordConfirm?.message}</p>}
      <div>
        <label>Email address</label>
        <input
          type="email"
          {...register('email', {
            required: 'The email is required',
            pattern: {
              value: /.+@.+/,
              message: 'You must provide valid email address',
            },
          })}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          {...register('password', {
            required: 'The password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />
      </div>
      <div>
        <label>Confirm Password</label>{' '}
        <input
          type="password"
          {...register('passwordConfirm', {
            required: true,
            validate: (value) =>
              value === password || 'The passwords do not match',
          })}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
