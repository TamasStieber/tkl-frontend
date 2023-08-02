export interface Post {
  _id: string;
  url: string;
  createdAt: Date;
}

export interface PostForm {
  url: string;
}

export interface InstagramFeed {
  count: number;
  page_info: {
    has_next_page: boolean;
    end_cursor: string;
  };
  edges: InstagramPost[];
}

export interface InstagramPost {
  node: {
    id: string;
    shortcode: string;
  };
}

export interface Essay {
  _id: string;
  title: string;
  description: string;
  url: string;
  openCount: number;
  createdAt: string;
}
