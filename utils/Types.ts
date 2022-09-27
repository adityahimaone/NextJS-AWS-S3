export interface IParams {
  Bucket: string | undefined;
  Key: string;
}

export interface IParamsUpload extends IParams {
  ContentType: string;
}

export interface IInitalState {
  loading: boolean;
  data: string[];
  error: string | undefined;
}

export interface IInitalStateS3 extends IInitalState {
  dataUnsignedUrl: string[];
}

export interface IFiles {
  name: string;
  type: string;
}
