import Card from '../../components/Card';
import { useQuery } from '@tanstack/react-query';
import { Article } from '../../types/article';
import { fetchArticles } from '../../api/article';
import { useEffect, useState } from 'react';
import Chart from '../../components/Chart';
import {
  formatChartDataByCategory,
  formatChartDataByPublishedDate,
} from '../../components/Chart/utils';
import Loading from '../../components/Loading';
import dayjs from 'dayjs';
import StatisticSummary from '../../components/Chart/statisticSummary';

const DashboardPage: React.FC = () => {
  const { page, pageSize, filters, populate } = {
    page: 1,
    pageSize: 10,
    filters: {},
    populate: '*',
  };

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ['articles', page, pageSize, filters, populate],
    queryFn: () => fetchArticles({ page: 0, pageSize: 0 }),
  });

  const filterData = (data: Article[]) => {
    const dataFilter = Array.isArray(data);
    const totalArticlesThisMonth = dataFilter
      ? data.filter((article) => dayjs(article.publishedAt).isSame(dayjs(), 'month')).length
      : 0;

    const totalCommentsThisMonth = dataFilter
      ? data
          .filter((article) => dayjs(article.publishedAt).isSame(dayjs(), 'month'))
          .reduce((acc, article) => acc + article.comments.length, 0)
      : 0;

    const totalCategories = dataFilter
      ? new Set(data.map((article: Article) => article?.category?.name)).size
      : 0;

    return {
      totalArticlesThisMonth,
      totalCommentsThisMonth,
      totalCategories,
    };
  };

  const { totalArticlesThisMonth, totalCommentsThisMonth, totalCategories } = filterData(
    articles || []
  );

  const [chartDataByCategory, setChartDataByCategory] = useState<{
    labels: string[];
    values: number[];
  }>({
    labels: [],
    values: [],
  });
  const [chartDataByPublishDate, setChartDataByPublishDate] = useState<{
    labels: string[];
    values: number[];
  }>({
    labels: [],
    values: [],
  });

  useEffect(() => {
    if (articles.length > 0) {
      const dataByCategory = formatChartDataByCategory(articles);
      const dataByPublishDate = formatChartDataByPublishedDate(articles);

      setChartDataByCategory(dataByCategory);
      setChartDataByPublishDate(dataByPublishDate);
    }
  }, [articles]);
  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-5 lg:px-">
      <div className="flex flex-wrap gap-5 justify-center md:justify-between">
        <StatisticSummary
          totalArticles={totalArticlesThisMonth}
          totalCategories={totalCategories}
          totalComments={totalCommentsThisMonth}
          isLoading={isLoading}
        />
        <Card style="bg-white rounded-2xl p-4 border-none w-full sm:w-[48%] h-auto md:h-[90%]">
          {isLoading || chartDataByCategory.labels.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <Loading type="component" color="primary" />
            </div>
          ) : (
            <Chart
              data={chartDataByCategory}
              titleChart="Summary Artikel per Category"
              type="doughnut"
            />
          )}
        </Card>

        <Card style="bg-white rounded-2xl p-4 border-none w-full sm:w-[48%] h-auto md:h-[90%]">
          {isLoading || chartDataByPublishDate.labels.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <Loading type="component" color="primary" />
            </div>
          ) : (
            <Chart
              data={chartDataByPublishDate}
              titleChart="Summary Komentar per Day"
              type="line"
              legend={false}
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
