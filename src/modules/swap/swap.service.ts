import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Web3 from 'web3';
import { Eth } from 'web3-eth';
import { AbiItem } from 'web3-utils';
import { ContractContext as SwapFactoryContractContext } from './abi/SwapFactory';
import { ContractContext as SwapPairContractContext } from './abi/SwapPair';
import SwapFactoryAbi = require('./abi/SwapFactory.abi.json');
import SwapPairAbi = require('./abi/SwapPair.abi.json');
import { EventData } from 'ethereum-abi-types-generator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class SwapService {
  constructor(
    private readonly configServise: ConfigService,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  private ethClient: Eth;

  private swapFactoryContract: SwapFactoryContractContext;

  async onModuleInit() {
    this.init();

    // console.log(await this.transactionRepository.find());

    // 订阅Swap工厂
    // this.subscribeSwapFactoryContract();

    // 获取所有的交易对合约地址
    // const swapPairsAddress = await this.getAllSwapPairsAddress();

    // 订阅所有的交易对合约
    // this.subscribeSwapPairContracts(swapPairsAddress);
  }

  // 初始化
  private init() {
    const wsEndPoint = this.configServise.get<string>('INFURA_ENDPOINT_WS');
    const swapFactoryContractAddress = this.configServise.get<string>(
      'SWAP_FACTORY_CONTRACT_ADDRESS',
    );
    this.ethClient = new (Web3 as any)(
      new (Web3 as any).providers.WebsocketProvider(wsEndPoint, {
        // 自动重连
        reconnect: {
          auto: true,
          onTimeout: true,
        },
      }),
    ).eth;
    this.swapFactoryContract = (new this.ethClient.Contract(
      SwapFactoryAbi as AbiItem[],
      swapFactoryContractAddress,
    ) as unknown) as SwapFactoryContractContext;
  }

  private async subscribeSwapFactoryContract() {
    this.swapFactoryContract.events.PairCreated({}).on('data', (data) => {
      this.handleSwapFactoryPairCreatedEvent(data);
    });
  }

  private async getAllSwapPairsAddress(): Promise<string[]> {
    const allPairLength = Number(
      await this.swapFactoryContract.methods.allPairsLength().call(),
    );

    // 开发用，只取前几个
    // const allPairLength = 1;

    console.log(allPairLength, 'allPairLength');

    const list: Promise<string>[] = [];
    for (let i = 0; i < allPairLength; i += 1) {
      list.push(this.swapFactoryContract.methods.allPairs(String(i)).call());
    }
    return await Promise.all(list);
  }

  private async subscribeSwapPairContracts(addresses: string[]): Promise<void> {
    for (const address of addresses) {
      const swapPairContract = (new this.ethClient.Contract(
        SwapPairAbi as AbiItem[],
        // 主网Uniswap合约：0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc
        address,
      ) as unknown) as SwapPairContractContext;
      swapPairContract.events.Swap({}).on('data', (data) => {
        this.handleSwapPairSwapEvent(data);
      });
      swapPairContract.events.Sync({}).on('data', (data) => {
        this.handleSwapPairSyncEvent(data);
      });
      swapPairContract.events.Mint({}).on('data', (data) => {
        this.handleSwapPairMintEvent(data);
      });
      swapPairContract.events.Burn({}).on('data', (data) => {
        this.handleSwapPairBurnEvent(data);
      });
    }
  }

  private async handleSwapFactoryPairCreatedEvent(
    data: EventData,
  ): Promise<void> {
    console.log('handleSwapFactoryPairCreatedEvent', data);
  }

  private async handleSwapPairSwapEvent(data: EventData): Promise<void> {
    console.log('handleSwapPairSwapEvent', data);
  }

  private async handleSwapPairSyncEvent(data: EventData): Promise<void> {
    console.log('handleSwapPairSyncEvent', data);
  }

  private async handleSwapPairMintEvent(data: EventData): Promise<void> {
    console.log('handleSwapPairMintEvent', data);
  }

  private async handleSwapPairBurnEvent(data: EventData) {
    console.log('handleSwapPairBurnEvent', data);
  }
}
