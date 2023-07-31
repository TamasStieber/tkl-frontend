import { Post, PostForm } from '@/interfaces/interfaces';
// import { checkAuth } from '@/utils/utils';
import { useState, useEffect } from 'react';

const usePosts = (userId?: string) => {
//   const token = checkAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [isUpdating, setUpdating] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [error, setError] = useState<Error | null>(null);
//   const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`${process.env.BACKEND_URL}/posts/`, {
      }).then((response) =>
        response.json().then((data) => {
          if (data.error) {
          } else setPosts(data.allPosts);
        })
      );
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = (post: PostForm) => {
    console.log(JSON.stringify(post));
    
    setCreating(true);
    try {
      fetch(`${process.env.BACKEND_URL}/posts`, {
        method: 'post',
        headers: {
            'Content-type': 'application/json',
          },
        body: JSON.stringify(post),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error as Error);
          }
        });
    } catch (error) {
      setError(error as Error);
    } finally {
      setCreating(false);
    }
  };

  const updatePost = (post: Post) => {
  };

  const deletePost = () => {};


  return {
    posts,
    isLoading,
    error,
    isUpdating,
    isCreating,
    createPost,
    updatePost,
    deletePost,
  };
};

export default usePosts;
