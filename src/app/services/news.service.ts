import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  tags: string[];
  publishDate: string;
  archived: boolean;
  imageUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private newsData: News[] = [
    {
      id: 1,
      title: 'New Terminal Opened',
      summary: 'Cluster2 Airports new',
      content: 'Full content of the article goes here.',
      tags: ['terminal', 'expansion'],
      publishDate: '2025-07-01',
      archived: false,
    },
  ];

  private newsSubject = new BehaviorSubject<News[]>(this.newsData);
  news$ = this.newsSubject.asObservable();

  getNewsById(id: number): News | undefined {
    return this.newsData.find((n) => n.id === id);
  }

  add(news: News) {
    news.id = this.newsData.length + 1;
    this.newsData.push(news);
    this.newsSubject.next(this.newsData);
  }

  archive(id: number) {
    const news = this.newsData.find((n) => n.id === id);
    if (news) news.archived = true;
    this.newsSubject.next(this.newsData);
  }

  search(term: string) {
    const filtered = this.newsData.filter((n) =>
      (n.title + n.content).toLowerCase().includes(term.toLowerCase())
    );
    this.newsSubject.next(filtered);
  }
}
