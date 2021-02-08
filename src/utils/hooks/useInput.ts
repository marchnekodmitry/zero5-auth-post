import React, {
  Dispatch,
  DispatchWithoutAction,
  SetStateAction,
  FormEvent,
} from 'react';

type InputChangeEvent = FormEvent<HTMLInputElement | HTMLTextAreaElement>;

const useInput = (
  initialValue: string | (() => string),
): [
  string,
  Dispatch<InputChangeEvent>,
  Dispatch<SetStateAction<string>>,
  DispatchWithoutAction
] => {
  const [value, setValue] = React.useState<string>(initialValue);

  const setInput = React.useCallback(
    (e: InputChangeEvent) => setValue(e.currentTarget.value),
    [],
  );

  const clear = React.useCallback(() => setValue(''), []);

  return [value, setInput, setValue, clear];
};

export default useInput;
