import { useState } from "react";

const useFormValidate = () => {
  //this is used to validate the email formate
  const useEmailValidate = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  };

  //this hook is used handle the changes in the states
  const useHandleChange = (initialState) => {
    const [input, setInput] = useState(initialState);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setInput({ ...input, [name]: value });
    };

    return [input, handleChange];
  };

  //this hook is used to handle the date change
  const useHandleDateChange = (initialDate) => {
    const [startDate, setStartDate] = useState(initialDate);

    const handleDateChange = (date) => {
      setStartDate(date);
    };

    return [startDate, handleDateChange];
  };

  return { useEmailValidate, useHandleChange, useHandleDateChange };
};
export default useFormValidate;
