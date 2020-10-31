import { Address, APIResponse } from "./types";
import { URL, REGION } from "./constants";
import { JSONP_FUNCTION_NAME, API_RESPONSE_VAR_NAME } from "./global";

window[JSONP_FUNCTION_NAME] = (result: APIResponse) => {
  window[API_RESPONSE_VAR_NAME] = Promise.resolve(result);
};

export const get = async (zip: string): Promise<Address> => {
  const yubin3 = zip.slice(0, 3);
  return new Promise(async (resolve, reject) => {
    await import(`${URL}/${yubin3}.js`);
    const result: APIResponse = await window[API_RESPONSE_VAR_NAME];
    const data = result[zip];
    if (data == undefined) {
      // TODO: reject -> resolve
      reject("not found");
      return;
    }

    const address: Address = {
      region_id: data[0],
      region: REGION[data[0]],
      locality: data[1],
      street: data[2],
      extended: data[3],
    };

    resolve(address);
  });
};

/** Address形式のデータをstringに変換する */
export const addressToString = ({
  region,
  locality = "",
  street = "",
  extended = "",
}: Address): string => {
  return `${region}${locality}${street}${extended}`;
};
