"use client";
import { PaymentMethod } from "../type";
import Image from "next/image";
import payIdIcon from "../icons/payid.svg";
import cardIcon from "../icons/card.svg";

interface PaymentMethodCardViewProps {
  title: string;
  method: PaymentMethod;
  isSelected: boolean;
  onclick: (selected: PaymentMethod) => void;
}

const PaymentMethodCardView = ({
  title,
  method,
  isSelected,
  onclick,
}: PaymentMethodCardViewProps) => {
  const getIcon = () => {
    return method === PaymentMethod.Card ? cardIcon : payIdIcon;
  };

  return (
    <div
      onClick={() => onclick(method)}
      className={`border flex gap-2 flex-col flex- p-2 min-w-24 rounded-md justify-start cursor-pointer ${
        isSelected && "border-slate-800"
      }`}
    >
      <Image
        className="h-4 w-9 object-contain"
        src={getIcon()}
        alt="Payment Method Icon"
      />
      {title}
    </div>
  );
};

export default PaymentMethodCardView;
