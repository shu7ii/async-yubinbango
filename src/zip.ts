const FULL_WIDTH_DIGIT_ZERO = 65296; // "０".codePointAt(0);
const FULL_WIDTH_DIGIT_NINE = 65305; // "９".codePointAt(0);

/** 全角数字かどうかの判定 */
const isZenkakuDigit = (c: string): boolean => {
  const codePoint = c.codePointAt(0);
  if (codePoint == undefined) {
    return false;
  }

  return (
    FULL_WIDTH_DIGIT_ZERO <= codePoint && codePoint <= FULL_WIDTH_DIGIT_NINE
  );
};

// const DIGIT_ZERO = 30; // "0".codePointAt(0);

/** 全角数字と半角数字のUnicodeポイントの距離 */
const DISTANCE_BETWEEN_ZEN_HAN = 65248; // FULL_WIDTH_DIGIT_ZERO - DIGIT_ZERO;

/** 全角数字を半角数字にする */
const toHankakuDigit = (c: string): string => {
  const codePoint = c.codePointAt(0);
  if (codePoint == undefined) {
    return c;
  }

  return String.fromCodePoint(codePoint - DISTANCE_BETWEEN_ZEN_HAN);
};

/** ハイフンっぽい文字かどうか */
const isHyphenLike = (c: string) => {
  return c === "-" || c === "ー";
};

/** 郵便番号の正規化（全角 -> 半角、ハイフンっぽい文字の除去） */
export const normalize = (zipLike: string): string => {
  return [...zipLike]
    .map((c) => (isZenkakuDigit(c) ? toHankakuDigit(c) : c))
    .filter((c) => !isHyphenLike(c))
    .join("");
};

/** 7桁の半角数値かどうか */
export const isZip = (zipLike: string): boolean => /^\d{7}$/.test(zipLike);
