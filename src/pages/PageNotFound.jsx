import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function PageNotFound() {
  return (
    <main className="flex justify-center h-screen items-center bg-[--color-secondary-300]">
      <div className="text-center bg-[--color-white] py-20 px-24 rounded-[--border-radius-md] drop-shadow-[--shadow-md]">
        <p className="text-[1.4rem] font-medium text-[--color-primary-900]">
          404
        </p>
        <h1 className="mt-4 text-balance text-[5rem] font-semibold tracking-tight text-[--color-gray-900]">
          Page not found
        </h1>
        <p className="mt-4 text-pretty text-[1.6rem] font-medium text-[--color-gray-800]">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/">
            <Button option="primary" size="large">
              go back home
            </Button>
          </Link>
          <Button option="secondary" size="large">
            contact support
          </Button>
        </div>
      </div>
    </main>
  );
}
