"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const web3_js_1 = require("@solana/web3.js");
const address_1 = require("./address");
const app = (0, express_1.default)();
const connection = new web3_js_1.Connection("https://api.devnet.solana.com/", "confirmed");
// const webhookRes = {
//   "accountData": [
//     {
//       "account": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj",
//       "nativeBalanceChange": -1000015000,
//       "tokenBalanceChanges": []
//     },
//     {
//       "account": "JBx5QwskpsPkuVvDvmmkQUGJxiKzjMthaAHVimc9NZQ",
//       "nativeBalanceChange": 1000000000,
//       "tokenBalanceChanges": []
//     },
//     {
//       "account": "11111111111111111111111111111111",
//       "nativeBalanceChange": 0,
//       "tokenBalanceChanges": []
//     },
//     {
//       "account": "ComputeBudget111111111111111111111111111111",
//       "nativeBalanceChange": 0,
//       "tokenBalanceChanges": []
//     }
//   ],
//   "description": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj transferred 1 SOL to JBx5QwskpsPkuVvDvmmkQUGJxiKzjMthaAHVimc9NZQ.",
//   "events": [],
//   "fee": 15000,
//   "feePayer": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj",
//   "instructions": [
//     {
//       "accounts": [],
//       "data": "3DVGviTXKAPH",
//       "innerInstructions": [],
//       "programId": "ComputeBudget111111111111111111111111111111"
//     },
//     {
//       "accounts": [],
//       "data": "LKoyXd",
//       "innerInstructions": [],
//       "programId": "ComputeBudget111111111111111111111111111111"
//     },
//     {
//       "accounts": [
//         "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj",
//         "JBx5QwskpsPkuVvDvmmkQUGJxiKzjMthaAHVimc9NZQ"
//       ],
//       "data": "3Bxs3zzLZLuLQEYX",
//       "innerInstructions": [],
//       "programId": "11111111111111111111111111111111"
//     }
//   ],
//   "nativeTransfers": [
//     {
//       "amount": 1000000000,
//       "fromUserAccount": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj",
//       "toUserAccount": "JBx5QwskpsPkuVvDvmmkQUGJxiKzjMthaAHVimc9NZQ"
//     }
//   ],
//   "signature": "2TmJYo1VX3cpnGvufQ5EfWbysDkEujTDRaWs9A7ZEFQsTFtuAKzyoBmawvMxBDdKdZDhxB19TZLAp2Dgwgj5nsS9",
//   "slot": 337471053,
//   "source": "SYSTEM_PROGRAM",
//   "timestamp": 1730638976,
//   "tokenTransfers": [],
//   "transactionError": null,
//   "type": "TRANSFER"
// }
// const webhookRes = {
//   "accountData": [
//     {
//       "account": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj",
//       "nativeBalanceChange": -15000,
//       "tokenBalanceChanges": []
//     },
//     {
//       "account": "HKxtipF1WF3vVnmw3RStWToANhV4nC225A1edQDMR6i8",
//       "nativeBalanceChange": 0,
//       "tokenBalanceChanges": [
//         {
//           "mint": "3wsmMRWV8hyNfZh97K5b5z6BSfLu9xMoEfiaSWjDG48s",
//           "rawTokenAmount": {
//             "decimals": 9,
//             "tokenAmount": "480000000"
//           },
//           "tokenAccount": "HKxtipF1WF3vVnmw3RStWToANhV4nC225A1edQDMR6i8",
//           "userAccount": "JBx5QwskpsPkuVvDvmmkQUGJxiKzjMthaAHVimc9NZQ"
//         }
//       ]
//     },
//     {
//       "account": "WEi9ksS2tmZCvLkMqUvzWvX5e2MWJ6vZHA4dFPbj66y",
//       "nativeBalanceChange": 0,
//       "tokenBalanceChanges": [
//         {
//           "mint": "3wsmMRWV8hyNfZh97K5b5z6BSfLu9xMoEfiaSWjDG48s",
//           "rawTokenAmount": {
//             "decimals": 9,
//             "tokenAmount": "-480000000"
//           },
//           "tokenAccount": "WEi9ksS2tmZCvLkMqUvzWvX5e2MWJ6vZHA4dFPbj66y",
//           "userAccount": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj"
//         }
//       ]
//     },
//     {
//       "account": "3wsmMRWV8hyNfZh97K5b5z6BSfLu9xMoEfiaSWjDG48s",
//       "nativeBalanceChange": 0,
//       "tokenBalanceChanges": []
//     },
//     {
//       "account": "ComputeBudget111111111111111111111111111111",
//       "nativeBalanceChange": 0,
//       "tokenBalanceChanges": []
//     },
//     {
//       "account": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
//       "nativeBalanceChange": 0,
//       "tokenBalanceChanges": []
//     }
//   ],
//   "description": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj transferred 0.48 3wsmMRWV8hyNfZh97K5b5z6BSfLu9xMoEfiaSWjDG48s to JBx5QwskpsPkuVvDvmmkQUGJxiKzjMthaAHVimc9NZQ.",
//   "events": [],
//   "fee": 15000,
//   "feePayer": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj",
//   "instructions": [
//     {
//       "accounts": [],
//       "data": "3p12TStBwZrw",
//       "innerInstructions": [],
//       "programId": "ComputeBudget111111111111111111111111111111"
//     },
//     {
//       "accounts": [],
//       "data": "HbM3Lj",
//       "innerInstructions": [],
//       "programId": "ComputeBudget111111111111111111111111111111"
//     },
//     {
//       "accounts": [
//         "WEi9ksS2tmZCvLkMqUvzWvX5e2MWJ6vZHA4dFPbj66y",
//         "3wsmMRWV8hyNfZh97K5b5z6BSfLu9xMoEfiaSWjDG48s",
//         "HKxtipF1WF3vVnmw3RStWToANhV4nC225A1edQDMR6i8",
//         "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj",
//         "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj"
//       ],
//       "data": "g77RiDwXdJReY",
//       "innerInstructions": [],
//       "programId": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
//     }
//   ],
//   "nativeTransfers": [],
//   "signature": "5ib7jtaRDvW5gueiTXRjoMxMgdmDRcJ3PAn2GfWLEeaq1KdV22EbQNq3XHgDa89jXT5LxsiBP17T26zMwAZCnrmx",
//   "slot": 337472650,
//   "source": "SOLANA_PROGRAM_LIBRARY",
//   "timestamp": 1730639583,
//   "tokenTransfers": [
//     {
//       "fromTokenAccount": "WEi9ksS2tmZCvLkMqUvzWvX5e2MWJ6vZHA4dFPbj66y",
//       "fromUserAccount": "75YAjLD7TGADBtPoDLQJuW5KCmypoFMfeZj7shoavCuj",
//       "mint": "3wsmMRWV8hyNfZh97K5b5z6BSfLu9xMoEfiaSWjDG48s",
//       "toTokenAccount": "HKxtipF1WF3vVnmw3RStWToANhV4nC225A1edQDMR6i8",
//       "toUserAccount": "JBx5QwskpsPkuVvDvmmkQUGJxiKzjMthaAHVimc9NZQ",
//       "tokenAmount": 0.48,
//       "tokenStandard": "Fungible"
//     }
//   ],
//   "transactionError": null,
//   "type": "TRANSFER"
// }
app.post('/helius', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("came here");
    console.log(req.body);
    res.json({
        message: "Succcess"
    });
    // const description = webhookRes.description.split(" ");
    // const type = description[3];
    // const recieverAccount = description[5];
    // let fromAddress, toAddress, amount;
    // if(type == "SOL"){
    //   fromAddress = (webhookRes.nativeTransfers[0] as any).fromUserAccount;
    //   toAddress = (webhookRes.nativeTransfers[0] as any).toUserAccount;
    //   amount = (webhookRes.nativeTransfers[0] as any).amount;
    //   if(toAddress != PUBLIC_KEY){
    //     res.json({
    //       message: "Another event happened"
    //     });
    //   }
    // }
    // else if(type == TOKEN_MINT_ADDRESS){
    //   fromAddress = (webhookRes.tokenTransfers[0] as any ).fromUserAccount;
    //   toAddress = (webhookRes.tokenTransfers[0] as any).toUserAccount;
    //   amount = (webhookRes.tokenTransfers[0] as any).tokenAmount;
    // }
    // else{
    //   res.json({
    //     message:"Invalid token sent"
    //   });
    // }
    // if (type === "SOL") {
    //     await mintTokens(fromAddress, toAddress, amount);
    // } else if(type == TOKEN_MINT_ADDRESS) {
    //     const tokenAmount = convertToTokenDecimalUnit(amount);
    //     console.log(tokenAmount);
    //     await burnTokens(fromAddress, toAddress, tokenAmount);
    //     await sendNativeTokens(fromAddress, toAddress, tokenAmount);
    // }
    // res.send('Transaction successful');
}));
app.get("/balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(address_1.PRIVATE_KEY));
    const balance = yield connection.getBalance(keypair.publicKey);
    res.json({
        balance: balance
    });
}));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
