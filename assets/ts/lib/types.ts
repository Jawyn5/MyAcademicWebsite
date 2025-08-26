export type Permalink = string;

export interface PageData {
  permalink: Permalink;
  title: string;
  section: string;
}

export interface PageGraph {
  in: Permalink[];
  out: Permalink[];
}

export interface GraphData {
  pages: Record<Permalink, PageData>;
  graph: Record<Permalink, PageGraph>;
}