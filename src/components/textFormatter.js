import "intl";
import "intl/locale-data/jsonp/mn-MN";

import * as constants from "@app/constants";

import { DateTime } from "luxon";

const { dateTimeFormat = "" } = constants ?? {};

export function CurrencyFormatter(currencyCode = "MNT", locales = "mn-MN") {
  const options = {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  };

  return new Intl.NumberFormat(locales, options);
}

export function DateTimeFormatter(text = null, format = dateTimeFormat) {
  if (text) {
    return DateTime?.fromISO(text)?.toFormat(format);
  } else {
    return null;
  }
}

export function DurationFormatter(dateISOString = null) {
  if (!dateISOString) {
    return;
  }

  const now = DateTime?.now();
  const createdDate = DateTime.fromISO(dateISOString);

  const dur = now.diff(createdDate, ["hours", "minutes"]).toObject();

  if (dur?.hours > 1 && dur?.hours < 24) {
    return `${Math.floor(dur?.hours)} цагийн өмнө`;
  } else if (dur?.hours < 1 && dur?.minutes > 0) {
    return `${Math.floor(dur?.minutes)} минутын өмнө`;
  }

  return DateTimeFormatter(dateISOString);
}
