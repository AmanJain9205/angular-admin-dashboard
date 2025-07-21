import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserDetail } from '../features/users/interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  private usersSubject = new BehaviorSubject<IUserDetail[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@site.com', role: 'user' },
    { id: 3, name: 'Alice Johnson', email: 'alice@company.com', role: 'user' },
    { id: 4, name: 'Bob Brown', email: 'bob@domain.com', role: 'guest' },
    { id: 5, name: 'Charlie Black', email: 'charlie@web.com', role: 'admin' },
    { id: 6, name: 'Diana White', email: 'diana@service.com', role: 'guest' },
    { id: 7, name: 'Eve Green', email: 'eve@green.com', role: 'user' },
    { id: 8, name: 'Frank Blue', email: 'frank@blue.com', role: 'user' }
  ]);
  users$ = this.usersSubject.asObservable();

  public editUser(updatedUser: IUserDetail) {
    const users = this.usersSubject.value.map(user =>
      user.id === updatedUser.id ? { ...updatedUser } : user
    );
    this.usersSubject.next(users);
  }

  public deleteUser(id: number) {
    const users = this.usersSubject.value.filter(user => user.id !== id);
    this.usersSubject.next(users);
  }
}
