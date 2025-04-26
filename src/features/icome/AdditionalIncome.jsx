import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Title from "../../ui/Title";

function AdditionalIncome() {
  return (
    <div>
      <Form>
        <Title as="h3" className="mb-6">
          additional income
        </Title>
        <FormRow label="title" id="additionalTitle">
          <Input type="text" id="additionalTitle" />
        </FormRow>
        <FormRow label="amount" id="additionalAmount">
          <Input type="text" id="additionalAmount" />
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

export default AdditionalIncome;
