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
