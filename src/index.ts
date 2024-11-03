require('dotenv').config();
import express from 'express';
import { burnTokens, mintTokens, sendNativeTokens } from './mintTokens';
import { LAMPORTS_PER_SOL, Connection, Keypair} from '@solana/web3.js';
import { PRIVATE_KEY, PUBLIC_KEY, TOKEN_MINT_ADDRESS } from './address';
import { convertToTokenDecimalUnit } from './util';

const app = express();

const connection = new Connection("https://api.devnet.solana.com/", "confirmed");


app.post('/helius', async(req, res) => {
    const description = req.body.description.split(" ");
    const type = description[3];
    const recieverAccount = description[5];
    let fromAddress, toAddress, amount;

    if(type == "SOL"){
      fromAddress = (req.body.nativeTransfers[0] as any).fromUserAccount;
      toAddress = (req.body.nativeTransfers[0] as any).toUserAccount;
      amount = (req.body.nativeTransfers[0] as any).amount;
      if(toAddress != PUBLIC_KEY){
        res.json({
          message: "Another event happened"
        });
      }
    }
    else if(type == TOKEN_MINT_ADDRESS){
      fromAddress = (req.body.tokenTransfers[0] as any ).fromUserAccount;
      toAddress = (req.body.tokenTransfers[0] as any).toUserAccount;
      amount = (req.body.tokenTransfers[0] as any).tokenAmount;
    }
    else{
      res.json({
        message:"Invalid token sent"
      });
    }
    
    if (type === "SOL") {
        await mintTokens(fromAddress, toAddress, amount);
    } else if(type == TOKEN_MINT_ADDRESS) {
        const tokenAmount = convertToTokenDecimalUnit(amount);
        console.log(tokenAmount);
        await burnTokens(fromAddress, toAddress, tokenAmount);
        await sendNativeTokens(fromAddress, toAddress, tokenAmount);
    }

    res.send('Transaction successful');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});