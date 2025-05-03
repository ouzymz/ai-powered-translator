import { Test, TestingModule } from '@nestjs/testing';
import { ConfigPanelService } from './config-panel.service';

describe('ConfigPanelService', () => {
  let service: ConfigPanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigPanelService],
    }).compile();

    service = module.get<ConfigPanelService>(ConfigPanelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
