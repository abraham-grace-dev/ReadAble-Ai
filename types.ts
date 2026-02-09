
export enum View {
  LANDING = 'LANDING',
  WORKSPACE = 'WORKSPACE'
}

export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface AttachedFile {
  name: string;
  type: string;
  data: string; // Base64 or Text content
  isBinary: boolean;
}

export interface ChatHistory {
  [fileId: string]: Message[];
}
