export type GalleryImage = {
  name: string;
  thumbnail: string;
  large: string;
};

export type GalleryCover = {
  name: string;
  thumbnail: string;
};

export type Album = {
  name: string;
  slug: string;
  folder: string;
  images?: GalleryImage[];
  covers?: GalleryCover[];
};

export type Category = {
  name: string;
  slug: string;
  albums?: Album[];
  covers?: GalleryCover[];
};