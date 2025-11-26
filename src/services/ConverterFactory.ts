// Factory to create the appropriate converter service

import { IConverterService } from './IConverterService';
import { ElectronConverterService } from './ElectronConverterService';
import { WebConverterService } from './WebConverterService';

export class ConverterFactory {
  private static instance: IConverterService | null = null;

  static getConverter(): IConverterService {
    if (this.instance) {
      return this.instance;
    }

    // Check if running in Electron
    const isElectron = typeof window !== 'undefined' && 
                      window.electronAPI !== undefined;

    this.instance = isElectron 
      ? new ElectronConverterService()
      : new WebConverterService();

    return this.instance;
  }

  static isElectron(): boolean {
    return typeof window !== 'undefined' && window.electronAPI !== undefined;
  }

  static isWeb(): boolean {
    return !this.isElectron();
  }
}
