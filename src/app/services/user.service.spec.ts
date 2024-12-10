import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { User } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      website: 'johndoe.com',
      phone: '123-456-7890',
      company: { name: 'Doe Corp' },
      address: { street: '123 Main St', city: 'Anytown' },
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      website: 'janesmith.com',
      phone: '987-654-3210',
      company: { name: 'Smith Industries' },
      address: { street: '456 Elm St', city: 'Othertown' },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mock Http requests
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no pending HTTP requests after each test
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users successfully', () => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // Simulate the HTTP response
  });

  it('should handle errors when fetching users', () => {
    service.getUsers().subscribe({
      next: () => fail('expected an error, not users'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });

  it('should fetch user by ID successfully', () => {
    const userId = 1;
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      website: 'johndoe.com',
      phone: '123-456-7890',
      company: { name: 'Doe Corp' },
      address: { street: '123 Main St', city: 'Anytown' },
    };

    service.getUserById(userId).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser); // Simulate the HTTP response
  });

  it('should handle error when fetching user by ID', () => {
    const userId = 999; // Non-existing user ID

    service.getUserById(userId).subscribe({
      next: () => fail('expected an error, not a user'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(404);
      },
    });

    const req = httpMock.expectOne(`https://jsonplaceholder.typicode.com/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 404, statusText: 'Not Found' });
  });
});
