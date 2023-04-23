import { IUserFactory } from 'src/factory/user.factory';
import { IKindOfUser } from 'src/interfaces/IKindUser';
import { Gestion } from './gestion.entity';
import { Providerhis } from './providerhis.entity';
import { UnauthorizedException } from '@nestjs/common';

export class User implements IUserFactory {
  name: IKindOfUser;
  tokenName: string;

  constructor(userName: IKindOfUser) {
    const user = this.getUser(userName);
    if (user) {
      this.name = user.name;
      this.tokenName = user.tokenName;
    }
  }

  private getUser(userName: IKindOfUser): IUserFactory | null {
    if (userName === 'gestion_his') {
      return new Gestion();
    }

    if (userName === 'proveedor_his') {
      return new Providerhis();
    }

    return null;
  }
}
