export enum PaymentMethod {
  Card = "Card",
  PayID = "PayID",
}

export type Transaction = {
  id: string;
  amount: number;
  merchant_id: string;
  status: "pending" | "completed";
  created_at: string;
  merchant: {
    first_name: string;
    last_name: string;
    wallet_id: string;
    virtual_account_id: string;
    pay_id: string;
    pay_id_email: string;
  };
};
