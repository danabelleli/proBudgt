import Form from "./Form";
import Title from "./Title";
import FormRow from "./FormRow";
import Row from "./Row";
import Input from "./Input";
import styled from "styled-components";
import Button from "./Button";

const Label = styled.label`
    color: var(--color-gray-900);
    text-transform: capitalize;
    font-size: 1.6rem;
    font-weight: 500;
`;

function SetGoalForm() {
    return (
        <>
            <div>
                <Title as="h2">set goal</Title>
                <p className="text-[--color-gray-800]">
                    you can only set a monthly goal once, set it wisely.
                </p>
            </div>
            <form className="mt-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <Label id="goal">goal</Label>
                    <Input type="text" id="goal" name="goal" />
                </div>
                <Button option="primary" size="large" className="self-end">
                    set
                </Button>
            </form>
        </>
    );
}

export default SetGoalForm;
