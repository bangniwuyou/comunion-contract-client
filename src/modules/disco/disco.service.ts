import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Web3 from 'web3';
import { Eth } from 'web3-eth';
import { AbiItem } from 'web3-utils';
import { ContractContext as DiscoContractContext } from './abi/Disco';
import { EventData } from 'ethereum-abi-types-generator';
import DiscoAbi = require('./abi/Disco.abi.json');
import { InjectRepository } from '@nestjs/typeorm';
import { Disco } from './entities/disco.entity';
import { DiscoInvestor } from './entities/disco_investor.entity';
import { Repository } from 'typeorm';
import { DiscoState } from './interfaces/disco_state.interface';

@Injectable()
export class DiscoService {
  constructor(
    private readonly configServise: ConfigService,
    @InjectRepository(Disco)
    private readonly discoRepository: Repository<Disco>,
    @InjectRepository(DiscoInvestor)
    private readonly discoInvestorRepository: Repository<DiscoInvestor>,
  ) {}

  private ethClient: Eth;

  private discoContract: DiscoContractContext;

  async onModuleInit() {
    this.init();

    // 订阅Disco
    this.subscribeDiscoContract();
  }

  // 初始化
  private init() {
    const wsEndPoint = this.configServise.get<string>('INFURA_ENDPOINT_WS');
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

  // 订阅DISCO合约
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
    this.discoContract.events.fundraisingSuccessed({}).on('data', (data) => {
      this.handleFundraisingSuccessedEvent(data);
    });
    this.discoContract.events.investToDisco({}).on('data', (data) => {
      this.handleInvestToDiscoEvent(data);
    });
  }

  private async getDiscoById(id: string): Promise<Disco> {
    return await this.discoRepository.findOne({
      where: {
        id,
      },
    });
  }

  // 处理创建DISCO事件
  private async handleCreatedDiscoEvent(data: EventData): Promise<void> {
    console.log(`${JSON.stringify(data)}`);
    const discoId = data.returnValues.discoId;
    const disco = await this.getDiscoById(discoId);

    if (!disco) {
      console.error(`[handleCreatedDiscoEvent] disco not found`);
      return;
    }
    if (disco.state !== DiscoState.CREATING) {
      console.error(`[handleCreatedDiscoEvent] disco state must be "CREATING"`);
      return;
    }

    disco.state = DiscoState.CREATED;
    disco.updatedAt = new Date();
    await this.discoRepository.save(disco);
  }

  // 处理打开DISCO事件
  private async handleEnabeldDiscoEvent(data: EventData): Promise<void> {
    console.log(`${JSON.stringify(data)}`);
    const discoId = data.returnValues.discoId;
    const disco = await this.getDiscoById(discoId);

    if (!disco) {
      console.error(`[handleEnabeldDiscoEvent] disco not found`);
      return;
    }
    if (disco.state !== DiscoState.ENABLING) {
      console.error(`[handleEnabeldDiscoEvent] disco state must be "ENABLING"`);
      return;
    }

    disco.state = DiscoState.ENABLED;
    disco.updatedAt = new Date();
    await this.discoRepository.save(disco);
  }

  // 处理DISCO募资失败事件
  private async handleFundraisingFailedEvent(data: EventData): Promise<void> {
    console.log(`${JSON.stringify(data)}`);
    const discoId = data.returnValues.discoId;
    const disco = await this.getDiscoById(discoId);

    if (!disco) {
      console.error(`[handleFundraisingFailedEvent] disco not found`);
      return;
    }
    if (disco.state !== DiscoState.ENABLED) {
      console.error(
        `[handleFundraisingFailedEvent] disco state must be "ENABLED"`,
      );
      return;
    }

    disco.state = DiscoState.FUNDRAISING_FAIED;
    disco.updatedAt = new Date();
    await this.discoRepository.save(disco);
  }

  // 处理DISCO募资成功事件
  private async handleFundraisingSuccessedEvent(
    data: EventData,
  ): Promise<void> {
    console.log(`${JSON.stringify(data)}`);
    const discoId = data.returnValues.discoId;
    const disco = await this.getDiscoById(discoId);

    if (!disco) {
      console.error(`[handleFundraisingSuccessedEvent] disco not found`);
      return;
    }
    if (disco.state !== DiscoState.ENABLED) {
      console.error(
        `[handleFundraisingSuccessedEvent] disco state must be "ENABLED"`,
      );
      return;
    }

    disco.state = DiscoState.FUNDRAISING_SUCCESS;
    disco.updatedAt = new Date();
    await this.discoRepository.save(disco);
  }

  // 处理投资事件
  private async handleInvestToDiscoEvent(data: EventData): Promise<void> {
    console.log(`${JSON.stringify(data)}`);
  }
}
