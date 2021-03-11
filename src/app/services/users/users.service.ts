import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.API_URI}/users`)
  }

  getUser(rut: string){
    return this.http.get(`${this.API_URI}/users/${rut}`)
  }

  
  findUserLogin(asdf : any){
    return this.http.post(`${this.API_URI}/users/login`, asdf);
  }

  deleteUser(rut: string){
    return this.http.delete(`${this.API_URI}/users/${rut}`)
  }

  saveUser(user: User){
    return this.http.post(`${this.API_URI}/users`, user)
  }

  updateUser(rut: string, updateUser: User): Observable<User>{
    return this.http.put(`${this.API_URI}/users/${rut}`, updateUser)
  }
}
