import React from "react";
import {
  Skeleton,
  Stack,
} from "@chakra-ui/react";
export const BookingSkeleton = () => {
  return (
    <Stack w={"50%"} margin="auto" marginTop={"20px"}>
      <Skeleton height="30px" w="50%" />
      <Skeleton height="50px" w="50%"/>
      <Skeleton height="300px" w={"50%"} />
      <Skeleton height="50px" w="50%"/>
    </Stack>
  );
};
