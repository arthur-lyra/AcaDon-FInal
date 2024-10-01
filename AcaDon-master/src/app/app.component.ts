import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showToolbar: boolean = false; // Inicialmente false
  title = 'AcaDon';
  papelUsuario: string | null = null;

  constructor(
    private router: Router,
    private readonly authService: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showToolbar = !(
          this.router.url === '/login' || this.router.url === '/register'
        );
      }
    });
  }

  ngOnInit() {
    const uid = localStorage.getItem('token');
    if (uid) {
      this.authService.getUsuario().subscribe((usuario) => {
        this.papelUsuario = usuario.papel; 
        this.showToolbar = true; 
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.papelUsuario = null;
    this.router.navigate(['/login']);
  }
}
