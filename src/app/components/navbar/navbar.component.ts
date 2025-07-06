import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'], // ✅ بدل styleUrl
})
export class NavbarComponent {
  toggleDarkMode() {
    const html = document.querySelector('html');
    html?.classList.toggle('dark-mode');
  }
}
