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
  deleteHandler: (id: string) => void;
}

export interface EssayCardOptionButtonProps {
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
  createEssay: (formData: FormData) => void;
}
