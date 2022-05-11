import React, { forwardRef, useRef, useEffect } from "react";
// import { Checkbox } from "@chakra-ui/react";
interface IIndeterminateInputProps {
  indeterminate?: boolean;
  name: string;
}

export const CheckboxOptions = forwardRef<
  HTMLInputElement,
  IIndeterminateInputProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef<HTMLInputElement>();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});
