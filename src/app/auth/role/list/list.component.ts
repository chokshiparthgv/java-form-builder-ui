import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/app/core/models/role.model';
import { RoleService } from 'src/app/core/services/role/role.service';
import { AccessRightsComponent } from '../access-rights/access-rights.component';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  public listOfRoles: Role[] = [];
  public displayColumns: string[] = ['Name', 'Actions'];
  isLoading = true;
  constructor(
    private roleServiceProvider: RoleService,
    private dialog: MatDialog,
    public navigationServiceProvider: NavigationService
  ) {
    this.roleServiceProvider.roles$.subscribe((roles) => {
      this.listOfRoles = roles;
      this.isLoading = false;
    });
  }

  ngOnInit() {}

  openAccessRightModel(roleInfo: Role) {
    this.dialog.open(AccessRightsComponent, {
      data: {
        roleInfo,
      },
    });
  }

  deleteRole(roleId: string) {
    this.roleServiceProvider
      .deleteRoleById(roleId)
      .subscribe(async (response) => {
        this.isLoading = true;
        await this.roleServiceProvider.setListOfRoles();
        this.isLoading = false;
      });
  }
}
