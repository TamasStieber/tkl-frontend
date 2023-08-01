import { InstagramEmbed } from 'react-social-media-embed';
import styles from '../styles/Home.module.css';
import useInstagramFeed from '@/hooks/useInstagramFeed';

const Posts = () => {
  const { instagramPosts, hasNextPage, loadMore, error } = useInstagramFeed();

  if (error) return <p>{error.message}</p>;

  return (
    <>
      {instagramPosts.length > 0 &&
        instagramPosts.map((post) => (
          <div key={post.node.id} className={styles.post}>
            <InstagramEmbed
              url={`https://www.instagram.com/p/${post.node.shortcode}/`}
              width='100%'
            />
          </div>
        ))}
      {hasNextPage && <button onClick={loadMore}>Show more</button>}
    </>
  );
};

export default Posts;
