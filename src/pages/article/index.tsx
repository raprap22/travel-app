import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import {
  createArticle,
  createComment,
  fetchArticleById,
  fetchArticles,
  fetchCategory,
  updateArticle,
  uploadFile,
} from '../../api/article';
import Loading from '../../components/Loading';
import { Article, Category, CreateArticle } from '../../types/article';
import ArticleCard from './components/ArticleCard';
import Form from '../../components/Form';
import { FormField } from '../../types/components';
import toast from 'react-hot-toast';
import BubbleChat from '../../components/BubbleChat';

const ArticleList: React.FC = () => {
  interface Pagination {
    [x: string]: any;
    meta: {
      pagination: {
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
      };
    };
    data: Article[];
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({ key: '[user]' });
  const [filter, setFilter] = useState(0);
  const [URL, setURL] = useState('');
  const [successUpload, setSuccessUpload] = useState(false);
  const [successUploadEdit, setSuccessUploadEdit] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [openDetail, setOpenDetail] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [dataIdDetail, setDataIdDetail] = useState('');
  const [dataAddArticle, setDataAddArticle] = useState<CreateArticle>();
  const [dataEditArticle, setDataEditArticle] = useState<CreateArticle>();
  const [category, setCategory] = useState<Category[]>();
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isLoadingAddComment, setIsLoadingAddComment] = useState(false);

  const populate = '*';

  const jwt = localStorage.getItem('jwt') as string;

  const { data, isLoading } = useInfiniteQuery({
    queryKey: ['articles', currentPage, filters, populate, loadMore, isLoadingAddComment],
    queryFn: () => fetchArticles({ page: currentPage, pageSize: 10 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Pagination) => {
      const currentPage = lastPage?.meta?.pagination.page || 1;
      const totalPages = lastPage?.meta?.pagination.total || 1;

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const { mutateAsync: handleUpload, isPending: isUpload } = useMutation({
    mutationFn: (file: File) => uploadFile(file, jwt),
    onSuccess: (data) => {
      setURL(data[0].url);
      if (dataAddArticle) {
        setSuccessUpload(true);
      }
    },
    onError: (error: any) => {
      toast.error(`Error Upload : ${error.message}`);
      console.error(`Error: ${error.message}`);
    },
  });

  const { mutate: handleCreateSubmission, isPending: isSubmitting } = useMutation({
    mutationFn: (article: Omit<CreateArticle, 'id'>) => createArticle(article, URL),
    onSuccess: () => {
      toast.success('Successfully save your Article!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error?.message);
      console.error(`Error: ${error.message}`);
    },
  });

  const { mutate: handleEditSubmission, isPending: isEdit } = useMutation({
    mutationFn: (article: CreateArticle) => updateArticle(article, URL, dataIdDetail),
    onSuccess: () => {
      toast.success('Successfully save your Article!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error?.message);
      console.error(`Error: ${error.message}`);
    },
  });

  const pageSize = data?.pages[0].meta.pagination.pageSize || 0;
  const total = data?.pages[0].meta.pagination.total || 0;
  const totalData = Math.ceil(total / pageSize);

  const articleFields: FormField[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
    {
      name: 'cover_image_url',
      label: 'Cover Image',
      type: 'file',
    },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: category?.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    },
  ];

  const handleOkCreateArticle = (e: any) => {
    handleUpload(e?.cover_image_url.file);
    setDataAddArticle(e);
  };

  const handleOkEditArticle = (e: any) => {
    const updateData = e;
    delete updateData.id;
    if (e.cover_image_url !== dataEditArticle?.cover_image_url) {
      handleUpload(e?.cover_image_url.file)
        .then(() => {
          setTimeout(() => {
            handleEditSubmission(updateData);
          }, 800);
        })
        .catch((error) => {
          toast.error(`Error Upload : ${error.message}`);
          console.error(`Error: ${error.message}`);
        });
    } else {
      handleEditSubmission(updateData);
    }
  };

  useEffect(() => {
    if (successUpload) {
      handleCreateSubmission(dataAddArticle as CreateArticle);
    }
  }, [successUpload]);

  useEffect(() => {
    const fetchData = async () => {
      if (open || openDetail) {
        try {
          const response = await fetchCategory();
          const data = response;
          setCategory(data);
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      }
    };

    fetchData();
  }, [open, openDetail]);

  const handleLoadMore = () => {
    if (currentPage >= totalData) {
      setCurrentPage(currentPage - 1);
      setLoadMore(true);
    } else {
      setCurrentPage(currentPage + 1);
      setLoadMore(true);
    }
  };

  const handleDetail = async (e: any) => {
    try {
      setIsLoadingDetail(true);

      const articleDetails = await fetchArticleById(e);

      setDataIdDetail(e);
      setDataEditArticle(articleDetails);
      setOpenDetail(true);
    } catch (error) {
      console.error('Error fetching article details:', error);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const filteredArticleSpecify =
    data?.pages[0].data.filter((article: Article) => article?.documentId === dataIdDetail) || [];

  const commentar = filteredArticleSpecify[0]?.comments || [];

  const handleComment = (e: any) => {
    setDataIdDetail(e);
    setOpenComment(true);
  };

  const handleAddComment = async (e: any) => {
    try {
      setIsLoadingAddComment(true);

      await createComment(e);
    } catch (error) {
      console.error('Error fetching article details:', error);
    } finally {
      setIsLoadingAddComment(false);
    }
  };

  return (
    <>
      <div className="flex fex-col justify-between items-center">
        <Button
          className="text-white py-3 rounded-md shadow-md md:w-[20%] w-full "
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          size="large"
        >
          Tambah Article
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading || data === undefined || isUpload || isSubmitting || isLoadingDetail ? (
          <Loading type="screen" />
        ) : (
          data.pages[0].data.map((article: Article) => (
            <ArticleCard
              key={article?.id}
              article={article}
              onDetail={(e) => handleDetail(e)}
              onComment={(e) => handleComment(e)}
            />
          ))
        )}
      </div>
      <div className="justify-center my-5 w-full flex flex-row">
        <Button onClick={() => handleLoadMore()} type="primary" size="large" className="mx-0">
          {currentPage >= totalData ? 'Back' : 'Load More'}
        </Button>
      </div>

      {/* Modal */}

      <Modal
        title="Tambah Artikel"
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <Form
          fields={articleFields}
          onSubmit={(e) => handleOkCreateArticle(e as CreateArticle)}
          submitLabel="Tambah"
          isAuthComp={false}
          isLoading={isSubmitting}
          noBg={true}
          insideModal={true}
        />
      </Modal>
      <Modal
        title="Edit Artikel"
        open={openDetail}
        onCancel={() => {
          window.location.reload();
        }}
        footer={false}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <Form
          fields={articleFields}
          isEdit
          initialData={dataEditArticle}
          onSubmit={(e) => handleOkEditArticle(e as CreateArticle)}
          submitLabel="Simpan"
          isAuthComp={false}
          isLoading={isEdit}
          noBg={true}
          insideModal={true}
        />
      </Modal>
      <Modal
        title="Commentar"
        open={openComment}
        onCancel={() => {
          window.location.reload();
        }}
        footer={false}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <BubbleChat
          comments={commentar}
          isDetail={true}
          idArticle={dataIdDetail}
          onAddComment={(e) => {
            handleAddComment(e);
          }}
          isLoading={isLoadingAddComment}
        />
      </Modal>
    </>
  );
};

export default ArticleList;
