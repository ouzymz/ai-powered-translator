import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import { ConfigPanelService } from '@translator/config-panel';

@Injectable()
export class GoogleApiService implements OnModuleInit {
  constructor(
    private eventEmitter: EventEmitter2,
    private configService: ConfigPanelService
  ) {}

  async onModuleInit() {}

  @OnEvent('clipboard.content')
  async handleClipboardEvent(content: string) {
    try {
      if (this.configService.getModel() === 'gemini') {
        const translation = await this.translateTextGemini(content);
        this.eventEmitter.emit(`ai.response`, translation);
      } else {
        const translation = await this.translateTextOpenAi(content);
        this.eventEmitter.emit(`ai.response`, translation);
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  }

  async translateTextGemini(text: string) {
    try {
      const ai = new GoogleGenAI({
        apiKey: this.configService.getApiKey(),
      });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-lite',
        contents:
          `Translate ${this.configService.getLanguage()} to English. Return only the translation of the given text! Given Text: "` +
          // `Translate Turkish to English. Return only the translation of the given text! Given Text: "` +
          text +
          '"',
      });
      console.log('google response :', response.text);
      return response.text;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  onModuleDestroy() {
    // Unsubscribe from events
    this.eventEmitter.removeAllListeners('ai.response');
    this.eventEmitter.removeAllListeners('clipboard.content');
  }

  async translateTextOpenAi(text: string, targetLanguage = 'en') {
    try {
      const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: this.configService.getApiKey(),
      });
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: 'user',
            content:
              `Translate ${this.configService.getLanguage()} to English. Return only the translation of the given text! Given Text: "` +
              // `Translate Turkish to English. Return only the translation of the given text! Given Text: "` +
              text +
              '"',
          },
        ],
        model: 'meta-llama/llama-4-maverick:free',
      });

      console.log(completion);
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Translation error:', error);
      throw error;
    }
  }
}
