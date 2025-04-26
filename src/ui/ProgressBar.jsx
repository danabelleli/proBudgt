import { calculateProgress } from "../utils/utilsFunctions";

function ProgressBar({ goal = 0, moneyMade = 0 }) {
  // Calculate progress inside
  // function calculateProgress(moneyMade, goal) {
  //   if (!goal || goal === 0) return 0; // Avoid division by zero
  //   const progress = (moneyMade / goal) * 100;
  //   return Math.round(progress); // No cap, show real %
  // }

  const progress = calculateProgress(moneyMade, goal);
  const visualProgress = Math.min(progress, 100); // Limit visual width to 100%

  return (
    <div className="relative w-full">
      {/* Progress Bar */}
      <div className="w-full h-16 bg-[--color-gray-200] rounded-[1.5rem] overflow-hidden">
        {progress > 0 && (
          <div
            className="h-16 flex items-center justify-center bg-[--color-primary-500] rounded-[1.5rem] dark:bg-[--color-gray-200] text-[1.4rem] font-medium transition-all duration-300"
            style={{ width: `${visualProgress}%` }}
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
              className="absolute transform -translate-x-14 -translate-y-28 text-[1.4rem]"
              style={{ left: `${visualProgress}%` }}
            >
              {`$${moneyMade}`}
            </span>
          )}

          {/* Goal Label */}
          <span className="absolute right-0 transform translate-x-1/2 font-medium">
            {`$${goal}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
