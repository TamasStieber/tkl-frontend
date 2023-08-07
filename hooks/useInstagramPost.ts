import { InstagramPostExtended } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const useInstagramPost = (shortcode: string) => {
  const [instagramPost, setInstagramPost] =
    useState<InstagramPostExtended | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const url = `${process.env.BACKEND_URL}/posts/post/${shortcode}`;

  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status && data.status === 'ok') {
            setInstagramPost(data.data);
          } else {
            setError(new Error(data.message));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  }, [url]);

  return { instagramPost, isLoading, error };
};

export default useInstagramPost;
