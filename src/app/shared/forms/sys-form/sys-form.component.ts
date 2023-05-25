import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppService } from 'src/app/core/models/permission.model';
import { MenuService } from 'src/app/core/services/menu/menu.service';

@Component({
  selector: 'app-sys-form',
  templateUrl: './sys-form.component.html',
  styleUrls: ['./sys-form.component.css'],
})
export class SysFormComponent {
  public currentMenuInfo!: IAppService;
  public currentFormMenu!: FormGroup;
  public listOfFormFields: any = {};
  isLoading = true;
  constructor(private menuServiceProvider: MenuService) {
    this.menuServiceProvider.currentMenu$.subscribe((currentServiceInfo) => {
      this.currentMenuInfo = currentServiceInfo;
      if (this.currentMenuInfo) {
        this.currentMenuInfo.form?.fields.sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        this.currentMenuInfo.form?.fields.forEach((field) => {
          this.listOfFormFields[field.name] = new FormControl('', [
            Validators.required,
          ]);
        });
        this.currentFormMenu = new FormGroup(this.listOfFormFields);
        if (
          currentServiceInfo.permission &&
          currentServiceInfo.permission.includes('VIEW')
        ) {
          this.currentFormMenu.disable();
        }
      }
    });
  }
}
