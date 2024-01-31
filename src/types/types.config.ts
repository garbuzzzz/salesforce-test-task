export type GlobalVariables = { [key: string]: string };
export type SupportedRegions = 'US' | 'CAN';
export type SupportedUserTypes = 'Admin' | 'Sales';
export type SupportedEnvs = QAEnv | INTEnv;
export type QAEnv = 'QA';
export type INTEnv = 'INT';
export interface DefaultTimeouts {
  _1sec: number;
  _5sec: number;
  _15sec: number;
  _50sec: number;
  _95sec: number;
}
export type SelectQuestionType = 'SS' | 'MS';
export type QuestionOptionalArguments = {
  questionType?: SelectQuestionType;
  sectionNumber?: number;
};
