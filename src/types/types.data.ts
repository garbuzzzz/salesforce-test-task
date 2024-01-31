export type SObjectType =
  | 'CCIQ__Guideline__c'
  | 'Account'
  | 'Case'
  | 'Contact'
  | 'Version'
  | 'Id';
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

interface dataItem {
  id: string;
  type: string;
  title: string;
  data: AssessmentsStorage;
}

export type AssessmentsStorage = dataItem[];

export interface InterventionsStorage {
  assist: { [key: string]: dataItem };
  coordinate: { [key: string]: dataItem };
  educate: { [key: string]: dataItem };
  send: { [key: string]: dataItem };
  reconcile: { [key: string]: dataItem };
}
export interface DefaultAccountBody {
  Name: string | number;
}

export interface DefaultContactBody {
  LastName: string;
  AccountId: string;
  RecordTypeId: string;
}

export interface DefaultCaseBody {
  ContactId: string;
  AccountID: string;
  Subject: string;
}

export interface DefaultGuidelineBody {
  CCIQ__Account__c: string;
  CCIQ__Contact__c: string;
  CCIQ__Case__c: string;
  CCIQ__Current_Stage__c: string;
  CCIQ__Current_Status__c: string;
  CCIQ__Hsim__c: string;
  CCIQ__Stage__c: string;
  CCIQ__Stage_Status__c: string;
  CCIQ__Selected_Condition__c: string;
  CCIQ__Product__c: string;
  CCIQ__Is_Custom__c: boolean;
  CCIQ__Title__c: string;
  CCIQ__Type__c: string;
  CCIQ__Version__c: string;
}

export interface RequestBody {
  method: string;
  url: string;
  referenceId: SObjectType | string;
  body?:
    | DefaultAccountBody
    | DefaultContactBody
    | DefaultCaseBody
    | DefaultGuidelineBody;
}

export interface CompositeRequestBody {
  allOrNone: boolean;
  collateSubrequests: boolean;
  compositeRequest: object[];
}
export interface PatientRelatedRecordIds {
  accountId: string;
  contactId: string;
  caseId: string;
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

export interface SearchResultTableRow {
  title: string;
  product: string;
  useCaseCategory: string;
  number: string;
  source: string;
}
