import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users: any = [];
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(
      res => {this.users = res;},
      
      error => console.log(error)
    )
  }

}
