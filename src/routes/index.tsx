import LandingPage from '../pages';
import ArticleList from '../pages/article';
import LoginPage from '../pages/auth/login';
import RegisterPage from '../pages/auth/register';
import DashboardPage from '../pages/dashboard';
import ProfilePage from '../pages/profile';

export const routes = [
  {
    path: '/',
    label: 'landing_page',
    element: <LandingPage />,
    type: 'noAuth',
  },
  {
    path: '/auth/login',
    label: 'login',
    element: <LoginPage />,
    type: 'noAuth',
  },
  {
    path: '/auth/register',
    label: 'register',
    element: <RegisterPage />,
    type: 'noAuth',
  },
  {
    path: '/dashboard',
    label: 'dashboard',
    element: <DashboardPage />,
    type: 'auth',
  },
  {
    path: '/article',
    label: 'article',
    element: <ArticleList />,
    type: 'auth',
  },
  {
    path: '/profile',
    label: 'profile',
    element: <ProfilePage />,
    type: 'auth',
  },
];
