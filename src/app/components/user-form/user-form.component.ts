import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { Account } from 'src/app/models/accounts';
import { UsersService } from '../../services/users/users.service';
import { AccountsService } from '../../services/accounts/accounts.service';
import {FormControl, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

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

  account : Account = {
    id_user: 0,
    account_type: 'Cuenta Corriente',
    account_amount: 100000,
    account_enabled: '1'
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required,
  ])

  rutFormControl = new FormControl('', [
    Validators.required,
  ])

  passwordFormControl = new FormControl('', [
    Validators.required,
  ])
  constructor(private usersService: UsersService, private accountsService : AccountsService) { }


  ngOnInit(): void {

  }

  saveUser(){
    delete this.user.id_user;
    delete this.user.created_date;

    let currentPass = this.user.user_password!;
    let encryptedPassword = this.set('123456$#@$^@1ERF', currentPass);
    this.user.user_password = encryptedPassword;

    this.usersService.saveUser(this.user).subscribe(
      res => {console.log(res)
        /* let response = res as any;  
        let createdId = response.insertId
        this.account.id_user = createdId;    */   
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

}
