import { calculateProgress } from "../utils/functions";

function ProgressBar({ goal = 0, moneyMade = 0 }) {
  const progress = calculateProgress(moneyMade, goal);
  const visualProgress = Math.min(progress, 100); // Limit visual width to 100%

  function formatCurrency(value, { noDecimals = false } = {}) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: noDecimals ? 0 : 2,
      maximumFractionDigits: noDecimals ? 0 : 2,
    });
  }

  const formattedMoneyMade = formatCurrency(moneyMade); // with decimals
  const formattedGoal = formatCurrency(goal, { noDecimals: true }); // no decimals

  return (
    <div className="relative w-full">
      {/* Progress Bar */}
      <div className="w-full h-16 bg-[--color-gray-200] rounded-[1.5rem] overflow-hidden">
        {progress > 0 && (
          <div
            className="h-16 flex items-center justify-center rounded-[1.5rem] text-[1.4rem] font-medium transition-all duration-300"
            style={{
              width: `${visualProgress}%`,
              backgroundImage: "linear-gradient(to right, #b5c99a, #505d3c)",
              color: "#fff",
            }}
          >
            {`${progress}%`}
          </div>
        )}
      </div>

      {/* Labels */}
      <div className="absolute top-full left-0 mt-4 w-full">
        <div className="relative w-full h-5">
          {/* $0 Label */}
          <span className="absolute left-0 transform -translate-x-1/2 font-medium">
            $0
          </span>

          {/* MoneyMade Label */}
          {moneyMade > 0 && (
            <span
              className="absolute transform -translate-x-14 -translate-y-32 text-[1.6rem]"
              style={{ left: `${visualProgress}%` }}
            >
              {formattedMoneyMade}
            </span>
          )}

          {/* Goal Label */}
          <span className="absolute right-0 transform translate-x-1/2 font-medium">
            {formattedGoal}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
