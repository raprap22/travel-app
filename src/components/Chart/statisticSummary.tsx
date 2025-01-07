import React from 'react';
import Card from '../Card';
import { CommentOutlined, FileDoneOutlined, ProductOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Loading from '../Loading';

interface DashboardProps {
  totalArticles: number;
  totalComments: number;
  totalCategories: number;
  isLoading: boolean;
}

const StatisticSummary: React.FC<DashboardProps> = ({
  totalArticles,
  totalComments,
  totalCategories,
  isLoading,
}) => {
  return (
    <Card style="bg-primary p-6 w-full mx-auto text-white border-none rounded-2xl">
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex flex-col text-white text-center md:text-start">
          <h3 className="text-lg font-bold">Statistic</h3>
          <p className="text-sm">Summary for travelling information</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center md:justify-end flex-1">
          <Card style="rounded-2xl bg-[#5f839b] md:text-start text-center opacity-1 text-white border-none flex-1 md:flex-row md:w-[30%] p-4">
            {isLoading || totalArticles === 0 || totalCategories === 0 || totalComments === 0 ? (
              <Loading type="component" />
            ) : (
              <>
                <div className="font-medium text-xl flex flex-row justify-center md:justify-between mb-5">
                  <h4 className="font-bold">Articles</h4>
                  <FileDoneOutlined className="hidden md:block" />
                </div>
                <div className="flex flex-col md:flex-row items-center md:justify-start justify-start">
                  <p className="text-2xl font-bold mr-0 md:mr-4 px-4 py-2 bg-white text-primary rounded-xl">
                    {totalArticles}
                  </p>
                  <p> {dayjs().format('MMMM YYYY')}</p>
                </div>
              </>
            )}
          </Card>

          <Card style="rounded-2xl bg-[#5f839b] md:text-start text-center opacity-1 text-white border-none flex-1 md:flex-row md:w-[30%] p-4">
            {isLoading || totalArticles === 0 || totalCategories === 0 || totalComments === 0 ? (
              <Loading type="component" />
            ) : (
              <>
                <div className="font-medium text-xl flex flex-row justify-center md:justify-between mb-5">
                  <h4 className="font-bold">Comments</h4>
                  <CommentOutlined className="hidden md:block" />
                </div>
                <div className="flex flex-col md:flex-row items-center md:justify-start justify-start">
                  <p className="text-2xl font-bold mr-0 md:mr-4 px-4 py-2 bg-white text-primary rounded-xl">
                    {totalComments}
                  </p>
                  <p> {dayjs().format('MMMM YYYY')}</p>
                </div>
              </>
            )}
          </Card>

          <Card style="rounded-2xl bg-[#5f839b] md:text-start text-center opacity-1 text-white border-none flex-1 md:flex-row md:w-[30%] p-4">
            {isLoading || totalArticles === 0 || totalCategories === 0 || totalComments === 0 ? (
              <Loading type="component" />
            ) : (
              <>
                <div className="font-medium text-xl flex flex-row justify-center md:justify-between mb-5">
                  <h4 className="font-bold">Categories</h4>
                  <ProductOutlined className="hidden md:block" />
                </div>
                <div className="flex flex-col md:flex-row items-center md:justify-start justify-start">
                  <p className="text-2xl font-bold mr-0 md:mr-4 px-4 py-2 bg-white text-primary rounded-xl">
                    {totalCategories}
                  </p>
                  <p> {dayjs().format('MMMM YYYY')}</p>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default StatisticSummary;
