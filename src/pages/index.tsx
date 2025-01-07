import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/bg-landing-page.jpg',
      }}
    >
      <div className="text-center max-w-xs sm:max-w-screen-xl">
        <Title className="!text-white !text-4xl !mb-8 sm:!text-8xl">Easy to Travel</Title>
        <Paragraph className="text-lg text-white !mb-10">
          Discover amazing information you need.
        </Paragraph>
        <Button
          type="primary"
          className="!text-right !px-16 py-5 font-bold border-none"
          shape="round"
          onClick={() => navigate('/auth/login')}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
