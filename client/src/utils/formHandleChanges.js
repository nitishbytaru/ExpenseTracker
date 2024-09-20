export function handleFileChange(event, setFile) {
  setFile(event.target.files[0]);
}

export function handleUserChange(event, input, setInput) {
  const { name, value } = event.target;
  setInput({ ...input, [name]: value });
}

export const handleTransactionChange = (event, dispatchAction) => {
  const { name, value } = event.target;
  // Call the dispatchAction with the updated data
  dispatchAction({ [name]: value });
};

export const handleDateChange = (date, setStartDate, setInputData) => {
  setStartDate(date);
  setInputData((prevInputData) => ({
    ...prevInputData,
    transactionDate: date,
  }));
};
