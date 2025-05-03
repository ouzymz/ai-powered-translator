import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import {
  GlobalKeyboardListener,
  IGlobalKeyEvent,
  IGlobalKeyDownMap,
  IGlobalKey,
} from 'node-global-key-listener';
import * as copyPaste from 'copy-paste';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { exec } from 'child_process';
import * as path from 'path';

@Injectable()
export class KeyboardHookService implements OnModuleInit, OnModuleDestroy {
  private keyboard: GlobalKeyboardListener;

  constructor(private eventEmitter: EventEmitter2) {
    this.keyboard = new GlobalKeyboardListener();
  }

  onModuleInit() {
    // Set up default listeners
    this.keyboard.addListener(
      (e: IGlobalKeyEvent, isDown: IGlobalKeyDownMap) => {
        const eventName = isDown[e.name as IGlobalKey] ? 'keydown' : 'keyup';
        if (e.name === 'INS' && eventName === 'keydown') {
          this.eventEmitter.emit(`keyboard.start`);
        }
      }
    );
  }

  @OnEvent('keyboard.start')
  async handleStartKeyDown() {
    await this.runAHKScript('get-request.ahk');

    copyPaste.paste((err: Error, content: string) => {
      if (err) {
        console.error('Error reading clipboard:', err);
        return;
      }
      if (content) {
        console.log('copied content :', content);
        this.eventEmitter.emit('clipboard.content', content);
      }
    });
  }

  @OnEvent('ai.response')
  async handleGoogleResponse(payload: string) {
    copyPaste.copy(payload, (err: Error) => {
      if (err) {
        console.error('Error reading clipboard:', err);
        return;
      }
    });

    try {
      await this.runAHKScript('send-response.ahk');
    } catch (error) {
      console.log(error, 'AHKService');
    }
  }

  private async runAHKScript(name: string) {
    const scriptPath = path.join(
      __dirname,
      '..',
      '..',
      'translator',
      'src',
      'ahks',
      name
    );
    return new Promise((resolve, reject) => {
      exec(scriptPath, (error, stdout, stderr) => {
        if (error) {
          reject(`exec error: ${error}`);
          return;
        }
        if (stderr) {
          reject(`stderr: ${stderr}`);
          return;
        }
        resolve(`stdout: ${stdout}`);
      });
    });
  }

  onModuleDestroy() {
    this.eventEmitter.removeAllListeners('keyboard.start');
    this.eventEmitter.removeAllListeners('clipboard.content');

    if (this.keyboard) {
      this.keyboard.kill();
    }
  }
}
