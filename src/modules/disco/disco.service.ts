import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscoService {
  constructor(private readonly configServise: ConfigService) {}
}
