import React from 'react';
import { Typography, Image, Button, Alert, Menu, Dropdown } from 'antd';
import { ArrowRightOutlined, DownOutlined, PictureFilled } from '@ant-design/icons';
import { Article } from '../../../types/article';

interface ArticleCardProps {
  article: Article;
  onDetail: (id: string) => void;
  onComment: (id: string) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onDetail, onComment }) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => onDetail(article.documentId)}>
        Detail <ArrowRightOutlined />
      </Menu.Item>
      <Menu.Item key="1" onClick={() => onComment(article.documentId)}>
        Comments <ArrowRightOutlined />
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="hover:shadow-md rounded-xl overflow-hidden bg-white mt-5 cursor-pointer">
      <div className="flex flex-col justify-between">
        {article?.cover_image_url === '' ? (
          <div className="flex justify-center items-center py-28">
            <PictureFilled className="text-9xl" />
          </div>
        ) : (
          <Image
            src={article?.cover_image_url}
            alt={article?.title}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        )}
        <div className="py-3 md:py-4 h-full p-4">
          <Typography.Title level={4} className="mb-2">
            {article?.title}
          </Typography.Title>
          <Typography.Text className="text-gray-500 mb-4 block">
            {article?.description}
          </Typography.Text>
          <div className="flex flex-col gap-5 md:flex-row w-full justify-between items-center">
            <div className="flex flex-col">
              <Typography.Text className="text-sm text-primary flex flex-row items-center">
                Category:{' '}
                <Alert
                  message={article?.category?.name ? article?.category?.name : 'Uncategorized'}
                  type={article?.category?.name ? 'info' : 'error'}
                  className="ml-4 py-0"
                />
              </Typography.Text>
              <Typography.Text className="text-sm text-gray-400 mt-4">
                Published: {new Date(article?.publishedAt).toLocaleDateString()}
              </Typography.Text>
            </div>
            <Dropdown overlay={menu} trigger={['click']} className="w-full">
              <Button
                shape="round"
                className="bg-green-500 border-none hover:!bg-green-400 text-white hover:!text-white md:w-[40%] w-full flex justify-between items-center"
              >
                Options <DownOutlined />
              </Button>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
