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

function IncomeForm() {
  const location = useLocation();
  const income = location.state;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const isEditSession = Boolean(income?.Id);
  const id = income?.Id;

  const { register, handleSubmit, formState, setValue, reset, control } =
    useForm({
      defaultValues: isEditSession
        ? {
            ...income,
            TransactionDate: format(
              parseISO(income.TransactionDate),
              "MM/dd/yyyy"
            ),
          }
        : {
            Description: "",
            Amount: "",
            TransactionDate: null,
            Cycle: "",
          },
    });
  const { errors } = formState;

  // Immedietly displaying Amount as a formatted field
  useEffect(() => {
    if (income) {
      setValue("Amount", formatNumber(income.Amount));
    }
  }, [income, setValue]);

  function handleBack() {
    navigate("/income");
  }

  const { mutate: createIncome, isPending: isCreating } = useMutation({
    mutationFn: addIncome,
    onSuccess: () => {
      toast.success("Income successfully added");
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      reset({
        Description: "",
        Amount: "",
        TransactionDate: null, // Important
        Cycle: "",
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editIncome, isPending: isEditing } = useMutation({
    mutationFn: ({ id, newData }) => updateIncome({ id, newData }),
    onSuccess: () => {
      toast.success("Income successfully updated");
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
      handleBack();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: removeIncome, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteIncome(id),
    onSuccess: () => {
      toast.success("Income successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
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
    };

    if (isEditSession) {
      editIncome({ id: income.Id, newData });
    } else {
      createIncome(newData);
    }
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
            {income.Description}
          </p>
        )}
      </Row>

      <Form name="incomeForm" onSubmit={handleSubmit(onSubmit)}>
        <FormRow
          label="title"
          id="incomeTitle"
          error={errors?.Description?.message}
        >
          <Input
            type="text"
            id="incomeTitle"
            onKeyDown={handleEnter}
            {...register("Description", {
              required: "This field is requiered",
            })}
          />
        </FormRow>
        <FormRow
          label="amount"
          id="incomeAmount"
          error={errors?.Amount?.message}
        >
          <Input
            type="text"
            id="incomeAmount"
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
            // disabled={isPending}
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
          {/* {errors?.TransactionDate?.message && (
            <Error>{errors.TransactionDate.message}</Error>
          )} */}
        </FormRow>

        <FormRow label="cycle" id="incomeCycle" error={errors?.Cycle?.message}>
          <Input
            type="text"
            id="incomeCycle"
            onKeyDown={handleEnter}
            {...register("Cycle", {
              required: "This field is requiered",
            })}
          />
        </FormRow>
        <div className="flex justify-end pt-6 col-start-2 space-x-6">
          {isEditSession && (
            <Modal>
              <Modal.Open opens="deleteMSG">
                <Button option="danger" size="medium" type="button">
                  delete
                </Button>
              </Modal.Open>
              <Modal.Window name="deleteMSG">
                <ConfirmDelete
                  resourceName="income"
                  disabled={isUpdating}
                  onConfirm={() => removeIncome(id)}
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

export default IncomeForm;
