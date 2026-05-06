export function minDateValidator(startDateField: any) {
  // Returns the validation callback expected by the validate() function
  return ({ value, stateOf }: any) => {
    const endDate = value();
    const startDateState = stateOf(startDateField);
    const startDate = startDateState.value();

    // Only validate the date range if the start date is already valid
    if (startDateState.valid() && endDate < startDate) {
      return {
        kind: 'dateRange',
        message: 'La fecha de cierre no puede ser anterior a la fecha de inicio'
      };
    }

    return null;
  };
}
