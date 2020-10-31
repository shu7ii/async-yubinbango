import { APIResponse } from "./types";

export const JSONP_FUNCTION_NAME = "$yubin";
export const API_RESPONSE_VAR_NAME = "__asyncYubinbangoAPIResponse";

declare global {
  interface Window {
    [JSONP_FUNCTION_NAME]: (result: APIResponse) => void;
    [API_RESPONSE_VAR_NAME]: Promise<APIResponse>;
  }
}
