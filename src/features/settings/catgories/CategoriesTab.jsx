import { Outlet, useLocation } from "react-router-dom";
import Row from "../../../ui/Row";
import CategoriesTable from "./CategoriesTable";

function CategoriesTab() {
    const location = useLocation();

    return (
        <>
            {location.pathname === `/settings/categories` ? (
                <>
                    <Row type="vertical">
                        <CategoriesTable />
                    </Row>
                </>
            ) : (
                <Outlet />
            )}
        </>
    );
}

export default CategoriesTab;
