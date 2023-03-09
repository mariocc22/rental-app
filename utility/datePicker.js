import { AmpPlugin, easepick, LockPlugin } from "@easepick/bundle";
import { RangePlugin } from "@easepick/range-plugin";

// Select price and date

function calendarBook(min = "", max = "") {
  const picker = new easepick.create({
    element: document.getElementById("datepicker"),
    css: ["https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css"],
    zIndex: 10,
    autoApply: false,
    AmpPlugin: {
      // reset dates
      resetButton: true,
      darkMode: false,
    },
    LockPlugin: {
      // disable the following dates within this range (YYYY-MM-DD)
      minDate: min,
      maxDate: max,
    },
    plugins: [RangePlugin, AmpPlugin, LockPlugin],
  });
}
export { calendarBook };
