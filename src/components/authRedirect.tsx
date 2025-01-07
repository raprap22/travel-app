import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthRedirect: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tokenJWT = localStorage.getItem('jwt');

    if (!tokenJWT) {
      switch (location.pathname) {
        case '/':
        case '/auth/login':
        case '/auth/register':
          break;
        default:
          navigate('/');
          break;
      }
    } else if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [navigate, location]);

  return null;
};

export default AuthRedirect;
