type PredictionReqParams = {
  prompt: string;
  image: string,
  structure: string,
  replicate_api_token: string | null,
}

type PredictionsEntry = {
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


export type { PredictionReqParams, PredictionsEntry }