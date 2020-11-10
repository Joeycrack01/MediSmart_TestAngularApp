import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { UserData, UserDataService, ResponseBase } from './Services/typescript-angular-client-generated';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'companyName', 'department', 'action'];
  dataSource: UserData[];

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(public dialog: MatDialog, private _userDataService: UserDataService) { }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: obj
    });

    

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  ngOnInit() {
    this.loadUserData()
  }

  loadUserData() {
    return this._userDataService.apiUserDataGetUserDataGet().subscribe(
      result => {
        let data: ResponseBase = result;
        if (data.isSuccess == true) {
          this.dataSource = result.payload
        } 

      })
  }

  addRowData(row_obj: UserData) {
    var d = new Date();
    return this._userDataService.apiUserDataAddUserDataPost(row_obj).subscribe(
      result => {
        if (result.isSuccess == true) {
          this.loadUserData();
        }
        this.loadUserData();
      })
    
  }

  updateRowData(row_obj: UserData) {
    return this._userDataService.apiUserDataUpdateUserDataPost(row_obj).subscribe(
      result => {
        if (result.isSuccess == true) {
          this.loadUserData();
        }
        this.loadUserData();
      })
  }
  deleteRowData(row_obj: UserData) {
    this._userDataService.apiUserDataDeleteUserDataGet(row_obj.id).subscribe(
      result => {
        if (result.isSuccess == true) {
          this.loadUserData()
        }
        this.loadUserData();
      })
  }

  title = 'MediSmartApp';
}
