import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Title from "../../ui/Title";

function FixedIncome() {
  return (
    <div>
      <Form>
        <Title as="h3" className="mb-6">
          fixed income
        </Title>
        <FormRow label="title" id="fixedTitle">
          <Input type="text" id="fixedTitle" />
        </FormRow>
        <FormRow label="amount" id="fixedAmount">
          <Input type="text" id="fixedAmount" />
        </FormRow>
        <div className="flex justify-end mt-6">
          <Button option="primary" size="large" type="button">
            add
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FixedIncome;
