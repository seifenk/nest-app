import { Test, TestingModule } from '@nestjs/testing';
import { AbcGateway } from './abc.gateway';
import { AbcService } from './abc.service';

describe('AbcGateway', () => {
  let gateway: AbcGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbcGateway, AbcService],
    }).compile();

    gateway = module.get<AbcGateway>(AbcGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
