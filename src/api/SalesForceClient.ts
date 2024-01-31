import { APIRequestContext } from '@playwright/test';
import { SalesForceAPIController } from './controllers/SalesForceAPI.controller';
import {
  defaultAccountBody,
} from 'src/support/DataFactoryStorage';
import { CompositeRequestHandler } from 'src/support/CompositeRequestHandler';
import randomstring from 'randomstring';

const prefix = process.env.PREFIX as string;

export class SalesForceClient {
  private readonly requestContext: APIRequestContext;
  compositeRequestHandler: CompositeRequestHandler;
  private readonly salesForceController: SalesForceAPIController;
  private _authToken = '';
  constructor(context: APIRequestContext) {
    this.requestContext = context;
    this.compositeRequestHandler = new CompositeRequestHandler(context);
    this.salesForceController = new SalesForceAPIController(
      this.requestContext
    );
  }

  get authToken() {
    return this._authToken;
  }

  /**
   * Returns a clear instance of the client
   * */
  static unauthorized(context: APIRequestContext) {
    return new SalesForceClient(context);
  }

  async authorize() {
    this._authToken = await this.salesForceController.authorize();
    this.compositeRequestHandler.setAuthToken(this._authToken);
    return this;
  }

  async deleteAccountById(accountName: string) {
    const query = `SELECT Id FROM Account WHERE Name='${accountName}'`;
    const response = await this.salesForceController.getRecordBySOQL(
      this.authToken,
      query
    );
    return await this.salesForceController.deleteRecord(
      this.authToken,
      'Account',
      response.records[0].Id
    );
  }

  async seedAccount() {
    const responce = await this.compositeRequestHandler
      .addPOSTSubrequest('Account', defaultAccountBody, 'AccountRef')
      .sendCompositeRequest();

    const accountId: string =
      this.compositeRequestHandler.getNonNullRecordIdByReference(
        responce,
        'AccountRef'
      );
    return accountId;
  }

  async seedCase(
    accountId: string = process.env.accountId as string,
    contactId: string = process.env.contactId as string
  ) {
    const caseBody = {
      ContactId: contactId,
      AccountID: accountId,
      Subject: `${prefix}_Case_${randomstring.generate(10)}`,
    };
    const response = await this.compositeRequestHandler
      .addPOSTSubrequest('Case', caseBody, 'CaseRef')
      .sendCompositeRequest();
    const caseId: string =
      this.compositeRequestHandler.getNonNullRecordIdByReference(
        response,
        'CaseRef'
      );
    return caseId;
  }

  async getAppIdByDeveloperName(appDeveloperName: string) {
    const query = `SELECT DurableId FROM AppDefinition where DeveloperName='${appDeveloperName}'`;
    const response = await this.salesForceController.getRecordBySOQL(
      this.authToken,
      query
    );
    return response.records[0].DurableId as string;
  }
}
