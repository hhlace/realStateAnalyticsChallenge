export interface IProperty {
  _id: string;
  referenceCode: string;
  type: string;
  agent: {
    firstName: string;
    lastName: string;
  };
  listing: {
    value: number;
    currency: string;
    price: {
      price: number;
      currency: string;
    };
    createdAt: Date;
    updatedAt: Date;
  };
  marketStats: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    history: any[];
  };
  location?: string;
  attributes?: {
    totalSurface: number;
  };
  pictures?: { url: string }[];
}
