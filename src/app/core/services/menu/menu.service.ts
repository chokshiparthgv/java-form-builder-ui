import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAppService } from '../../models/permission.model';
import { ENDPOINTS } from '../../helpers/constants';
import { RoleService } from '../role/role.service';

const DEFAULT_SERVICES: IAppService[] = [
  {
    id: '1',
    name: 'Roles',
    permission: ['EDIT'],
    form: null,
  },
  {
    id: '2',
    name: 'Services',
    permission: ['EDIT'],
    form: null,
  },
];

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  allServices$!: BehaviorSubject<IAppService[]>;
  services$!: BehaviorSubject<IAppService[]>;
  currentMenu$!: BehaviorSubject<IAppService>;
  isMenuOpen$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(
    private httpApiService: ApiService,
    private roleServiceProvider: RoleService
  ) {}

  getListOfServices(): Observable<IAppService[]> {
    return this.httpApiService.getApi(
      this.httpApiService.apiUri + ENDPOINTS.SERVICES
    );
  }

  private getListOfServicesByRoleId(roleId: string): Observable<IAppService[]> {
    return this.httpApiService.getApi(
      this.httpApiService.apiUri + ENDPOINTS.SERVICES_BY_ROLE + '/' + roleId
    );
  }

  updateListOfServices() {
    return new Promise((resolve, rejects) => {
      this.roleServiceProvider.currentRole$.subscribe((role) => {
        if (role) {
          this.getListOfServicesByRoleId(role.id).subscribe(
            (listOfServices) => {
              listOfServices.push(...DEFAULT_SERVICES);
              if (!this.services$) {
                this.services$ = new BehaviorSubject(listOfServices);
                if (!this.currentMenu$)
                  this.currentMenu$ = new BehaviorSubject(listOfServices[0]);
                else this.currentMenu$.next(listOfServices[0]);
              } else this.services$.next(listOfServices);
              localStorage.setItem('currentMenu', 'true');
              resolve(true);
            }
          );
        }
      });
    });
  }

  getServiceById(serviceId: string) {
    return this.httpApiService.getApi(
      this.httpApiService.apiUri + ENDPOINTS.SERVICES + '/' + serviceId
    );
  }

  updateCurrentMenu(newMenuId: string) {
    const newMenu = this.services$.value.filter(
      (service) => newMenuId == service.id
    );
    if (!newMenu.length) newMenu.push(...DEFAULT_SERVICES);
    if (!this.currentMenu$) this.currentMenu$ = new BehaviorSubject(newMenu[0]);
    else this.currentMenu$.next(newMenu[0]);
  }

  updateSideNavStatus() {
    const status = this.isMenuOpen$.getValue();
    this.isMenuOpen$.next(!status);
  }

  addNewService(body: any): Observable<any> {
    return this.httpApiService.postApi(
      this.httpApiService.apiUri + ENDPOINTS.SERVICES,
      body
    );
  }

  updateListOfAllServices() {
    return new Promise((resolve, rejects) => {
      this.getListOfServices().subscribe((response) => {
        if (this.allServices$) {
          this.allServices$.next(response);
        } else {
          this.allServices$ = new BehaviorSubject(response);
        }

        resolve(true);
      });
    });
  }
}
