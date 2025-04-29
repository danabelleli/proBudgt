import { useState } from "react";
import Select from "./Select";
import Title from "./Title";
import { generateYears, getMonthDates } from "../utils/functions";
import { months } from "../utils/data";

function Overview({ page }) {
    const currentYear = new Date().getFullYear();
    const years = generateYears();

    const now = new Date();
    const currentMonthIndex = now.getMonth(); // 0 = January, 1 = February, etc

    const [selectedMonth, setSelectedMonth] = useState(
        months[currentMonthIndex]
    );
    const [selectedYear, setSelectedYear] = useState(currentYear);

    console.log(selectedMonth, selectedYear);

    function handleMonthChange(option) {
        setSelectedMonth(option);
    }

    function handleYearChange(option) {
        setSelectedYear(option.value);
    }

    return (
        <div className="flex justify-between col-span-2">
            <div>
                <Title as="h1">{page} overview</Title>
                <p className="text-[--color-gray-800]">
                    {getMonthDates(selectedMonth?.value, selectedYear)}
                </p>
            </div>
            <div className="flex space-x-6">
                <Select
                    options={months}
                    size="w-[15rem]"
                    onChange={handleMonthChange}
                    inputValue={selectedMonth}
                />
                <Select
                    options={years}
                    size="w-[10rem]"
                    onChange={handleYearChange}
                    inputValue={{
                        value: selectedYear,
                        label: String(selectedYear),
                    }}
                />
            </div>
        </div>
    );
}

export default Overview;
