import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IAppService } from 'src/app/core/models/permission.model';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { RoleService } from 'src/app/core/services/role/role.service';

@Component({
  selector: 'app-access-rights',
  templateUrl: './access-rights.component.html',
  styleUrls: ['./access-rights.component.css'],
})
export class AccessRightsComponent {
  isLoading = true;
  accessRightForm!: FormGroup;
  public listOfServices!: IAppService[];
  displayedColumns: string[] = ['Service', 'Permissions'];
  permissions: string[] = ['EDIT', 'VIEW', 'HIDE'];
  shouldDisable = false;
  constructor(
    private dialogRef: MatDialogRef<AccessRightsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuServiceProvider: MenuService,
    private roleServiceProvider: RoleService,
    public navigationServiceProvider: NavigationService
  ) {
    this.menuServiceProvider.getListOfServices().subscribe((response) => {
      this.listOfServices = response;
      let listOfPermission: any = {};
      response.forEach((service) => {
        listOfPermission[service.name] = new FormControl('');
      });
      this.accessRightForm = new FormGroup(listOfPermission);
      this.isLoading = false;
    });
  }

  private getIdsOfServices(accessRightServices: any) {
    const nameOfServices = Object.keys(accessRightServices);
    let listOfAccessRightServices: any[] = [];
    this.listOfServices.forEach((service) => {
      if (
        nameOfServices.includes(service.name) &&
        accessRightServices[service.name].length
      ) {
        listOfAccessRightServices.push({
          tourServiceId: service.id,
          permission: accessRightServices[service.name],
        });
      }
    });
    return listOfAccessRightServices;
  }

  saveAccessRights() {
    this.shouldDisable = true;
    const listOfAccessRightServices = this.getIdsOfServices(
      this.accessRightForm.value
    );
    this.roleServiceProvider
      .assignAccessRights({
        roleId: this.data.roleInfo.id,
        permissions: listOfAccessRightServices,
      })
      .subscribe(async (response) => {
        await this.menuServiceProvider.updateListOfServices();
        this.shouldDisable = false;
        this.dialogRef.close();
        this.navigationServiceProvider.navigateToRoleList();
      });
  }
}
