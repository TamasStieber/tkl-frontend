export interface Post {
  _id: string;
  url: string;
  createdAt: Date;
}

export interface PostForm {
  url: string;
}
