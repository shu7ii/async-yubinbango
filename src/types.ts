export type Address = {
  readonly region_id: number;
  readonly region: string;
  readonly locality?: string;
  readonly street?: string;
  readonly extended?: string;
};

type RawAddress = readonly [
  regionID: number,
  region: string,
  locality?: string,
  street?: string,
  extended?: string
];

export type APIResponse = {
  [zip: string]: RawAddress;
};
