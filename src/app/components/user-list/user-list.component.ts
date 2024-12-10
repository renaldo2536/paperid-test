import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  standalone: true,  // Standalone component setup
  imports: [CommonModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  hasError = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.hasError = false;

    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      },
    });
  }

  retry(): void {
    this.fetchUsers();
  }


  viewDetails(userId: number): void {
    this.router.navigate(['/user-details', userId]);
  }
}
