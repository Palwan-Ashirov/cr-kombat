import dayjs from "dayjs";

const provider = dayjs;

interface FormatDate {
  date?: string | number | Date;
  template?: string;
}

class UseDate {
  static date(date?: string | number | Date) {
    return provider(date);
  }

  static format(options?: FormatDate): string {
    return provider(options?.date).format(options?.template);
  }
}

export { UseDate };