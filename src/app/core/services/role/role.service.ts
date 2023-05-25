import { Injectable } from '@angular/core';
import { Role } from '../../models/role.model';
import { ApiService } from '../http/api.service';
import { ENDPOINTS } from '../../helpers/constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  public roles$!: BehaviorSubject<Role[]>;
  public currentRole$!: BehaviorSubject<Role>;

  constructor(private httpApiService: ApiService) {}

  setListOfRoles() {
    return new Promise((resolve, rejects) => {
      this.httpApiService
        .getApi(this.httpApiService.apiUri + ENDPOINTS.ROLES)
        .subscribe(
          (response) => {
            console.log('List of roles: ', response);
            if (response.length) {
              if(this.roles$) {
                this.roles$.next(response);
              } else {
                this.roles$ = new BehaviorSubject(response);
              }
              this.currentRole$ = new BehaviorSubject(response[0]);
              localStorage.setItem('currentRole', 'true');
              resolve(true);
            }
            resolve(false);
          },
          (error) => {
            console.log('==> Error : ', error);
            rejects(false);
          }
        );
    });
  }

  setCurrentRole(id: string) {
    this.roles$.subscribe((role) => {
      const newRole = role.filter((r) => r.id == id);
      this.currentRole$.next(newRole[0]);
    });
  }

  addNewRole(body: any): Observable<any> {
    return this.httpApiService.postApi(
      this.httpApiService.apiUri + ENDPOINTS.ROLES,
      body
    );
  }

  assignAccessRights(body: any): Observable<any> {
    return this.httpApiService.putApi(
      this.httpApiService.apiUri + ENDPOINTS.ACCESS_RIGHTS,
      body
    );
  }

  deleteRoleById(roleId: string) {
    return this.httpApiService.deleteApi(
      this.httpApiService.apiUri + ENDPOINTS.ROLES + '/' + roleId
    );
  }

  get listOfRoles() {
    return this.roles$;
  }
}
