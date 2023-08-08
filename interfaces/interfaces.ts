export interface Post {
  postId: string;
  text: string;
  createdAt: string;
  photos: Photo[];
}

export interface Photo {
  photoId: string;
  url: string;
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

export interface InstagramPostExtended {
  shortcode_media: {
    id: string;
    shortcode: string;
    display_url: string;
    edge_media_to_caption: {
      edges: InstagramPostText[];
    };
    edge_sidecar_to_children: {
      edges: InstagramPostPhoto[];
    };
  };
}

export interface InstagramPostText {
  node: {
    created_at: string;
    text: string;
  };
}

export interface InstagramPostPhoto {
  node: {
    id: string;
    display_url: string;
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

export interface IBook {
  _id: string,
  title: string;
  author: string;
  description?: string
  href: string;
  photoUrl: string;
  createdAt: string
}

export interface IBookList {
  _id: string;
  title: string;
  url: string;
  description: string;
  photoUrl: string;
  isHidden: boolean;
  books: IBook[];
  createdAt: string
}