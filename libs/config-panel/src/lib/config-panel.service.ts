import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as readline from 'readline';

@Injectable()
export class ConfigPanelService {
  constructor(private configService: ConfigService) {}

  private language!: string;
  private apiKey!: string;
  private model!: string;
  private runningType!: string;

  private languageOptions: Record<number, string> = {
    1: 'tr',
    2: 'es',
    3: 'en',
    4: 'de',
    5: 'fr',
  };
  private modelOptions: Record<number, string> = {
    1: 'gemini',
    2: 'meta-llama',
  };
  private configType: Record<number, string> = {
    1: 'env',
    2: 'user-input',
  };
  private runningOptions: Record<number, string> = {
    1: 'select-all-cp',
    2: 'just-cp',
  };

  async onModuleInit() {
    this.configType = await this.selectConfigType();
    this.runningType = await this.selectRuningType();

    if (this.configType === 'user-input') {
      this.language = await this.selectLanguage();
      this.model = await this.selectModel();
      this.apiKey = await this.ask('Please enter your API Key: ');
    } else {
      this.language = this.configService.get('TRANSLATE_LANGUAGE') as string;
      this.model = this.configService.get('MODEL') as string;
      this.apiKey = this.configService.get('API_KEY') as string;
    }
    console.log(this.language, this.model, this.apiKey);
    if (!this.model || !this.apiKey || !this.language) {
      throw new ConfigurationError(
        'Configuration values are missing: model, apiKey, or language.'
      );
    }
  }

  private async selectConfigType(): Promise<string> {
    console.log('Please select your configuration source:');
    console.log('1- Read configurations from ".env"');
    console.log('2- Enter your configurations');
    const choice = await this.ask('Your choice (1-2): ');

    const selectedLanguage = this.configType[Number(choice)];
    if (!selectedLanguage) {
      console.log('Invalid selection. Please try again.');
      return this.selectLanguage(); // Retry on invalid input
    }

    return selectedLanguage;
  }

  private async selectRuningType(): Promise<string> {
    console.log(
      'Please select your running type (just Copy Paste or select all first)'
    );
    console.log('1- Before copy and paste, select all content');
    console.log('2- Just copy selected value and past response on it.');
    const choice = await this.ask('Your choice (1-2): ');

    const selectedRuningType = this.runningOptions[Number(choice)];
    if (!selectedRuningType) {
      console.log('Invalid selection. Please try again.');
      return this.selectRuningType(); // Retry on invalid input
    }

    return selectedRuningType;
  }

  private async selectLanguage(): Promise<string> {
    console.log('Please select a language:');
    console.log('1. Turkish');
    console.log('2. Spanish');
    console.log('3. English');
    console.log('4. German');
    console.log('5. French');

    const choice = await this.ask('Your choice (1-5): ');

    const selectedLanguage = this.languageOptions[Number(choice)];
    if (!selectedLanguage) {
      console.log('Invalid selection. Please try again.');
      return this.selectLanguage(); // Retry on invalid input
    }

    return selectedLanguage;
  }

  private async selectModel(): Promise<string> {
    console.log('Please select a model:');
    console.log('1. gemini');
    console.log('2. llama');

    const choice = await this.ask('Your choice (1-2): ');

    const selectedModel = this.modelOptions[Number(choice)];
    if (!selectedModel) {
      console.log('Invalid selection. Please try again.');
      return this.selectModel(); // Retry on invalid input
    }

    return selectedModel;
  }

  private ask(question: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) =>
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer.trim());
      })
    );
  }

  getLanguage(): string {
    return this.language;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  getModel(): string {
    return this.model;
  }

  getRunningType(): string {
    return this.runningType;
  }
}

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}
