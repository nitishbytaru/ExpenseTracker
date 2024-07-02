export function handleFileChange(event, setFile) {
  setFile(event.target.files[0]);
}

export function handleChange(event, setUserInput) {
  const { name, value } = event.target;
  setUserInput({ ...userInput, [name]: value });
}


export const handleDateChange = (date,setStartDate,setInputData) => {
    setStartDate(date);
    setInputData((prevInputData) => ({
      ...prevInputData,
      transactionDate: date,
    }));
  };