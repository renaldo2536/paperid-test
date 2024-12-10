import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../../services/user.service';

class ActivatedRouteStub {
  snapshot = { paramMap: new Map([['userId', '1']]) }; // Mock userId as '1'
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: UserService;

  // Mock user data
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    website: 'johndoe.com',
    phone: '123-456-7890',
    company: { name: 'Doe Corp' },
    address: { street: '123 Main St', city: 'Anytown' },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent, HttpClientTestingModule], 
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }, 
        {
          provide: UserService,
          useValue: {
            getUserById: () => of(mockUser), 
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService); 
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the user details based on the route parameter', () => {
    expect(component.user).toEqual(mockUser);
  });
});
