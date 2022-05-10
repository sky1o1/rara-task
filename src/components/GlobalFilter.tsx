import React, { useState } from "react";
import { Input } from "@chakra-ui/react";
import { useAsyncDebounce } from "react-table";

const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const debounced = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span>
      Search:{" "}
      <Input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          debounced(e.target.value);
        }}
      />
    </span>
  );
};

export default GlobalFilter;
