import { IUserFactory } from 'src/factory/user.factory';
import { IKindOfUser } from 'src/interfaces/IKindUser';
import { PROVIDER_HIS, PROVIDER_HIS_TOKEN } from 'src/utils/const';

export class Providerhis implements IUserFactory {
  name: IKindOfUser = PROVIDER_HIS;
  tokenName = PROVIDER_HIS_TOKEN;
}
