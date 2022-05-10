import React, { FC } from "react";
import { Button } from "@chakra-ui/react";

type ButtonProps = {
  title: string;
  icon: React.ElementType;
};

const Buttons: FC<ButtonProps> = ({ title, icon, ...rest }: ButtonProps) => {
  return (
    <>
      <Button
        style={{ padding: 15 }}
        colorScheme="blue"
        leftIcon={icon}
        {...rest}>
        {title}
      </Button>
    </>
  );
};

export default Buttons;
