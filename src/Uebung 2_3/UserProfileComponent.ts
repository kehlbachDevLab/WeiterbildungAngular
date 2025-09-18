import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile', 
  standalone: true,            
  template: `
    <div class="user-profile">
      <img 
        src="https://via.placeholder.com/150" 
        alt="Benutzerbild" 
        class="avatar" 
      />
      <h2 class="name">{{name}}</h2>
      <p class="description">{{description}}</p>
    </div>
  `,
  styles: [`
    .user-profile {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #ccc;
      padding: 1rem;
      border-radius: 8px;
      max-width: 300px;
    }
    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-bottom: 1rem;
      object-fit: cover;
    }
    .name {
      margin: 0;
    }
    .description {
      text-align: center;
      font-size: 0.9rem;
      color: #555;
    }
  `]
})
export class UserProfileComponent {
  @Input() name = '';          // имя
  @Input() description = '';   // описание
  @Input() avatarUrl = '';     // аватар
}
