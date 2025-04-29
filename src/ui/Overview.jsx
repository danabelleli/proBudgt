import { generateYears, getMonthDates } from "../utils/functions";
import { months } from "../utils/data";

import Select from "./Select";
import Title from "./Title";

function Overview({ page, selectedMonth, selectedYear, onSelectDate }) {
  const years = generateYears();

  return (
    <div className="flex justify-between col-span-2">
      <div>
        <Title as="h1">{page} overview</Title>
        <p className="text-[--color-gray-800]">
          {getMonthDates(selectedMonth, selectedYear)}
        </p>
      </div>
      <div className="flex space-x-6">
        <Select
          options={months}
          size="w-[15rem]"
          onChange={(option) =>
            onSelectDate({ month: Number(option.value), year: selectedYear })
          }
          inputValue={months.find(
            (m) => Number(m.value) === Number(selectedMonth)
          )}
        />
        <Select
          options={years}
          size="w-[10rem]"
          onChange={(option) =>
            onSelectDate({
              month: Number(selectedMonth),
              year: Number(option.value),
            })
          }
          inputValue={{ value: selectedYear, label: String(selectedYear) }}
        />
      </div>
    </div>
  );
}

export default Overview;
