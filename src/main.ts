const URL = "https://yubinbango.github.io/yubinbango-data/data";

const REGION = [
  "",
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
] as const;

type Address = {
  readonly region_id: number;
  readonly region: string;
  readonly locality?: string;
  readonly street?: string;
  readonly extended?: string;
};

type RawAddress = readonly [
  regionID: number,
  region: string,
  locality?: string,
  street?: string,
  extended?: string
];

type APIResponse = {
  [zip: string]: RawAddress;
};

const JSONP_FUNCTION_NAME = "$yubin";

const SCRIPT_ID = "ENX732Q7X5ARV4KEXQZG0P4T01";

declare global {
  interface Window {
    [JSONP_FUNCTION_NAME]: (result: APIResponse) => void;
  }
}

const jsonp = (url: string, cb: (result: APIResponse) => void) => {
  window[JSONP_FUNCTION_NAME] = (result: APIResponse) => cb(result);

  const script = document.createElement("script");
  script.setAttribute("id", SCRIPT_ID);
  script.setAttribute("src", url);
  document.head.appendChild(script);
};

export const get = async (zip: string): Promise<Address> => {
  const yubin3 = zip.slice(0, 3);

  return new Promise((resolve, reject) => {
    jsonp(`${URL}/${yubin3}.js`, (result: APIResponse) => {
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

    document.querySelector(`#${SCRIPT_ID}`)?.remove();
  });
};
