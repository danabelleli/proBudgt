import { DayPicker } from "react-day-picker";
import { format, isValid, parse } from "date-fns";
import { CalendarDateRangeIcon } from "@heroicons/react/20/solid";
import Input from "./Input";

function DatePicker({
  onChange,
  onBlur,
  selected,
  isOpen,
  handleIsOpen,
  onKeyDown,
}) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handleDayPickerSelect = (date) => {
    if (!date) {
      onChange("");
    } else {
      onChange(format(date, "MM/dd/yyyy"));
      handleIsOpen(false);
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const parsedDate = parse(selected, "MM/dd/yyyy", new Date());
      if (isValid(parsedDate)) {
        onChange(format(parsedDate, "MM/dd/yyyy"));
      } else {
        onChange("");
      }
      e.preventDefault();
    }
    if (onKeyDown) onKeyDown(e);
  };

  const parsedDate = selected
    ? parse(selected, "MM/dd/yyyy", new Date())
    : undefined;

  return (
    <div className="relative flex items-center">
      <Input
        type="text"
        value={selected || ""}
        onChange={handleInputChange}
        onBlur={onBlur}
        placeholder="MM/DD/YYYY"
        onKeyDown={handleInputKeyDown}
        onClick={() => handleIsOpen((open) => !open)}
        className="w-full"
      />
      <div className="absolute inset-y-0 right-0 flex py-1.5 pr-3">
        <kbd className="inline-flex items-center rounded border-none px-1 font-sans text-3xl text-[--color-grey-400]">
          <CalendarDateRangeIcon
            className="hover:cursor-pointer size-10 fill-[--color-gray-500]"
            onClick={() => handleIsOpen((open) => !open)}
          />
        </kbd>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-max rounded-[1.5rem] border bg-white p-4 shadow-lg">
          <DayPicker
            month={parsedDate || new Date()}
            onMonthChange={(month) => {}}
            mode="single"
            selected={parsedDate}
            onSelect={handleDayPickerSelect}
            captionLayout="dropdown"
            weekStartsOn={0}
            startMonth={new Date(2009, 1)}
            endMonth={new Date(2098, 9)}
            classNames={{
              chevron: `fill-[--color-primary-900]`,
              today: "text-[--color-primary-900]",
              selected:
                "font-bold border-2 rounded rounded-full border-[--color-primary-900]",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DatePicker;
