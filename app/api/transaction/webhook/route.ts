import { Transaction } from "zai-payments";
import { client } from "../../utils/zaiService";
import { markTransactionAsComplete } from "../../utils/xano";

export async function POST(request: Request) {
  const body: { transactions: Transaction } = await request.json();

  const data = {
    merchant_id: body.transactions.user_id,
    amount: body.transactions.amount,
  };

  const response = await markTransactionAsComplete(data);

  return new Response(JSON.stringify(response), {});
}
