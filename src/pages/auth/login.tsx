import { useMutation } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { UserLogin } from '../../types/user';
import { loginUser } from '../../api/auth';
import { FormField } from '../../types/components';
import Form from '../../components/Form';

const LoginPage: React.FC = () => {
  const { mutate: handleLogin, isPending } = useMutation<
    UserLogin,
    Error,
    { identifier: string; password: string }
  >({
    mutationFn: async (values: { identifier: string; password: string }) => {
      const user = await loginUser(values.identifier, values.password);
      if (!user) {
        throw new Error('Login failed');
      } else {
        localStorage.setItem('user', JSON.stringify(user.user));
        localStorage.setItem('jwt', JSON.stringify(user.jwt));
      }
      return user;
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error?.message);
    },
    onSuccess: () => {
      toast.success('Login Successfully');
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    },
  });

  const handleSubmit = (formData: { identifier: string; password: string }) => {
    handleLogin(formData);
  };

  const loginFields: FormField[] = [
    {
      name: 'identifier',
      label: 'Email',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen">
      <Form
        fields={loginFields}
        onSubmit={(e) => handleSubmit(e as any)}
        title="Login"
        submitLabel="Login"
        isAuthComp={true}
        // eslint-disable-next-line
        style="w-[30%]"
        isLoading={isPending}
      />
    </div>
  );
};

export default LoginPage;
