import type {FC} from 'react';
import LogoIcon from '../../assets/icons/logo.svg?react';
import './LoadingSpinner.css';

const LoadingSpinner: FC = () => {
  return (
    <div className="h-dvh flex items-center justify-center">
      <LogoIcon className="loading-spinner-logo h-20 w-20" />
    </div>
  );
};

export default LoadingSpinner;
