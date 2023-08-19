import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export const PopoverProfile = (prop) => {
  
  const { name, email, handleLogout, image } = prop;

  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme={"red"}>
          {<AiOutlineUser fontSize={"22px"} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight={"bold"} color="black">
          Welcome {email}
        </PopoverHeader>
        <PopoverBody display={"grid"} gap="20px">
          <Button
            colorScheme={"red"}
            width="100%"
            onClick={() => navigate("/booking")}
          >
            Bookings
          </Button>
          <Button colorScheme={"red"} onClick={handleLogout}>
            Logout
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
