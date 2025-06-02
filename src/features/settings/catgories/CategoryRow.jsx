import { PencilIcon } from "@heroicons/react/24/outline";
import Table from "../../../ui/Table";
import { Link } from "react-router-dom";
import CategoriesTable from "./CategoriesTable";
import Modal from "../../../ui/Modal";
import CategoryForm from "./CategorieForm";

function CaegoryRow({ category }) {
    return (
        <Table.Row>
            <div>{category.Label}</div>
            <div className="flex justify-between items-center">
                <p>{category.Color}</p>
                <span
                    className="w-10 h-10 rounded-md inline-block"
                    style={{ backgroundColor: category.Color }}
                ></span>
            </div>
            <Modal>
                <Modal.Open opens="editCategory">
                    <PencilIcon className="cursor-pointer" />
                </Modal.Open>
                <Modal.Window name="editCategory">
                    <CategoryForm category={category} />
                </Modal.Window>
            </Modal>
        </Table.Row>
    );
}

export default CaegoryRow;
