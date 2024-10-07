import { Transaction } from "@/app/type";
import { getTransaction } from "../../utils/xano";

export async function GET(
  _: Request,
  { params }: { params: { transactionId: string } }
) {
  const transaction: Transaction = await getTransaction(params.transactionId);
  return new Response(JSON.stringify(transaction), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
