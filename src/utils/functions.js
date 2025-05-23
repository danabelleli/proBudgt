import { addMonths, getDate, parseISO, set } from "date-fns";

export function calculateProgress(moneyMade, goal) {
    const safeMoneyMade = Number(moneyMade) || 0;
    const safeGoal = Number(goal) || 0;
    if (safeGoal === 0) return 0;
    return Math.round((safeMoneyMade / safeGoal) * 100);
}

export function getMonthDates(monthValue, year) {
    const monthIndex = parseInt(monthValue) - 1;
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    const options = { month: "long", day: "numeric", year: "numeric" };
    const start = firstDay.toLocaleDateString("en-US", options);
    const end = lastDay.toLocaleDateString("en-US", options);

    return `${start} - ${end}`;
}

export function generateYears() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = January, 11 = December

    if (currentMonth === 11) {
        // It's December -> show this year + next year
        return [
            { id: 1, value: currentYear, label: String(currentYear) },
            { id: 2, value: currentYear + 1, label: String(currentYear + 1) },
        ];
    } else {
        // Any other month -> only show this year
        return [{ id: 1, value: currentYear, label: String(currentYear) }];
    }
}

// Remove commas and return a valid number
export const parseNumber = (value) => {
    if (typeof value !== "string") return ""; // Ensure value is a string before calling replace
    const rawValue = value.replace(/,/g, ""); // Remove commas
    // If it's an empty string or just a dot, return the raw value to allow typing
    if (rawValue === "" || rawValue === ".") return rawValue;
    // Try to parse the cleaned value as a valid number
    const number = parseFloat(rawValue);
    return !isNaN(number) ? number : ""; // Convert to number if valid, otherwise return empty string
};

// Formatting number input WHEN TYPING
export function handleFormat(e, fieldName, setValue) {
    let value = e.target.value.replace(/,/g, ""); // Remove commas
    // Allow numbers and a single decimal point
    if (!/^\d*\.?\d*$/.test(value)) return;
    // Format with commas and ensure up to two decimal places
    if (value) {
        let [integer, decimal] = value.split(".");
        integer = parseInt(integer || "0", 10).toLocaleString("en-US");
        value =
            decimal !== undefined
                ? `${integer}.${decimal.slice(0, 2)}`
                : integer;
    }
    setValue(fieldName, value);
}

// Formatting number initially when displayed on page in a form
export function formatNumber(number) {
    if (number === null) return "";
    return Number(number).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

// When clicking on Enter in an input it won't exit from the form
export const handleEnter = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
    }
};

export function generateChartData(arr, monthDays = 31) {
    const dailyTotal = Array.from({ length: monthDays }, (_, i) => ({
        label: String(i + 1),
        total: 0,
    }));

    arr.forEach((item) => {
        if (!item.TransactionDate) return;
        const parsedDate = parseISO(item.TransactionDate);
        const day = getDate(parsedDate);
        dailyTotal[day - 1].total += Number(item.Amount || 0);
    });

    return dailyTotal;
}

function getDaysInMonth(year, month) {
    // month is 1-based (e.g., May = 5)
    return new Date(year, month, 0).getDate();
}

export function generateCycledEntries(data) {
    const [yearStr, monthStr, dayStr] = data.TransactionDate.split("-");
    const originalYear = Number(yearStr);
    const originalMonth = Number(monthStr); // 1-based
    const originalDay = Number(dayStr);

    const entries = [];

    for (let i = 0; i < data.Cycle; i++) {
        const totalMonths = originalMonth - 1 + i;
        const newYear = originalYear + Math.floor(totalMonths / 12);
        const newMonth = (totalMonths % 12) + 1;

        const maxDay = getDaysInMonth(newYear, newMonth);
        const safeDay = Math.min(originalDay, maxDay);

        const formattedMonth = String(newMonth).padStart(2, "0");
        const formattedDay = String(safeDay).padStart(2, "0");
        const formattedDate = `${newYear}-${formattedMonth}-${formattedDay}`;

        entries.push({
            ...data,
            TransactionDate: formattedDate,
            Month: newMonth,
            Year: newYear,
        });
    }

    return entries;
}
