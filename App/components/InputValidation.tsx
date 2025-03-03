import React from "react";

interface InputValidationProps {
  typeInput: "email" | "phone" | "date";
  valueInput: string;
}

export default function InputValidation({
  typeInput,
  valueInput,
}: InputValidationProps) {
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const isValidDate = (date: string) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
    return dateRegex.test(date);
  };

  if (typeInput === "email") return isValidEmail(valueInput);
  if (typeInput === "phone") return isValidPhone(valueInput);
  if (typeInput === "date") return isValidDate(valueInput);

  return true;
}
