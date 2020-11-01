import { APIResponse } from "./types";

declare global {
  namespace globalThis {
    var $yubin: (result: APIResponse) => void;
    var asyncYubinbangoAPIResponse: Promise<APIResponse>;
  }
}
