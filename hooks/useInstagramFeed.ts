import { InstagramFeed, Post } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';

const useInstagramFeed = () => {
  const [instagramPosts, setInstagramPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const url = `${process.env.BACKEND_URL}/posts/`;

  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setInstagramPosts(data);
          // if (data.status && data.status === 'ok') {
          //   const user: InstagramFeed =
          //     data.data.user.edge_owner_to_timeline_media;
          //   setHasNextPage(user.page_info.has_next_page);
          //   setEndCursor(user.page_info.end_cursor);
          //   setInstagramPosts(user.edges);
          // } else {
          //   setError(new Error(data.message));
          // }
        });
    } catch (error) {
      setError(error as Error);
    }
  }, [url]);

  const loadMore = () => {
    try {
      fetch(url + `/${endCursor}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.status && data.status === 'ok') {
            const profile: InstagramFeed =
              data.data.user.edge_owner_to_timeline_media;
            setHasNextPage(profile.page_info.has_next_page);
            setEndCursor(profile.page_info.end_cursor);
            // setInstagramPosts([...instagramPosts, ...profile.edges]);
          } else {
            setError(new Error(data.message));
          }
        });
    } catch (error) {
      setError(error as Error);
    }
  };

  return { instagramPosts, hasNextPage, endCursor, loadMore, error };
};

export default useInstagramFeed;
