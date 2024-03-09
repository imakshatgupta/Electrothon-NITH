import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "@mui/material";
import makeCryptoPayment from "../utils/constants";

const SlotExit = () => {
  const history = useNavigate();

  const [payableAmount, setPayableAmount] = React.useState(0);
  const [showModal, setShowModal] = useState(false);

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

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_rrpFDSyVYUuEE4",
      amount: data.amount,
      currency: data.currency,
      order_id: data.orderDetails.razorpayOrderId,
      handler: async (response) => {
        try {
          const verifyUrl = `http://localhost:8000/listings/verify`;

          const verifyData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };
          await axios.post(verifyUrl, verifyData);
          history("/admin");
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleProceed = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/listings/bookings/addBooking",
        {
          rentPrice: data,
        }
      );
      console.log(response.data);
      initPayment(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  const qrData = async (text) => {
    const slotBooking = JSON.parse(text);
    console.log(slotBooking.slotId);
    const slotExit = await fetch("http://localhost:8000/parking/slotExit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: slotBooking.slotId,
      }),
    });
    const data = await slotExit.json();
    console.log(data.payableAmount);
    setPayableAmount(data.payableAmount);
    setShowModal(true);
    // await handleProceed(data.payableAmount);
  };

  const handlePayWithRazorpay = () => {
    setShowModal(false);
    handleProceed(payableAmount);
  };

  const handlePayWithWallet = async () => {
    setShowModal(false);
    const cryptoAmount = payableAmount * 0.011;
    const cryptoAddress = "0xC3385be7163DA9ee64dfE1847De5dC9c8Aa88eC0";
    await makeCryptoPayment(cryptoAddress, cryptoAmount);
    history("/admin");
  };

  return (
    <div className="h-[400px] w-[400px] m-auto mt-[200px]">
      <Scanner
        components={{
          audio: false,
        }}
        options={{
          delayBetweenScanSuccess: 10000,
        }}
        onResult={(text) => qrData(text)}
        onError={(error) => console.log(error?.message)}
      />
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="modal-container bg-white fixed z-[1300]  flex items-center justify-center">
          <div className="modal-content flex flex-col justify-center items-center gap-5 p-6 ">
            <h2>
              Payable Amount: {payableAmount} Rs. ({payableAmount * 0.011}{" "}
              MATIC)
            </h2>
            <Button
              onClick={handlePayWithRazorpay}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Pay with Razorpay
            </Button>
            <Button
              onClick={handlePayWithWallet}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Pay with Wallet
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SlotExit;
