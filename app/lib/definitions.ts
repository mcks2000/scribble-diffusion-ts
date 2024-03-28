export type pathsData = {
  drawMode: boolean;
  strokeColor: string;
  strokeWidth: number;
  paths: { x: number; y: number; }[];
  startTimestamp: number;
  endTimestamp: number;
}[]



export type PredictionReqParams = {
  prompt: string;
  image: string,
  structure: string,
  replicate_api_token: string,
}

export type PredictionsEntry = {
  id: string;
  uuid: string;
  output: string;
  created_at: string;
  error: string;
  logs: string;
  model: string;
  status: string;
  version: string;
  webhook: string;
  input: {
    image: string;
    prompt: string;
    replicate_api_token: string;
    structure: string;
  };
  urls: {
    cancel: string;
    get: string;
  };
  webhook_events_filter: [number];
}