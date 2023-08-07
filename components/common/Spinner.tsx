import { SpinnerProps } from '@/interfaces/props';
import { BounceLoader } from 'react-spinners';

const Spinner = ({ size }: SpinnerProps) => {
  return (
    <BounceLoader
      color='burlywood'
      cssOverride={{ margin: '0 auto' }}
      size={size}
    />
  );
};

export default Spinner;
