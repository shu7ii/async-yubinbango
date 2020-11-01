import { Address, APIResponse } from "./types";
import { URL, REGION } from "./constants";

globalThis.$yubin = (result: APIResponse) => {
  globalThis.asyncYubinbangoAPIResponse = Promise.resolve(result);
};

/** stringの郵便番号からAddressを取得する */
export const get = async (zip: string): Promise<Address> => {
  const yubin3 = zip.slice(0, 3);
  return new Promise(async (resolve, reject) => {
    await import(/* webpackIgnore: true */ `${URL}/${yubin3}.js`);
    const result: APIResponse = await globalThis.asyncYubinbangoAPIResponse;
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
