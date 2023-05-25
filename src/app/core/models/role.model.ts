export interface IRole {
  id: string;
  name: string;
}

export class Role {
  private _id!: string;
  private _name!: string;

  constructor(roleInfo: IRole) {
    this._id = roleInfo.id;
    this._name = roleInfo.name;
  }

  get id(): string {
    return this._id
  }

  get name() : string{
    return this._name
  }
}
