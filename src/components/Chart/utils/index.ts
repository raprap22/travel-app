import { Article } from '../../../types/article';

export const formatChartDataByCategory = (articles: Article[]) => {
  const categoryCount = Array.isArray(articles)
    ? articles.reduce((acc, article) => {
        const category = article.category?.name || 'Uncategorized';
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : {};

  const labels = Object.keys(categoryCount);
  const values = Object.values(categoryCount);

  return { labels, values };
};

export const formatChartDataByPublishedDate = (articles: Article[]) => {
  const dateCount = Array.isArray(articles)
    ? articles.reduce((acc, article) => {
        const date = new Date(article.publishedAt).toISOString().split('T')[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : {};

  const labels = Object.keys(dateCount).sort();
  const values = labels.map((date) => dateCount[date]);

  return { labels, values };
};
