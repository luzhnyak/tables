export interface IAccount {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: Date;
  [key: string]: string | number | Date;
}

export interface IColumn {
  key: string;
  title: string;
  typeData: string;
  sort: boolean;
}

export interface IProfile {
  profileId: number;
  accountId: number;
  marketplace: string;
  country: string;
  [key: string]: string | number;
}

export interface IСampaign {
  clicks: number;
  cost: number;
  date: Date;
  profileId: number;
  campaignId: number;
  [key: string]: string | number | Date;
}
