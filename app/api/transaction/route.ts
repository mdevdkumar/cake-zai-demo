import { AxiosError } from "axios";
import { getMerchant, saveTransaction } from "../utils/xano";

export async function POST(request: Request) {
  const body = await request.json();

  const { merchant_id, amount } = body;

  try {
    var merchant = await getMerchant(merchant_id);

    var transaction = await saveTransaction({
      merchant_id: merchant.id,
      amount,
    });
    return new Response(
      JSON.stringify(`${process.env.BASE_URL}/checkout/${transaction.id}`),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;
      return new Response(JSON.stringify(axiosError.response?.data), {
        status: axiosError.response?.status,
      });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
