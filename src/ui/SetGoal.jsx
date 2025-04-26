import Button from "./Button";
import Form from "./Form";
import FormRow from "./FormRow";
import Input from "./Input";
import Title from "./Title";

function SetGoal() {
  return (
    <div>
      <Form>
        <Title as="h3" className="mb-6">
          set goal
        </Title>
        <FormRow label="amount" id="goalAmount">
          <Input type="text" id="goalAmount" />
        </FormRow>
        <div className="flex justify-end mt-6">
          <Button option="primary" size="large" type="button">
            set
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SetGoal;
