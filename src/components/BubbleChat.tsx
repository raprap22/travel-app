import React, { useState } from 'react';
import { Alert, Button, Input, Typography } from 'antd';
import Card from './Card';
import { AddCommentar, Commentar } from '../types/article';
import { SendOutlined } from '@ant-design/icons';
import Loading from './Loading';

interface BubbleChatProps {
  comments: Commentar[];
  isDetail?: boolean;
  isLoading?: boolean;
  idArticle?: string;
  onAddComment?: (comment: AddCommentar) => void;
}

const BubbleChat: React.FC<BubbleChatProps> = ({
  comments,
  isDetail = false,
  isLoading = false,
  idArticle = '',
  onAddComment,
}) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) {
      return;
    }

    const comment: AddCommentar = {
      content: newComment,
      article: idArticle,
    };

    if (onAddComment) {
      onAddComment(comment);
    }

    setNewComment('');
  };
  return (
    <>
      <div className="mt-5 bg-gray-300 flex flex-col gap-4 overflow-y-auto h-[500px] p-5 rounded-lg border-none">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loading type="component" />
          </div>
        ) : comments.length === 0 ? (
          <Alert type="warning" message="You have not commented yet" />
        ) : (
          comments.map((comment: Commentar, index: number) => (
            <div
              key={comment.id}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`relative bg-white shadow-md rounded-full p-7 max-w-xs ${
                  index % 2 === 0 ? 'rounded-bl-none' : 'rounded-br-none'
                }`}
              >
                <Typography className="text-black text-lg font-bold mb-2">
                  {comment.content}
                </Typography>
                <div className="text-xs text-gray-500 text-right">
                  {new Date(comment.publishedAt).toISOString().split('T')[0]}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {isDetail && (
        <div className="mt-5 flex gap-2">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isLoading}
          />
          <Button
            type="primary"
            onClick={handleAddComment}
            className="shadow-none border-none"
            loading={isLoading}
            disabled={isLoading}
          >
            <SendOutlined />
          </Button>
        </div>
      )}
    </>
  );
};

export default BubbleChat;
