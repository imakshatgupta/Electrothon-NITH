import * as React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { Button } from "@mui/base/Button";
import { useSpring, animated } from "@react-spring/web";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import axios from "axios";
import makeCryptoPayment from "../utils/constants";
import { toast } from "react-toastify";

export default function BookingModal({
  availableTill,
  dailyRate,
  hourlyRate,
  id,
  carOwnerId,
}) {
  const [initial, setInitial] = React.useState(null);
  const [final, setFinal] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [hours, setHours] = React.useState(0);
  const [rentPrice, setRentPrice] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(0);

  const history = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    const loadRazorpayScript = async () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {};
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {

    const cryptoAmount = rentPrice * 0.011;
    const user = await fetch("https://electrothon-nith.onrender.com/users/getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": carOwnerId,
      },
    });
    const data = await user.json();
    const cryptoAddress = data.user.wallet;
    await makeCryptoPayment(cryptoAddress, totalPayable*0.011);

    const saveWallet = await axios.post(
      "https://electrothon-nith.onrender.com/listings/bookings/saveWallet",
      {
        id,
        carOwnerId,
        cryptoAmount,
      }
    );
    console.log(saveWallet);
    history("/");
  };

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_rrpFDSyVYUuEE4",
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderDetails.razorpayOrderId,
      handler: async (response) => {
        try {
          const verifyUrl = `https://electrothon-nith.onrender.com/listings/verify`;

          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          await axios.post(verifyUrl, verifyData);
          console.log(id, carOwnerId);
          const save = await axios.post(
            "https://electrothon-nith.onrender.com/listings/bookings/saveBooking",
            {
              id,
              carOwnerId,
              rentPrice,
              carRenterId: user._id,
              timeLeft,
            }
          );
          console.log(save);
          toast.success("Payment Successful");
          history("/claimNft");
        } catch (err) {
          console.log(err);
          toast.error("Payment Failed");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const calculateHours = () => {
    if (final && initial) {
      const initialDate = new Date(initial);
      const finalDate = new Date(final);
      const time = final.getTime();
      console.log(time);
      setTimeLeft(time)
      const differenceInMs = finalDate - initialDate;
      const differenceInHours = differenceInMs / (1000 * 60 * 60);
      return parseInt(differenceInHours);
    } else {
      return 0;
    }
  };

  const calculateRentPrice = (hours) => {
    if (hours < 24) {
      return hours * hourlyRate;
    } else {
      const fullDays = Math.floor(hours / 24);
      const remainingHours = hours % 24;
      return parseInt(fullDays * dailyRate + remainingHours * hourlyRate);
    }
  };

  const handleProceed = async () => {
    try {
      console.log(id, carOwnerId);
      const response = await axios.post(
        "https://electrothon-nith.onrender.com/listings/bookings/addBooking",
        {
          hours,
          rentPrice:totalPayable,
        }
      );
      initPayment(response.data, id, carOwnerId);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const hours = calculateHours();
    const rentPrice = calculateRentPrice(hours);
    setHours(hours);
    setRentPrice(rentPrice);
  });

  const totalPayable = rentPrice+5000;
  return (
    <div>
      <button
        className="border p-1 text-black bg-white rounded ml-[90px]"
        onClick={handleOpen}
      >
        Book Now!
      </button>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
                <div>
                  <label htmlFor="initial">Initial</label>
                  <input
                    type="datetime-local"
                    id="initial"
                    min={dayjs(new Date()).format("YYYY-MM-DDTHH:mm")}
                    max={dayjs(availableTill).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => {
                      const selectedDate = dayjs(e.target.value).toDate();
                      if (!final || selectedDate < final) {
                        setInitial(selectedDate);
                      }
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="final">Final</label>
                  <input
                    type="datetime-local"
                    id="final"
                    min={dayjs(initial)
                      .add(1, "minute")
                      .format("YYYY-MM-DDTHH:mm")}
                    max={dayjs(availableTill).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) => {
                      const selectedDate = dayjs(e.target.value).toDate();
                      if (selectedDate > initial) {
                        setFinal(selectedDate);
                        }
                    }}
                  />
                </div>
              </DemoContainer>
            </LocalizationProvider>
            <p>Total hours: {hours}</p>
            <p>
              Rent Price: {rentPrice} Rs. ({rentPrice * 0.011} MATIC)
            </p>
            <p>
              Security Amount: Rs. 5000 (Refundable)<br/>
              Total Payable Amount: Rs.{totalPayable} ({Math.floor(totalPayable * 0.011)} MATIC)
            </p>
            <button onClick={handleProceed}>Pay via Razorpay</button>
            <button onClick={handlePayment}>Pay via Crypto</button>
          </ModalContent>
        </Fade>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return <Fade ref={ref} in={open} {...other} />;
});

Backdrop.propTypes = {
  open: PropTypes.bool.isRequired,
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid white",
  borderRadius: 1,
  color: "black",
  fontFamily: "IBM Plex Sans",
  fontWeight: 500,
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 48px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: black;
      margin-bottom: 4px;
      font-size: 1.5rem;
    }
  `
);

const TriggerButton = styled(Button)(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 600;
    font-size: 1.875rem;
    line-height: 1.5;
    padding: 18px 16px;
    border-radius: 8px;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px
        ${theme.palette.mode === "dark" ? blue[300] : blue[200]};
      outline: none;
    }
  `
);
