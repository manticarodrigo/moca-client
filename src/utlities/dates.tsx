export const getDateForString = (selectedDate: string, selectedTime = '00:00') => {
  const [year, month, date] = selectedDate.split('-');
  const [hours, minutes] = selectedTime.split(':');

  // create a date reflecting the value of date and the environment's timezone offset.
  const localStartDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(date),
    parseInt(hours),
    parseInt(minutes),
  );

  return localStartDate;
};
