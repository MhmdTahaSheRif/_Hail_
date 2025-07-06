import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-news',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss'],
})
export class AddNewsComponent implements OnInit {
  form!: FormGroup;
  imagePreview: string = '';

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content: ['', Validators.required],
      tags: [''],
      publishDate: ['', Validators.required],
      image: [null], // Image field
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.form.patchValue({ image: this.imagePreview });
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.valid) {
      const { title, summary, content, tags, publishDate, image } =
        this.form.value;

      this.newsService.add({
        id: 0,
        title,
        summary,
        content,
        publishDate,
        tags: (tags as string)?.split(',').map((tag) => tag.trim()) || [],
        archived: false,
        imageUrl: image || '',
      });

      this.router.navigate(['/']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
