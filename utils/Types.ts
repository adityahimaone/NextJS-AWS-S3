export interface IParams {
  Bucket: string | undefined;
  Key: string;
}

export interface IParamsUpload extends IParams {
  ContentType: string;
}
