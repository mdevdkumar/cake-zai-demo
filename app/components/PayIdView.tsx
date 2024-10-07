import Image from "next/image";
import copyIcon from "@/app/icons/copy.svg";
import { useState } from "react";

const PayIdView = ({ payId }: { payId: string }) => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(payId).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 3000);
    });
  };

  return (
    <>
      <div className="bg-slate-100 text-md text-slate-600 p-5 rounded-md">
        <ol className="list-decimal list-inside">
          <li>Copy the PayId</li>
          <li>Go to your mobile banking app</li>
          <li>Select the option to pay by PayID</li>
        </ol>
      </div>
      <div className="flex flex-col gap-3">
        <h3>PayID</h3>

        <div className="flex gap-1">
          <div className="border p-2 rounded-md border-slate-300 flex-1">
            {payId}
          </div>
          <button
            onClick={copyToClipboard}
            className="text-white rounded-md px-4"
          >
            <Image src={copyIcon} alt="Copy" width={20} height={20} />
          </button>
        </div>

        {copySuccess && (
          <div className="text-yellow-900 mt-2 absolute top-5 right-5 bg-yellow-100 px-4 py-2 rounded-lg shadow-xl">
            {copySuccess}
          </div>
        )}
      </div>
    </>
  );
};

export default PayIdView;
