export function handleFileChange(event, setFile) {
  setFile(event.target.files[0]);
}

export function handleUserChange(event, userInput, setUserInput) {
  const { name, value } = event.target;
  setUserInput({ ...userInput, [name]: value });
}

export function handleTransactionChange(event, setInputData) {
  const { name, value } = event.target;
  setInputData((prevInputData) => ({
    ...prevInputData,
    [name]: value,
  }));
}

export const handleDateChange = (date, setStartDate, setInputData) => {
  setStartDate(date);
  setInputData((prevInputData) => ({
    ...prevInputData,
    transactionDate: date,
  }));
};
