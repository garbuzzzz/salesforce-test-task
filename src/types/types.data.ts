export interface IdStringResponse {
  id: string;
}

export interface SOQLResponse {
  totalSize: number;
  done: boolean;
  records: QueryResponseRecordAttributes[];
}

export interface SOSLResponse {
  searchRecords: QueryResponseRecordAttributes[];
}

export interface QueryResponseRecordAttributes {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  DurableId?: string;
}

export interface DefaultAccountBody {
  Name: string | number;
}

export interface CompositeRequestBody {
  allOrNone: boolean;
  collateSubrequests: boolean;
  compositeRequest: object[];
}

export interface CompositeResponse {
  compositeResponse: Array<CompositeResponseItem>;
}

export interface CompositeResponseItem {
  body: CompositeItemBodyResponse;
  httpHeaders: string;
  httpStatusCode: number;
  referenceId: string;
}

export interface CompositeItemBodyResponse {
  id: string;
  records: Array<Record>;
}

export interface Record {
  Id: string;
}
