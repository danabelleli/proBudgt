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

const StyledForm = styled.form`
  padding: 3rem 5rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
`;

function CategoriesSettings() {
  const { status, categories } = useCategories();

  if (status === "loading") return <Spinner />;

  return (
    <>
      <StyledForm>
        <FormRow label="category">
          <Input type="text" id="category" />
        </FormRow>
        <FormRow label="color">
          <Input type="text" id="color" />
        </FormRow>
        <div className="flex justify-end mt-6">
          <Button option="primary" size="medium">
            add
          </Button>
        </div>
      </StyledForm>

      <Table columns="1fr 1fr 2rem">
        <Table.Header>
          <div>category</div>
          <div>color</div>
          <div></div>
        </Table.Header>
        <Table.Body>
          {categories.map((category) => (
            <CategoryRow category={category} key={category.Id} />
          ))}
        </Table.Body>
      </Table>
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
