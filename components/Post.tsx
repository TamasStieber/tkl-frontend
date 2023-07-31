import usePosts from "@/hooks/usePosts";
import { InstagramEmbed } from "react-social-media-embed";
import styles from "../styles/Home.module.css";

const Post = () => {
  const { posts } = usePosts();

  return (
    <>
      {/* <div className={styles.post}>
        <InstagramEmbed
          url="https://www.instagram.com/p/CvPs6fBo09t/"
          width='100%'
        />
      </div>
      <div className={styles.post}>
        <InstagramEmbed
          url="https://www.instagram.com/p/CUbHfhpswxt/"
          width='100%'
        />
      </div> */}
      {posts.length > 0 &&
        posts.map((post) => (
          <div key={post._id} className={styles.post}>
            <InstagramEmbed url={post.url} width="100%" />
          </div>
        ))}
    </>
  );
};

export default Post;
