import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/core/services/menu/menu.service';

@Component({
  selector: 'app-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css'],
})
export class MenuContainerComponent {
  title!: string;
  public menuForm!: FormGroup;
  haveMenu = false;
  constructor(private menuServiceProvider: MenuService) {
    this.menuServiceProvider.currentMenu$.subscribe((menu) => {
      if(menu){
        this.title = menu.name
        this.haveMenu = true;
      } else {
        this.haveMenu = false;
      }
    });
  }
}
