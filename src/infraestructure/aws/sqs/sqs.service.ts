import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  defaultParamsReceiveMessage,
  defaultServiceOptions,
  ParamsDeleteMessage,
  ParamsReceiveMessage,
  ParamsSendMessage,
  ServiceOptions,
} from '../interfaces/options';
import {
  SQSClient,
  ListQueuesCommand,
  ReceiveMessageCommand,
  SendMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';

@Injectable()
export class SqsService {
  // a client can be shared by different commands.
  private readonly sqsClient;

  constructor(
    @Inject('SQS_CONFIGURATION_OPTIONS')
    private readonly options: ServiceOptions,
  ) {
    this.options = { ...defaultServiceOptions, ...options };
    this.sqsClient = new SQSClient(this.options);
  }

  async listQueues(): Promise<any> {
    try {
      const { QueueUrls } = await this.sqsClient.send(
        new ListQueuesCommand({}),
      );
      return QueueUrls;
    } catch (e) {
      console.log(e);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async getMessage(params: Partial<ParamsReceiveMessage>): Promise<any> {
    try {
      const _params = { ...defaultParamsReceiveMessage, ...params };
      const { Messages } = await this.sqsClient.send(
        new ReceiveMessageCommand(_params),
      );
      return Messages;
    } catch (e) {
      console.log(e);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async sendMessage(params: ParamsSendMessage): Promise<any> {
    try {
      console.log('params = ', params);
      console.log('this.sqsClient.send(new SendMessageCommand(params));');
      return await this.sqsClient.send(new SendMessageCommand(params));
    } catch (e) {
      console.log(e);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async deleteMessage(params: ParamsDeleteMessage): Promise<any> {
    try {
      return await this.sqsClient.send(new DeleteMessageCommand(params));
    } catch (e) {
      console.log(e);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
