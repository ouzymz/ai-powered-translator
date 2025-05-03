import { Test, TestingModule } from '@nestjs/testing';
import { KeyboardHookService } from './keyboard-hook.service';

describe('KeyboardHookService', () => {
  let service: KeyboardHookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeyboardHookService],
    }).compile();

    service = module.get<KeyboardHookService>(KeyboardHookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
