import Posts from '@/components/public/Posts';
import PublicWrapper from '@/components/public/PublicWrapper';

export default function Home() {
  return (
    <PublicWrapper title='Home'>
      <Posts />
    </PublicWrapper>
  );
}
