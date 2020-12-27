import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Web3 from 'web3';
import { Eth } from 'web3-eth';
import { AbiItem } from 'web3-utils';
import { ContractContext as DiscoContractContext } from './abi/Disco';
import { EventData } from 'ethereum-abi-types-generator';
import DiscoAbi = require('./abi/Disco.abi.json');

@Injectable()
export class DiscoService {
  constructor(private readonly configServise: ConfigService) {}

  private ethClient: Eth;

  private discoContract: DiscoContractContext;

  async onModuleInit() {
    this.init();

    // 订阅Disco
    // this.subscribeDiscoContract();
  }

  // 初始化
  private init() {
    const wsEndPoint = this.configServise.get<string>(
      'INFURA_ENDPOINT_MAINNET_WS',
    );
    const discoContractAddress = this.configServise.get<string>(
      'DISCO_CONTRACT_ADDRESS',
    );
    this.ethClient = new (Web3 as any)(
      new (Web3 as any).providers.WebsocketProvider(wsEndPoint),
    ).eth;
    this.discoContract = (new this.ethClient.Contract(
      DiscoAbi as AbiItem[],
      discoContractAddress,
    ) as unknown) as DiscoContractContext;
  }

  private async subscribeDiscoContract() {
    this.discoContract.events.createdDisco({}).on('data', (data) => {
      this.handleCreatedDiscoEvent(data);
    });
    this.discoContract.events.enabeldDisco({}).on('data', (data) => {
      this.handleEnabeldDiscoEvent(data);
    });
    this.discoContract.events.fundraisingFailed({}).on('data', (data) => {
      this.handleFundraisingFailedEvent(data);
    });
    this.discoContract.events.fundraisingFinished({}).on('data', (data) => {
      this.handleFundraisingFinishedEvent(data);
    });
    this.discoContract.events.fundraisingSuccessed({}).on('data', (data) => {
      this.handleFundraisingSuccessedEvent(data);
    });
  }

  private async handleCreatedDiscoEvent(data: EventData) {
    console.log('handleCreatedDiscoEvent', data);
  }
  private async handleEnabeldDiscoEvent(data: EventData) {
    console.log('handleEnabeldDiscoEvent', data);
  }
  private async handleFundraisingFailedEvent(data: EventData) {
    console.log('handleFundraisingFailedEvent', data);
  }
  private async handleFundraisingFinishedEvent(data: EventData) {
    console.log('handleFundraisingFinishedEvent', data);
  }
  private async handleFundraisingSuccessedEvent(data: EventData) {
    console.log('handleFundraisingSuccessedEvent', data);
  }
}
