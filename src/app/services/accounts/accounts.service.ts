import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../models/accounts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getAccount(){
    return this.http.get(`${this.API_URI}/account`)
  }

  findAccount(id_account: number){
    return this.http.get(`${this.API_URI}/account/${id_account}`)
  }

  deleteAccount(id: number){
    return this.http.delete(`${this.API_URI}/account/${id}`)
  }

  saveAccount(account: Account){
    return this.http.post(`${this.API_URI}/account`, account)
  }

  updateAccount(id_user: number, updateUser: Account): Observable<Account>{
    return this.http.put(`${this.API_URI}/account/${id_user}`, updateUser)
  }
}
