import React, { FC } from "react";
import { Button } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

type ButtonProps = {
  title: string;
};

const Buttons: FC<ButtonProps> = ({ title }: ButtonProps) => {
  return (
    <>
      <Button style={{ padding: 15 }} colorScheme="blue" leftIcon={<AddIcon />}>
        {title}
      </Button>
    </>
  );
};

export default Buttons;
