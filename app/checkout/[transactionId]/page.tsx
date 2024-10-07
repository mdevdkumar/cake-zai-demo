"use client";
import { apiRequest } from "@/app/api/utils/service";
import PaymentMethodCardView from "@/app/components/PaymentMethodCardView";
import { PaymentMethod, Transaction } from "@/app/type";
import { useEffect, useState } from "react";
import PayIdView from "@/app/components/PayIdView";
import CardView from "@/app/components/CardView";

export default function Home({
  params,
}: {
  params: { transactionId: string };
}) {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState<PaymentMethod>(PaymentMethod.PayID);

  useEffect(() => {
    setIsLoading(true);

    apiRequest(`/api/transaction/${params.transactionId}`).then((response) => {
      setIsLoading(false);
      setTransaction(response.data);
    });
  }, [params.transactionId]);

  const checkPaymentConfirmation = async () => {
    apiRequest(`/api/transaction/${params.transactionId}`).then((response) => {
      setTransaction(response.data);
    });
  };

  if (isLoading || !transaction) {
    return (
      <div className="h-screen w-screen flex justify-center items-center gap-3">
        <div className="h-4 aspect-square border-slate-400 rounded-full border-2 text-slate-400" />
        <div>Loading...</div>
      </div>
    );
  }

  if (transaction.status === "completed") {
    return (
      <div className="h-screen w-screen flex justify-center items-center gap-3">
        <div className="text-2xl">Transaction Completed</div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen">
      <div className="flex-1 bg-slate-950 text-white p-8 flex justify-center items-center flex-col">
        <div className="gap-2 flex flex-col text-slate-300">
          <h1 className="text-2xl ">
            Payable amount: $ {(transaction.amount / 100).toFixed(2)}
          </h1>
          <div className="text-lg">
            From:{" "}
            {`${transaction.merchant.first_name} ${transaction.merchant.last_name}`}
          </div>

          <div className="text-sm text-slate-500 mt-10">
            Invoice Id: INV_{transaction.created_at}
          </div>
        </div>
      </div>
      <div className="flex-1 p-8 flex justify-center items-center text-slate-950">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2>Payment Method</h2>

            <div className="flex gap-4 text-sm">
              <PaymentMethodCardView
                title="Card"
                onclick={setSelected}
                method={PaymentMethod.Card}
                isSelected={selected == PaymentMethod.Card}
              />
              <PaymentMethodCardView
                title="PayID"
                onclick={setSelected}
                method={PaymentMethod.PayID}
                isSelected={selected == PaymentMethod.PayID}
              />
            </div>
          </div>

          {selected === PaymentMethod.PayID ? (
            <PayIdView payId={transaction.merchant.pay_id_email} />
          ) : (
            <CardView />
          )}

          <button
            className="bg-slate-950 text-white py-3 rounded-md shadow-lg hover:shadow-none transition-all"
            onClick={checkPaymentConfirmation}
          >
            Complete
          </button>
        </div>
      </div>
    </main>
  );
}
