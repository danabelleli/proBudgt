import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import {
  formatNumber,
  handleEnter,
  handleFormat,
  parseNumber,
} from "../../utils/functions";
import {
  addIncome,
  deleteIncome,
  updateIncome,
} from "../../services/apiIncome";

import toast from "react-hot-toast";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Title from "../../ui/Title";
import Row from "../../ui/Row";
import Button from "../../ui/Button";
import DatePicker from "../../ui/DatePicker";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import {
  addExpense,
  deleteExpense,
  updateExpense,
} from "../../services/apiExpenses";
import Select from "../../ui/Select";
import { personalCategories } from "../../utils/data";

function ExpensesForm() {
  const location = useLocation();
  const expense = location.state;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const isEditSession = Boolean(expense?.Id);
  const id = expense?.Id;

  const { register, handleSubmit, formState, setValue, reset, control } =
    useForm({
      defaultValues: isEditSession
        ? {
            ...expense,
            TransactionDate: format(
              parseISO(expense.TransactionDate),
              "MM/dd/yyyy"
            ),
            Category:
              personalCategories.find(
                (cat) => cat.value === expense.Category
              ) || null,
          }
        : {
            Description: "",
            Amount: "",
            TransactionDate: null,
            Cycle: "",
            Category: null,
          },
    });
  const { errors } = formState;

  // Immedietly displaying Amount as a formatted field
  useEffect(() => {
    if (expense) {
      setValue("Amount", formatNumber(expense.Amount));
    }
  }, [expense, setValue]);

  function handleBack() {
    navigate("/expenses");
  }

  const { mutate: createExpense, isPending: isCreating } = useMutation({
    mutationFn: addExpense,
    onSuccess: () => {
      toast.success("Expense successfully added");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      reset({
        Description: "",
        Amount: "",
        TransactionDate: null, // Important
        Cycle: "",
        Category: null,
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editExpense, isPending: isEditing } = useMutation({
    mutationFn: ({ id, newData }) => updateExpense({ id, newData }),
    onSuccess: () => {
      toast.success("Expense successfully updated");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      handleBack();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: removeExpense, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteExpense(id),
    onSuccess: () => {
      toast.success("Expense successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
      handleBack();
    },
    onError: (err) => toast.error(err.message),
  });

  const isUpdating = isDeleting || isCreating || isEditing;

  function formatDateToYMD(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function onSubmit(data) {
    const dateStr = data.TransactionDate;
    const separator = dateStr.includes("-") ? "-" : "/";
    const [monthStr, dayStr, yearStr] = dateStr.split(separator);

    const month = Number(monthStr);
    const year = Number(yearStr);

    const newData = {
      ...data,
      TransactionDate: formatDateToYMD(data.TransactionDate),
      Month: month,
      Year: year,
      Amount: parseNumber(data.Amount),
      Cycle: Number(data.Cycle),
      Category: data.Category.value,
    };

    if (isEditSession) {
      editExpense({ id: expense.Id, newData });
    } else {
      createExpense(newData);
    }

    // console.log(newData);
  }

  return (
    <>
      <Row type="vertical">
        <div className="flex justify-between">
          <Title as="h1">{isEditSession ? `edit income` : "add income"}</Title>
          <Button option="secondary" size="large" onClick={handleBack}>
            back
          </Button>
        </div>
        {isEditSession && (
          <p className="text-[--color-gray-800] font-medium">
            {expense.Description}
          </p>
        )}
      </Row>

      <Form name="expensesForm" onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="title" id="title" error={errors?.Description?.message}>
          <Input
            type="text"
            id="title"
            disabled={isCreating}
            onKeyDown={handleEnter}
            {...register("Description", {
              required: "This field is requiered",
            })}
          />
        </FormRow>
        <FormRow label="amount" id="amount" error={errors?.Amount?.message}>
          <Input
            type="text"
            id="amount"
            disabled={isCreating}
            onKeyDown={handleEnter}
            {...register("Amount", {
              onChange: (e) => handleFormat(e, "Amount", setValue),
              required: "This field is requiered",
            })}
          />
        </FormRow>

        <FormRow
          className={isOpen ? "items-start" : "items-center"}
          label="date"
          error={errors?.TransactionDate?.message}
        >
          <Controller
            control={control}
            rules={{
              required: "This field is requiered",
            }}
            id="TransactionDate"
            name="TransactionDate"
            disabled={isCreating}
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePicker
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                selected={value || null}
                isOpen={isOpen}
                onKeyDown={handleEnter}
                handleIsOpen={setIsOpen}
                // dateValue={income?.TransactionDate || ""}
              />
            )}
          />
        </FormRow>

        <FormRow label="cycle" id="cycle" error={errors?.Cycle?.message}>
          <Input
            type="text"
            id="cycle"
            disabled={isCreating}
            onKeyDown={handleEnter}
            {...register("Cycle", {
              required: "This field is requiered",
            })}
          />
        </FormRow>

        <FormRow
          label="Category"
          id="category"
          error={errors?.Category?.message}
        >
          <Controller
            control={control}
            name="Category"
            rules={{ required: "This field is requiered" }}
            render={({ field: { onChange, value } }) => (
              <Select
                options={personalCategories}
                inputValue={value ?? null}
                onChange={onChange}
              />
            )}
          />
        </FormRow>

        <div className="flex justify-end pt-12 col-start-2 space-x-6">
          {isEditSession && (
            <Modal>
              <Modal.Open opens="deleteMSG">
                <Button option="danger" size="large" type="button">
                  delete
                </Button>
              </Modal.Open>
              <Modal.Window name="deleteMSG">
                <ConfirmDelete
                  resourceName="expense"
                  disabled={isUpdating}
                  onConfirm={() => removeExpense(id)}
                />
              </Modal.Window>
            </Modal>
          )}
          <Button option="primary" size="large" disabled={isUpdating}>
            {isEditSession ? "update" : "add"}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default ExpensesForm;
