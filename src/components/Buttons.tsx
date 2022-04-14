import React, { FC } from "react";
import { Button } from "@chakra-ui/react";

type ButtonProps = {
  title: string;
  icon: React.ComponentType;
};

const Buttons: FC<ButtonProps> = ({ title, icon }: ButtonProps) => {
  return (
    <>
      <Button style={{ padding: 15 }} colorScheme="blue" leftIcon={icon}>
        {title}
      </Button>
    </>
  );
};

export default Buttons;
