import { Post } from '@/interfaces/interfaces';
import styles from '@/styles/Home.module.css';
import PhotoGrid from './PhotoGrid';

interface PostProps {
  post: Post;
  postsLength: number;
  currentIndex: number;
}

const Post = ({ post, postsLength, currentIndex }: PostProps) => {
  const textWithoutHashtags = post.text.split('#')[0];
  const date = new Date(parseInt(post.createdAt) * 1000);
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      <div className={styles.post}>
        <PhotoGrid photos={post.photos} />
        <div className={styles.post_date}>{formattedDate}</div>
        <div className={styles.post_text}>{textWithoutHashtags}</div>
      </div>
      {currentIndex !== postsLength - 1 && (
        <hr className={styles.post_separator} />
      )}
    </>
  );
};

export default Post;
