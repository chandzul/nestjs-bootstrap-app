export interface PubsubServiceOptions {
  region: string;
  apiVersion: string;
  credentials?: CredentialsPubsubServiceOptions;
}

export interface CredentialsPubsubServiceOptions {
  accessKeyId: string;
  secretAccessKey: string;
}

export const defaultPubsubServiceOptions: PubsubServiceOptions = {
  region: 'us-east-1',
  apiVersion: '2012-11-05',
};

export interface ParamsReceiveMessage {
  MaxNumberOfMessages?: number;
  QueueUrl: string;
  VisibilityTimeout?: number;
  WaitTimeSeconds?: number;
}

export const defaultParamsReceiveMessage: ParamsReceiveMessage = {
  MaxNumberOfMessages: 1,
  QueueUrl: '',
  VisibilityTimeout: 30,
  WaitTimeSeconds: 0,
};

export interface ParamsSendMessage {
  MessageBody: string;
  MessageDeduplicationId: string;
  MessageGroupId: string;
  QueueUrl: string;
}

export interface ParamsDeleteMessage {
  QueueUrl: string;
  ReceiptHandle: string;
}
