import { Injectable } from '@nestjs/common';
import { IssuedTokenEntity } from '../entites/issued-token.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IssuedTokenService {
  constructor(
    @InjectRepository(IssuedTokenEntity)
    private issuedTokensRepository: Repository<IssuedTokenEntity>,
  ) {}

  async findByTokenId(tokenId: string): Promise<IssuedTokenEntity> | undefined {
    return await this.issuedTokensRepository.findOneBy({ token_id: tokenId });
  }

  async create(tokenId: string): Promise<IssuedTokenEntity> {
    return await this.issuedTokensRepository.save({ token_id: tokenId });
  }
}
