import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movement } from 'src/app/models/movemets';


@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  API_URI = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getMovement(){
    return this.http.get(`${this.API_URI}/movement`)
  }

  findMovement(id_account: number){
    return this.http.get(`${this.API_URI}/movement/${id_account}`)
  }

  deleteMovement(id_account: number){
    return this.http.delete(`${this.API_URI}/movement/${id_account}`)
  }

  saveMovement(movement: Movement){
    return this.http.post(`${this.API_URI}/movement`, movement)
  }

  updateMovement(id_account: number, updateMovement: Movement): Observable<Movement>{
    return this.http.put(`${this.API_URI}/movement/${id_account}`, updateMovement)
  }
}
