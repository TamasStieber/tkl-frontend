import { ReactNode } from "react";

export interface MainWrapperProps {
  children: ReactNode;
  title: string;
}

export interface AdminWrapperProps {
    children: ReactNode;
    title: string;
}

export interface EssayCardProps {
  title: string;
  date: string;
  description: string;
}
