import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Text,
  Alert,
  AlertIcon,
  Box,
  Input
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/Authcontext";
import { loadBundle } from "firebase/firestore";
import { ref, set } from "firebase/database";
import { database } from "../firebase-config/config";
import { onValue } from "firebase/database";

const time = [
  "5:00 AM",
  "7:00 AM",
  "9:00 AM",
  "4:00 PM",
  "6:00 PM",
  "8:00 PM",
  "10:00AM",
];
export const TimeSelectModal = (prop) => {
  const { turf, element, setElement, setTime, setTurfName, turfName } = prop;
  const { user } = useUserAuth();

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);
  const [bookedtime, setBookedTime] = useState([]);
  const [disable, setDisable] = useState(false);
  const [link, setlink] = useState(false);
  const [color,setColor] = useState(false)
  const [msg, setMsg] = useState(false);
  const [err, setErr] = useState(false);
  const [date,setDate] = useState("")

  const handleElement = (ele) => {
    setElement(ele);
    setTurfName(ele.name)
  };
  // const bookedTimeLs = localStorage.getItem("time", time);
  // console.log(bookedTime)
  const navigate = useNavigate();
  // add bookings to user account
  function writeUserData(data) {
    set(ref(database, "users/" + user.uid), {
      data,
    });
  }

// console.log(date)
  // const getBookings = () => {
  //   let arr = [];
  //   const Leaveref = ref(database, `users/`);
  //   onValue(Leaveref, (snapshot) => {
  //     const data = snapshot.val();
  //     const newLeave = Object.keys(data).map((key) => ({
  //       id: key,
  //       ...data[key],
  //     }));
  //     newLeave.map((ele) => {
  //       return arr.push(ele.data.time);
  //     });
  //   });
  //   setBookedTime(arr);
  // };
  const Leaveref = ref(database, `users/`);
  useEffect(() => {
    let arr = [];
    onValue(Leaveref, (snapshot) => {
      const data = snapshot.val();
      const newLeave = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      newLeave.map((ele) => {
       return arr.push(ele.data);
      });
    });
    // console.log(arr)
    setBookedTime(arr);
  },[]);

  const addBookings = async (ele) => {
    try {
      const userAuth = await user;
      var bookingData = {
        booking: element,
        time: ele,
        uid: userAuth.uid,
        email: userAuth.email,
        bookingDate : date
      };
      if (bookedtime.find((e) =>e.time === ele && e.bookingDate=== date && e.booking.name===turfName) ) {
        setlink(false)
        setErr(true)
      } else {
        setlink(true)
        writeUserData(bookingData);
        setMsg(true)
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (link) {
    navigate("/payment");
  }
  
  return (
    <>
      <Button
        colorScheme={"red"}
        onClick={() => {
          handleElement(element);
          onOpen();
        }}
      >
        Book Now
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Timings For {turf}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
             
              {msg ? (
                <div className={msg ? "alertMsg" : "alertErr"}>
                  <Alert status="success">
                    <AlertIcon />
                    Booked successfully
                  </Alert>
                </div>
              ) : (
                <div className={err ? "errmsg" : "errFalse"}>
                  <Alert status="error">
                    <AlertIcon />
                     This Slot is already Booked
                  </Alert>
                </div>
              )}
            </Box>
            <Text fontWeight={"bold"} fontSize="25px" color={"red"}>Booking for "{turfName}"</Text>
            <Text fontWeight={"bold"} fontSize="25px">Select Date</Text>
            <Input type={"date"} onChange={(e)=>setDate(e.target.value)}/>
            <Text fontWeight={"bold"} fontSize="25px">
              Select Time
            </Text>
            <div id="timeButtons">
              {time.map((ele) => {
                return (
                  <Button
                    colorScheme={"red"}
                    onClick={() => {
                      setTime(ele);
                      addBookings(ele);
                    }}
                  >
                    {ele}
                  </Button>
                );
              })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
