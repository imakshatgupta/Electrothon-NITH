import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const ClaimNft = () => {
  const [data, setData] = useState([]);
  const [cid, setCid] = useState("");
  const [transaction, setTransaction] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://electrothon-nith.onrender.com/claimNft", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setData(data);
        setCid(data[0].cid);
        setTransaction(data[0].transaction);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

    const handleSuccess = async () => { 
    try {
      const response = await fetch("https://electrothon-nith.onrender.com/nft/claimSuccess", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error);
    }
    };

  return (
    <div>
      <Navbar/>
      <div className="p-[100px] grid justify-center items-center">
      <div className="img-ctr">
        {cid && (
          <a href={`https://${cid}.ipfs.dweb.link`}>
            <img
              src={`https://${cid}.ipfs.dweb.link`}
              className="w-[350px] h-[350px]"
              alt="NFT Image"
            />
          </a>
        )}
      </div>
      <div className="transaction">
        {transaction && (
          <p className="text-center p-[20px] grid gap-4">
          <Link to={`https://mumbai.polygonscan.com/tx/${transaction}`} className="border p-[10px] rounded bg-[#5dbea3] text-white hover:ease-in font-medium"
          onClick={handleSuccess}>
            Claim you NFT{" "}
          </Link>
          <Link to='/' className="border bg-[#e15858] rounded p-[10px] text-white" >
          No Thanks!
          </Link>

          </p>
        )}
      </div>
    </div>
    </div>
  );
};

export default ClaimNft;
