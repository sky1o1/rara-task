import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input, Button, Flex, Box, Text } from "@chakra-ui/react";

type Inputs = {
  firstName: string;
  number: string;
};

const addUser = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (datas) => console.log(datas);

  return (
    <>
      <Box border="2px" borderColor="gray.200" maxW="350">
        <Text fontSize="lg">React Hook Form</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap={2} p={4} maxW="300">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Name" />}
            />
            <Controller
              name="number"
              control={control}
              rules={{
                required: true,
                minLength: 10,
              }}
              render={({ field }) => (
                <>
                  <Input {...field} placeholder="Number" type="number" />
                  {errors.number && <span>This field is required</span>}
                </>
              )}
            />
            <Controller
              name="submit"
              control={control}
              render={({ field }) => (
                <Button
                  {...field}
                  variant="outline"
                  colorScheme="linkedin"
                  type="submit">
                  Submit
                </Button>
              )}
            />
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default addUser;
