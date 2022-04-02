export interface BufferFile {
  fieldName: string;
  originalname: string;
  encoding: string;
  mimetype: AppMimeType;
  size: number;
  buffer: Buffer | String;
}

export type AppMimeType = "image/png" | "image/jpeg";
