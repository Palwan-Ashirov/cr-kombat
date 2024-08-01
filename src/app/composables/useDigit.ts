class UseDigit {
  static rounded(num: number, n: number = 0, x: number = 3) : string | 0 {
    if (!num) {
      return 0;
    }

    const number = Number(num);

    if (!number) {
      return 0;
    }

    const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
    return number
      .toFixed(Math.max(0, ~~n))
      .replace(new RegExp(re, "g"), "$&,")
      .replace(/\.0+$/, "");
  }
}

export { UseDigit };