import { IUserFactory } from 'src/factory/user.factory';
import { IKindOfUser } from 'src/interfaces/IKindUser';
import { PROVIDER_GESTION, PROVIDER_GESTION_TOKEN } from 'src/utils/const';

export class Gestion implements IUserFactory {
  name: IKindOfUser = PROVIDER_GESTION;
  tokenName = PROVIDER_GESTION_TOKEN;
}
