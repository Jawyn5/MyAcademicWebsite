import type { PageData, Permalink } from './types';

export default class Page {
  public readonly permalink: Permalink;
  public readonly title: string;
  public readonly section: string;

  constructor(data: PageData) {
    this.permalink = data.permalink;
    this.title = data.title;
    this.section = data.section;
  }

  get id(): Permalink {
    return this.permalink;
  }
}