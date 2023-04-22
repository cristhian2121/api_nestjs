import { IKindOfUser } from 'src/interfaces/IKindUser';

type Tquery = {
  query: { [key: string]: any };
  projection: { [key: string]: number };
};

export const getQueryAndProjection = async (
  userName: IKindOfUser,
): Promise<Tquery> => {
  if (userName === 'gestionenlinea') {
    return Promise.resolve({
      query: { name: 'example' },
      projection: {},
    });
  }

  if (userName === 'proveedorhis') {
    return Promise.resolve({
      query: { name: 'example' },
      projection: {},
    });
  }

  return Promise.resolve({
    query: { name: 'example' },
    projection: {},
  });
};
