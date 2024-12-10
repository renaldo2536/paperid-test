import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { Location } from '@angular/common'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  standalone: true,  
  imports: [CommonModule],
})
export class UserDetailsComponent implements OnInit {
  user?: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private location: Location) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    
    if (!userId) {
      console.error('Invalid user ID');
      return;
    }

    this.userService.getUserById(userId).subscribe({
      next: (data) => (this.user = data),
      error: (err) => console.error('Failed to load user details', err),
    });
  }

   goBack(): void {
    this.location.back(); // This will take the user to the previous page
  }
}
