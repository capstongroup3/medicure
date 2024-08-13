import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  user: any;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      debugger
      this.userService.getUserProfile(userId).subscribe(
        data => {
          debugger
          this.user = data;
        },
        error => {
          console.error('Error fetching user profile', error);
        }
      );
    }
  }
}
