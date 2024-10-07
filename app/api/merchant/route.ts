import { User, UserRequestBody, WalletAccount } from "zai-payments";
import { client } from "../utils/zaiService";
import { AxiosError } from "axios";
import { apiRequest } from "../utils/service";
import { saveMerchant } from "../utils/xano";

export async function POST(request: Request) {
  const body: UserRequestBody = await request.json();

  try {
    const token = await GetZaiToken();

    console.log("Token", token);
    const user: User = await GetUser(body);
    var wallet: WalletAccount = await GetUserWallet(user.id!);

    const virtualAccount = await GetUserVirtualAccount(
      wallet.wallet_accounts!.id!,
      token.access_token
    );
    const payId = await RegisterForPayId(
      user,
      virtualAccount.id,
      token.access_token
    );

    await saveMerchant({
      merchant_id: user.id!,
      first_name: user.first_name!,
      last_name: user.last_name!,
      wallet_id: wallet.wallet_accounts!.id!,
      virtual_account_id: virtualAccount.id,
      pay_id: payId.id,
      pay_id_email: user.email!,
      json: JSON.stringify({ user, wallet, virtualAccount, payId }),
    });

    return new Response(
      JSON.stringify(`Account created with merchant Id: ${user.id!}`),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    if (err.isAxiosError) {
      const axiosError = err as AxiosError;
      return new Response(JSON.stringify(axiosError.response?.data), {
        status: axiosError.response?.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    return new Response(JSON.stringify(err.message), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request: Request) {
  const token = await GetZaiToken();
  return new Response(JSON.stringify(token), { status: 200 });
}

const GetUserWallet = async (id: string) => {
  // Get User Wallet
  const wallet = await client.users.showUserWalletAccounts(id);
  return wallet;
};

const GetUserVirtualAccount = async (walletId: string, accessToken: string) => {
  const baseUrl = "https://sandbox.au-0000.api.assemblypay.com";

  //Check if virtual account exists
  const response = await apiRequest(
    `${baseUrl}/wallet_accounts/${walletId}/virtual_accounts`,
    {
      method: "get",
      headers: { accept: "application/json" },
      accessToken,
    }
  );

  if (response.data.virtual_accounts.length > 0) {
    return response.data.virtual_accounts[0];
  }

  // If virtual account does not exist, create virtual account
  const res = await apiRequest(
    `${baseUrl}/wallet_accounts/${walletId}/virtual_accounts`,
    {
      method: "post",
      headers: { accept: "application/json" },
      accessToken,
    }
  );

  return res.data;
};

const GetUser = async (request: UserRequestBody) => {
  // Check if user exists with same email...
  const userExists = await client.users.listUsers({ search: request.email });

  // If user does not exist, create user
  if (
    userExists == undefined ||
    userExists.users == undefined ||
    userExists.users.length == 0
  ) {
    request.id = "buyer_" + new Date().getTime();
    const user = await client.users.createUser(request);
    return user.users!;
  } else {
    return userExists.users![0]!;
  }
};

const RegisterForPayId = async (
  user: User,
  virtualAccountId: string,
  accessToken: string
) => {
  const url = `https://sandbox.au-0000.api.assemblypay.com/virtual_accounts/${virtualAccountId}/pay_ids`;

  const data = {
    pay_id: user.email,
    type: "EMAIL",
    details: {
      pay_id_name: `${user.first_name?.at(0)?.toUpperCase()} ${user.last_name}`,
      owner_legal_name: `${user.first_name} ${user.last_name}`,
    },
  };

  const response = await apiRequest(url, {
    method: "post",
    data: data,
    accessToken,
  });

  return response.data;
};

const GetZaiToken = async () => {
  const token = await apiRequest(
    "https://au-0000.sandbox.auth.assemblypay.com/tokens",
    {
      method: "post",
      data: {
        grant_type: "client_credentials",
        client_id: process.env.ZAI_CLIENT_ID!,
        client_secret: process.env.ZAI_CLIENT_SECRET!,
        scope: process.env.ZAI_SCOPE!,
      },
    }
  );

  return token.data;
};
