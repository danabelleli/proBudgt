import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-day-picker/style.css";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Incomes from "./pages/Incomes";
import Savings from "./pages/Savings";
import Settings from "./pages/Settings";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import IncomeForm from "./features/icome/IncomeForm";
import Expenses from "./pages/Expenses";
import Budget from "./pages/Budget";
import ExpensesForm from "./features/expenses/ExpensesForm";
import CategoriesTab from "./features/settings/catgories/CategoriesTab";
import UserTab from "./features/settings/user/UserTab";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 10 * 60 * 1000, // 10 min
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <GlobalStyles />
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route
                            index
                            element={<Navigate replace to="dashboard" />}
                        />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="incomes" element={<Incomes />}>
                            <Route path="addIncome" element={<IncomeForm />} />
                            <Route path=":Id" element={<IncomeForm />} />
                        </Route>
                        <Route path="expenses" element={<Expenses />}>
                            <Route
                                path="addExpense"
                                element={<ExpensesForm />}
                            />
                            <Route path=":Id" element={<ExpensesForm />} />
                        </Route>

                        <Route path="budget" element={<Budget />} />
                        <Route path="savings" element={<Savings />} />

                        <Route path="settings" element={<Settings />}>
                            <Route
                                index
                                element={<Navigate replace to="user" />}
                            />
                            <Route path="user" element={<UserTab />} />
                            <Route
                                path="categories"
                                element={<CategoriesTab />}
                            />
                        </Route>
                    </Route>

                    <Route path="login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{
                    margin: "8px",
                }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "var(--color-white)",
                        color: "var(--color-gray-800)",
                        borderRadius: "20px",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
