import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthAction } from '../hooks/useActions';
import { useSelector } from './../hooks/useSelector';
import { selectAuthState } from './../state/selectors/authSelectors';
import { useNavigate } from 'react-router-dom';
import { useProtectedRoute } from './../hooks/useProtectedRoute';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { loginUser } = useAuthAction();

  const navigate = useNavigate();

  const { user } = useSelector(selectAuthState);
  useProtectedRoute();
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    loginUser(data.email, data.password);
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.email && <p>{errors.email?.message}</p>}
        {errors.password && <p>{errors.password?.message}</p>}
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
            })}
          />
        </div>
        <button type="submit">Login</button>
        <button
          type="button"
          onClick={() => {
            navigate('/signup');
          }}
        >
          Register
        </button>
      </form>
    </React.Fragment>
  );
};

export default Login;
