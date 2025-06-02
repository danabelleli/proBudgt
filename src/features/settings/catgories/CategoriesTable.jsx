import { useCategories } from "../../../hooks/useCategories";
import { useState } from "react";

import CategoryRow from "./CategoryRow";
import styled from "styled-components";
import FormRow from "../../../ui/FormRow";
import Input from "../../../ui/Input";
import Row from "../../../ui/Row";
import Button from "../../../ui/Button";
import Table from "../../../ui/Table";
import Spinner from "../../../ui/Spinner";

function CategoriesTable() {
    const { status, categories } = useCategories();

    if (status === "loading") return <Spinner />;

    return (
        <>
            <Row type="vertical">
                <Table columns="20rem 12rem 2rem" height="60rem" width="50rem">
                    <Table.Header>
                        <div>category</div>
                        <div>color</div>
                        <div></div>
                    </Table.Header>
                    <Table.Body>
                        {categories?.map((category) => (
                            <CategoryRow
                                category={category}
                                key={category.Id}
                            />
                        ))}
                    </Table.Body>
                </Table>
            </Row>
        </>
    );
}

export default CategoriesTable;
