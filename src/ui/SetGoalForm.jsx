import { useForm } from "react-hook-form";
import { handleEnter, handleFormat, parseNumber } from "../utils/functions";

import Title from "./Title";
import Input from "./Input";
import styled from "styled-components";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGoal } from "../services/apiGoals";
import toast from "react-hot-toast";

const Label = styled.label`
    color: var(--color-gray-900);
    text-transform: capitalize;
    font-size: 1.6rem;
    font-weight: 500;
`;

const Error = styled.span`
    color: var(--color-red-dark);
    font-size: 1.4rem;
`;

function SetGoalForm({ selectedDate, onCloseModal, category }) {
    const { register, handleSubmit, formState, setValue } = useForm();
    const { errors } = formState;
    const { month, year } = selectedDate;
    const queryClient = useQueryClient();

    const { mutate: createGoal, isPending: isCreating } = useMutation({
        mutationFn: addGoal,
        onSuccess: () => {
            toast.success("Income successfully added");
            queryClient.invalidateQueries({ queryKey: ["goals"] });
            onCloseModal();
        },
        onError: (err) => toast.error(err.message),
    });

    function onSubmit(data) {
        const newData = {
            Goal: parseNumber(data.Goal),
            Month: month,
            Year: year,
            Category: category,
        };
        createGoal(newData);
    }

    return (
        <>
            <div>
                <Title as="h2">set a goal</Title>
                <p className="text-[--color-gray-800]">
                    Monthly goals can only be set once. Choose carefully.
                </p>
            </div>
            <form
                name="setGoalForm"
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 flex flex-col gap-4"
            >
                <div className="flex justify-between items-center gap-[10rem]">
                    <Label id="goal">goal</Label>
                    <Input
                        type="text"
                        id="goal"
                        name="goal"
                        onKeyDown={handleEnter}
                        {...register("Goal", {
                            onChange: (e) => handleFormat(e, "Goal", setValue),
                            required: "This field is requiered",
                            validate: (value) => {
                                const unformatted = value.replace(/,/g, "");
                                return (
                                    /^\d+(\.\d{0,2})?$/.test(unformatted) ||
                                    "Only numbers are allowed"
                                );
                            },
                        })}
                    />
                </div>
                <div className="self-end">
                    {errors?.Goal?.message && (
                        <Error>{errors.Goal.message}</Error>
                    )}
                </div>
                <Button
                    option="primary"
                    size="large"
                    className="self-end"
                    disabled={isCreating}
                >
                    set
                </Button>
            </form>
        </>
    );
}

export default SetGoalForm;
