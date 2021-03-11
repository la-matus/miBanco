import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UsersService } from '../../services/users/users.service';
import * as CryptoJS from 'crypto-js';
import { CommonService } from 'src/app/services/common/common.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private usersService: UsersService, private _router: Router, private commonService: CommonService) { }

  user: User = {
    id_user: 0,
    name: '',
    last_name: '',
    rut: undefined,
    dv: '',
    email: '', 
    user_password: '',
    created_date: new Date()
  };

  rutStatus: string = '';
  accountInvalidated: boolean = false;

  ngOnInit(): void {
  }

  validateUser(){

    let rutFormat = this.user.rut?.toString().replace('-','');
    let test = {
      rut: rutFormat,
      user_password: this.set('123456$#@$^@1ERF',this.user.user_password!)
    }

    let response;

    this.usersService.findUserLogin(test).subscribe(
      res => 
      {
        response = res as any;
        if(response.length > 0) {
          sessionStorage.setItem('idUser',response[0].id_user);
          this.accountInvalidated = false;
          this._router.navigate(['account']);
        }else{
          this.accountInvalidated = true;
        }
      },
      error => console.log(error)
      )
  }

  set(keys : string, value : string){
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  chkRut(data: any){
    let response = this.commonService.checkRut(data.target);
    this.rutStatus = response.msg
  }
  

}
