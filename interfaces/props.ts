import { ReactNode } from 'react';
import { Essay } from './interfaces';
import { IconType } from 'react-icons';

export interface MainWrapperProps {
  children: ReactNode;
  title: string;
}

export interface AdminWrapperProps {
  children: ReactNode;
  title: string;
}

export interface EssayCardProps {
  essay: Essay;
  updateHandler: (id: string) => void;
}

export interface AdminEssayCardProps {
  essay: Essay;
  deleteHandler: (id: string) => void;
}

export interface AdminEssayCardOptionButtonProps {
  icon: IconType;
  hoverColor: string;
  onClick?: () => void;
}

export interface DeleteEssayModalProps {
  essay: Essay;
  isOpen: boolean;
  closeModal: () => void;
  deleteHandler: (id: string) => void;
}

export interface EssayModalProps {
  isOpen: boolean;
  closeModal: () => void;
  createEssay: (formData: FormData) => Promise<boolean>;
  isCreating: boolean;
}

export interface SpinnerProps {
  size?: number;
}
