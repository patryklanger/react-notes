import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseAuth } from '../services/auth';
import { useAuthAction } from './useActions';

export const useProtectedRoute = () => {
  const navigate = useNavigate();
  const { checkIfUserLogged } = useAuthAction();
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(function (user) {
      if (
        !user &&
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/signup'
      ) {
        console.error(
          'Access to protected route denied, redirecting to login...'
        );
        navigate('/login');
      } else {
        checkIfUserLogged();
      }
    });
  }, [navigate]);
};
