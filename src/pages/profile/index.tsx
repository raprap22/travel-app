import { Alert, Flex, Typography } from 'antd';
import { UserInfo } from '../../types/user';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../../api/article';
import { Commentar } from '../../types/article';
import Loading from '../../components/Loading';
import BubbleChat from '../../components/BubbleChat';
import Card from '../../components/Card';

const ProfilePage = () => {
  const user: UserInfo = JSON.parse(localStorage.getItem('user') as string);

  const { status, data, error } = useQuery({
    queryKey: ['comments'],
    queryFn: fetchComments,
  });

  if (status === 'pending') return <Loading type="screen" />;
  if (status === 'error') return <p>Error: {error.message}</p>;

  const filteredComments = data.filter(
    (commentar: Commentar) => commentar?.user?.username === user.username
  );

  return (
    <>
      <div className="bg-[#5f839b] px-10 rounded-3xl py-5 flex flex-row justify-center items-center w-fit mb-4">
        <div className="flex flex-row items-center">
          <Typography className="!text-white text-4xl">Halo, </Typography>
          <Typography className="!text-white text-4xl font-bold">{user.username}</Typography>
        </div>
      </div>
      <Card style="flex flex-col rounded-xl w-screen-xl p-5">
        <Alert type="info" message="Your Comment at" className="w-fit mb-4" />
        <BubbleChat comments={filteredComments} />
      </Card>
    </>
  );
};

export default ProfilePage;
