import { useState } from "react";

const NftMint = () => {
    const [file, setFile] = useState(null);
    const [cid, setCid] = useState("");
    const [transaction, setTransaction] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);

                const response = await fetch('https://electrothon-nith.onrender.com/upload', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                setCid(data.cid);
                setTransaction(data.transactionHash);

                console.log(data.cid);
                console.log(data.transactionHash);
            }
        } catch (error) {
            alert(error);
        }
    };

    const retrieveFile = (event) => {
        try {
            const data = event.target.files[0];
            setFile(data);
            event.preventDefault();
        } catch (error) {
            alert("Retrieve File did not work.");
        }
    };

    return (
        <>
            <div className="img-ctr">
                {cid && (
                    <a href={`https://${cid}.ipfs.dweb.link`}>
                        <img src={`https://${cid}.ipfs.dweb.link`} className="w-[300px] h-[300px]" alt="NFT Image" />
                    </a>
                )}
            </div>
            <div className="transaction">
                {transaction && (
                    <a href={`https://mumbai.polygonscan.com/tx/${transaction}`}>Transaction Details</a>
                )}
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="file" className="choose" onChange={retrieveFile} />
                    <button type="submit" className="btn">NFT Minter</button>
                </form>
            </div>
        </>
    );
};

export default NftMint;
