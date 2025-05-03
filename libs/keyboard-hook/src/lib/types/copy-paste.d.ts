declare module 'copy-paste' {
  export function copy(text: string, callback?: (err: Error) => void): void;
  export function paste(callback: (err: Error, content: string) => void): void;
  export function copySync(text: string): void;
  export function pasteSync(): string;
}
