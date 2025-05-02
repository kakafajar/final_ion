import { Injectable } from '@angular/core';
import { User } from '../models/user.model'; // pastikan ini benar

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  register(user: User): boolean {
    const users = this.getAllUsers();

    const exists = users.some(u => u.email === user.email || u.phone === user.phone);
    if (exists) {
      return false; // Sudah terdaftar
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(identifier: string, password: string): boolean {
    const users = this.getAllUsers();

    const foundUser = users.find(u =>
      (u.email === identifier || u.phone === identifier) && u.password === password
    );

    if (foundUser) {
      this.currentUser = foundUser;
      localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
      return true;
    }

    return false;
  }

  getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser;

    const stored = localStorage.getItem('loggedInUser');
    return stored ? JSON.parse(stored) : null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('loggedInUser');
  }

  private getAllUsers(): User[] {
    const data = localStorage.getItem('users');
    return data ? JSON.parse(data) : [];
  }
}
