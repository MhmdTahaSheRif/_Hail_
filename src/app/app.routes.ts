import { Routes } from '@angular/router';
import { NewsListComponent } from '../app/components/news-list/news-list.component';
import { NewsDetailComponent } from '../app/components/news-detail/news-detail.component';
import { AddNewsComponent } from '../app/components/add-news/add-news.component';

export const routes: Routes = [
  { path: '', component: NewsListComponent },
  { path: 'news/:id', component: NewsDetailComponent },
  { path: 'add', component: AddNewsComponent },
  { path: '**', redirectTo: '' },
];
