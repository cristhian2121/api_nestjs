import { IKindOfUser } from 'src/interfaces/IKindUser';

type Tquery = {
  query: { [key: string]: any };
  projection: { [key: string]: number };
};

export const getQueryAndProjection = async (
  userName: IKindOfUser,
): Promise<Tquery> => {
  if (userName === 'gestion_his') {
    return Promise.resolve({
      query: { name: 'example' },
      projection: {},
    });
  }

  if (userName === 'proveedor_his') {
    return Promise.resolve({
      query: { numeroAdmision: 'APR5567932' },
      projection: {},
    });
  }

  return Promise.resolve({
    query: { name: 'example' },
    projection: {},
  });
};
