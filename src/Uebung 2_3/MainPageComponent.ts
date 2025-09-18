import { Component } from '@angular/core';
import { UserProfileComponent } from './UserProfileComponent'; 

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [UserProfileComponent],  
  template: `
    <div class="main-page-container">
      <h1 class="page-title">Willkommen auf der Hauptseite</h1>
      <app-user-profile
        [name]="userName"
        [description]="userDescription"
        [avatarUrl]="userAvatar"
      ></app-user-profile>
    </div>
  `,
  styles: [`
    .main-page-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
    }
    .page-title {
      font-size: 2rem;
      margin-bottom: 1.5rem;
    }
  `]
})
export class MainPageComponent {
    userName = 'Anna Beispiel';
    userDescription = 'Frontend Entwicklerin mit Schwerpunkt Angular.';
    userAvatar = 'https://via.placeholder.com/150';
}
