import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.scss',
})
export class NewsListComponent implements OnInit {
  news: any[] = [];

  constructor(public newsService: NewsService, private router: Router) {}

  ngOnInit() {
    this.newsService.news$.subscribe((data: any) => {
      this.news = data.filter((n: any) => !n.archived);
    });
  }

  archive(id: number) {
    this.newsService.archive(id);
  }

  readMore(id: number) {
    this.router.navigate(['/news', id]);
  }

  handleSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.newsService.search(input.value);
  }
}
