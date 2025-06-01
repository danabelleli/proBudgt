import { useCategories } from "../../hooks/useCategories";
import { Link } from "react-router-dom";
import { PencilIcon } from "@heroicons/react/24/outline";

import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import Table from "../../ui/Table";
import GridRow from "../../ui/GridRow";
import Spinner from "../../ui/Spinner";
import { useState } from "react";

const StyledForm = styled.form`
    padding: 0 5rem;
    background-color: var(--color-white);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    height: 25rem;
    width: 50rem;

    display: flex;
    flex-direction: column;
    justify-content: center;

    input[type="color"] {
        height: 3.5rem;
        width: 100%;
        border-radius: 1.5rem;
        padding: 1rem;
    }
`;

const ColorDisplay = styled.span`
    padding: 0.5rem 2rem;
    border-radius: 5px;
    box-shadow: var(--shadow-sm);
    width: 90%;
    height: 4rem;
`;

const Label = styled.label`
    color: var(--color-gray-900);
    text-transform: capitalize;
    font-size: 1.6rem;
    font-weight: 500;
`;

const FormRowColor = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: 15rem 1fr;
    gap: 5rem;
    border-bottom: 1px solid var(--color-gray-200);

    padding: 1.3rem 0;
`;

function CategoriesSettings() {
    const { status, categories } = useCategories();

    const [color, setColor] = useState("#fff");

    if (status === "loading") return <Spinner />;

    return (
        <>
            <Row type="vertical">
                <StyledForm>
                    <FormRow label="category">
                        <Input type="text" id="category" />
                    </FormRow>

                    <FormRowColor>
                        <Label id="color">color</Label>
                        <div className="flex gap-4 items-end">
                            <span className="text-[1.4rem]">{color}</span>
                            <ColorDisplay style={{ backgroundColor: color }} />
                            <input
                                type="color"
                                id="color"
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                            />
                        </div>
                    </FormRowColor>

                    <div className="flex justify-end mt-6">
                        <Button option="primary" size="medium">
                            add
                        </Button>
                    </div>
                </StyledForm>
                <Table columns="20rem 10rem 2rem" height="60rem" width="50rem">
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

            {/* <Row>
                <Table columns="1fr 1fr 2rem" width="50%">
                    <Table.Header>
                        <div>category</div>
                        <div>color</div>
                        <div></div>
                    </Table.Header>
                    <Table.Body>
                        {categories.map((category) => (
                            <CategoryRow
                                category={category}
                                key={category.Id}
                            />
                        ))}
                    </Table.Body>
                </Table>
            </Row> */}
        </>
    );
}

function CategoryRow({ category }) {
    return (
        <Table.Row>
            <p>{category.Value}</p>
            <p>{category.Color}</p>
            <Link to="/">
                <PencilIcon className="cursor-pointer" />
            </Link>
        </Table.Row>
    );
}

export default CategoriesSettings;
