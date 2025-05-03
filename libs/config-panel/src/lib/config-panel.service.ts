import { Injectable } from '@nestjs/common';
import * as readline from 'readline';

@Injectable()
export class ConfigPanelService {
  private language!: string;
  private apiKey!: string;
  private model!: string;

  private languageOptions: Record<number, string> = {
    1: 'tr', // Turkish
    2: 'es', // Spanish
    3: 'en', // English
    4: 'de', // German
    5: 'fr', // French
  };
  private modelOptions: Record<number, string> = {
    1: 'gemini', // Turkish
    2: 'meta-llama', // Spanish
  };

  async onModuleInit() {
    this.language = await this.selectLanguage();
    this.model = await this.selectModel();
    this.apiKey = await this.ask('Please enter your API Key: ');

    console.log(this.language, this.model, this.apiKey);
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
}
