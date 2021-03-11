import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { Account } from 'src/app/models/accounts';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})

export class UserAccountComponent implements OnInit {

  accounts:any = [];
  idUser: number = 0;
  firstAmount : number = 0;

  account: Account = {
    id_user:this.idUser,
    account_type:'Cuenta Corriente',
    account_amount: 10,
    account_enabled: '1'
  };

  constructor(private accountsService: AccountsService, private commonService: CommonService) { }

  ngOnInit(): void {

    this.idUser = Number(sessionStorage.getItem('idUser'));
    this.accountsService.findAccount(this.idUser).subscribe(
      res => { 
        this.accounts = res
        // INPUTS COMO VALORES SOLO PUEDEN PERMITIR NUMERICOS
        // ACA RESCATA EL MONTO
        // LO GUARDA EN THIS.FIRSTAMOUNT Y CUANDO VAYA A HACER UN RETIRO PREGUNTA SI EL MONTO VA A SER MAYOR AL QUE TIENE EN LA VARIABLE
      },
      error => console.log(error)
      ) 
  }

  deposit(){
    debugger;
    this.accountsService.updateAccount(this.idUser,this.account).subscribe(
      res => { 
        debugger;
      },
      error => console.log(error)
    )
  }

}
