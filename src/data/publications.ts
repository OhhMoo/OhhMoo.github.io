export type Publication = {
  title: string;
  journal: string;
  year: number;
  authors: string;
  links: { label: string; href: string }[];
};

export const publications: Publication[] = [];
