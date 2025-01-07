import React from 'react';
import Form from '../../components/Form';
import { FormField } from '../../types/components';
import { useMutation } from '@tanstack/react-query';
import { UserRegister } from '../../types/user';
import { registerUser } from '../../api/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: handleSubmit, isPending } = useMutation<
    UserRegister,
    Error,
    { email: string; username: string; password: string }
  >({
    mutationFn: async (values: { email: string; username: string; password: string }) => {
      const user = await registerUser(values.email, values.username, values.password);
      if (!user) {
        throw new Error('Register failed');
      }
      return user;
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error?.message);
    },
    onSuccess: () => {
      toast.success('Register Successfully');
      navigate('/login');
    },
  });
  const registerFields: FormField[] = [
    {
      name: 'email',
      label: 'Email',
      type: 'text',
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
    },
  ];

  const handleSubmitRegister = (formData: {
    username: string;
    email: string;
    password: string;
  }) => {
    handleSubmit(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Form
        fields={registerFields}
        onSubmit={(e) => handleSubmitRegister(e as any)}
        title="Register"
        submitLabel="Submit"
        isAuthComp={false}
        style={'w-[30%] px-5'}
        isLoading={isPending}
      />
      <Button type="text" onClick={() => navigate('/')} className="float-start mt-5">
        Back
      </Button>
    </div>
  );
};

export default RegisterPage;
