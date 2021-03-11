import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import { Account } from 'src/app/models/accounts';
import { MovementsService } from 'src/app/services/movements/movements.service';
import { Movement } from 'src/app/models/movemets';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})

export class UserAccountComponent implements OnInit {

  panelOpenState = false;
  accounts:any = [];
  movements: any =[];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  
  idUser: number = Number(sessionStorage.getItem('idUser'));;
  depositaccount: number;
  withdrawMoney: number;
  total: number = 0;
  displayedColumns: string[] = ['Fecha Transacción', 'Tipo Transacción', 'Monto'];


  account: Account = {
    id_account : 0,
    id_user:this.idUser,
    account_type:'Cuenta Corriente',
    account_amount: 0,
    account_enabled: '1'
  };

  movement : Movement = {}

  constructor(private accountsService: AccountsService, 
    private movementService: MovementsService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.refreshAccount();
    
  }

  refreshAccount(){
        this.accountsService.findAccount(this.idUser).subscribe(
          res => {
            let response = res as any;
            this.accounts = response;
            this.account.account_amount = response[0].account_amount;
            this.account.id_user = response[0].id_user;
            this.account.id_account = response[0].id_account;

            this.movementList(response[0].id_account);
          },
          error => console.log(error)
          ) 
  }

  movementList(accountId : number){
    this.movementService.findMovement(accountId).subscribe(
      res => {
        this.movements = res;
        //this.dataSource = this.movements;
        this.dataSource = new MatTableDataSource(this.movements);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = 'Movimientos por página';
      }, error => console.log(error)
    )
  }

  generateMovement(movementType : string, movementAmount : number){

    this.movement.movement_date = new Date();
    this.movement.movement_amount = movementAmount;
    this.movement.id_movement_type = movementType;
    this.movement.id_account = this.account.id_account;

    this.movementService.saveMovement(this.movement).subscribe(
      res => {
        console.log('genera movimiento asociado');
      },
      error => console.log(error)
    )
  }

  deposit(){
    let currentValue = this.account.account_amount;
    this.account.account_amount = this.depositaccount + currentValue!;
    if(this.depositaccount > 0 ){
      this.accountsService.updateAccount(this.idUser,this.account).subscribe(
        res => { 
          this.refreshAccount();
          this.generateMovement('1',this.depositaccount);
        },
        error => console.log(error)
      )
    }else{
      alert('')
    }
  }

  withdraw(){

    let currentValue = this.account.account_amount;
    this.account.account_amount = (currentValue! - this.withdrawMoney);

    if(this.withdrawMoney > this.account.account_amount!){
      alert('monto no puede ser mayor al de la cta :(')
    }else{
      this.accountsService.updateAccount(this.idUser,this.account).subscribe(
        res =>{
          this.refreshAccount();
          this.generateMovement('2',this.withdrawMoney);
        },
        error => console.log(error)
      )
    }
  }

  transactionFormat(data: string){
    let formatedData = '';
    if(data == '1'){
      formatedData = 'Abono';
    }else if(data == '2'){
      formatedData = 'Retiro';
    }else if (data == '3'){
      formatedData = 'Transferencia';
    }

    return formatedData;
  }

  clpFormat(data: any){
    return this.commonService.clpFormat(data);
  }

}
