import { useEffect, useState } from 'react';

export const EditableCell = ({
  value: initialValue,
  row: { original }, // double check
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
    // do more validation here
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(value, original);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return id === 'value' ? (
    <input value={value} onChange={onChange} onBlur={onBlur} />
  ) : (
    <b>{value}</b>
  );
};
