import { IKindOfUser, IToken } from 'src/interfaces/IKindUser';

// users
export const PROVIDER_HIS: IKindOfUser = 'proveedor_his';
export const PROVIDER_GESTION: IKindOfUser = 'gestion_his';

// tokens
export const PROVIDER_HIS_TOKEN: IToken = 'PROVIDER_HIS_TOKEN';
export const PROVIDER_GESTION_TOKEN: IToken = 'PROVIDER_GESTION_TOKEN';

// swagger
export const DESCRIPTION_SWAGGER =
  ' El API de ordenes, permite a los clientes consultar \
    las ordenes a travez de un metodo GET y retorna una lista de \
    ordenes con el esquema suministrado en cada metodo especifica. \
    El API provee una facil integracion con diferentes sistemas a trabex de REST API.\
';
