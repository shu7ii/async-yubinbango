import { Address, APIResponse } from "./types";
import { URL, REGION } from "./constants";

/**
 * urlをsrcとする<script>を作ってheadに挿入する
 *
 * JSONPで読み込むスクリプトは
 * $yubinという関数にAPIResponse型のデータを渡して実行するので
 * それをresolveするPromiseを返す
 */
const jsonp = (url: string): Promise<APIResponse> => {
  const script = document.createElement("script");
  return new Promise((res) => {
    globalThis.$yubin = (response: APIResponse) => {
      res(response);
      script.remove();
    };

    script.src = url;
    document.head.appendChild(script);
  });
};

/** stringの郵便番号からAddressを取得する */
export const get = async (zip: string): Promise<Address> => {
  const head3 = zip.slice(0, 3);

  return new Promise(async (resolve, reject) => {
    const response: APIResponse = await jsonp(`${URL}/${head3}.js`);

    const data = response[zip];
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
