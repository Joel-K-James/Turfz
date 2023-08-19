import React, { useState, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/Authcontext";
import { ref, onValue ,remove} from "firebase/database";
import { database } from "../firebase-config/config";
import { Button, Text } from "@chakra-ui/react";
// import { PopoverProfile } from "../components/Popover";
import { BookingSkeleton } from "../components/BookingSkeleton";
export const Bookings = () => {
  const { user} = useUserAuth();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [add, setAdd] = useState("");
  const [time, setTime] = useState("");
  const [email, setEmail] = useState("");
  const [date,setDate] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()


  const getUserData = (uid) => {
    setLoading(true);
    const userRef = ref(database, "users/" + uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data === null) {
        setError("No Bookings found");
        setLoading(false);
      } else {
        const bookingName = data.data;
        setName(bookingName.booking.name);
        setImage(bookingName.booking.image);
        setAdd(bookingName.booking.address);
        setTime(bookingName.time);
        setEmail(bookingName.email);
        setDate(bookingName.bookingDate)
        setLoading(false);
      }
    });
  };
  
  useEffect(() => {
    if (user) {
      getUserData(user.uid);
    }
  });

  const handleCancel = (uid) => {
    const userRef = ref(database, "users/" + user.uid);
    remove(userRef).then(()=>{
      alert("Successfully Canceled Bookings")
      navigate("/turf")
    })
  }
  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  const BookingDiv = () => {
    if (error === "") {
      return (
        <div id="bookingsDetails">
          <p id="BookedTurfName">Current Booking</p>
          <p>{name}</p>
          <div id="bookingImageBox">
            <img src={image} alt="" />
          </div>
          <p>Address : {add}</p>
          <p>Time : {time}</p>
          <p>Date : {date}</p>
          <Button colorScheme={"red"} onClick={handleCancel}>Cancel</Button>
        </div>
      );
    } else {
      return (
        <div id="errorOrder">
          <Text
            fontSize={"50px"}
            textAlign="center"
            marginTop={"50px"}
            fontWeight="bold"
          >
           {error}
          </Text>
        </div>
      );
    }
  };

  return (
    <div>
      <div id="paymentNav">
        <Link to={"/turf"}>
          <IoMdArrowRoundBack fontWeight={"bold"} fontSize="30px" />
        </Link>
        <Text color={"red"} fontSize="30px" fontWeight={"bold"}>
          Bookings
        </Text>
      </div>
      {loading ? <BookingSkeleton /> : <BookingDiv />}
    </div>
  );
};
