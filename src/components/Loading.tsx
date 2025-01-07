import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface LoadingProps {
  type?: 'screen' | 'component';
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ type = 'screen', color = 'white' }) => {
  const indicator = <LoadingOutlined className={`text-${color}`} spin />;

  return type === 'screen' ? (
    <div className="fixed inset-0 bg-slate-700 bg-opacity-50 flex justify-center items-center z-[9999]">
      <Spin indicator={indicator} size="large"/>
    </div>
  ) : (
    <Spin indicator={indicator} size="large" className='text-black'/>
  );
};

export default Loading;
