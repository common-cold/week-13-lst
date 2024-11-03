import { getOrCreateAssociatedTokenAccount, mintTo, burn, transfer, getAssociatedTokenAddress, createBurnCheckedInstruction} from "@solana/spl-token";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmRawTransaction, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import { PRIVATE_KEY, PUBLIC_KEY, TOKEN_MINT_ADDRESS } from "./address"; 


const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const payer = Keypair.fromSecretKey(Uint8Array.from(PRIVATE_KEY));
const mintAddress = new PublicKey(TOKEN_MINT_ADDRESS);
const LST_RATE = 960000000;      // 1 SOL = 0.96 HSOL
export const TOKEN_DECIMALS = 1000000000;

export const mintTokens = async (toAddress: string, fromAddress: string, amount: number) => {
    console.log(fromAddress);
    console.log(toAddress);
    console.log(payer.publicKey);
    const to = new PublicKey(toAddress);
    const from = new PublicKey(fromAddress);
    const amt = LST_RATE*(amount/LAMPORTS_PER_SOL);   //send 0.96 * x custom-SOL

    const asscociatedAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mintAddress, to);
    console.log(asscociatedAccount.address);
    await mintTo(connection, payer, mintAddress, asscociatedAccount.address, payer, amt);
    console.log(`Minted ${amt} tokens to ${to}`);
}

export const burnTokens = async (toAddress: string, fromAddress: string, burnAmount: number) => {
    const associatedTokenAccount = await getAssociatedTokenAddress(mintAddress, payer.publicKey);
    console.log(associatedTokenAccount);
    const transaction = new Transaction().add(
        createBurnCheckedInstruction(
            associatedTokenAccount,
            mintAddress,
            payer.publicKey,
            burnAmount,
            9
        )
    );

    const txnSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);
    console.log(`Burned ${burnAmount} from ${fromAddress}: ${txnSignature}`);
}

export const sendNativeTokens = async (toAddress: string, fromAddress: string, amount: number) => {
    const to = new PublicKey(toAddress);
    const from = new PublicKey(fromAddress);
    const solAmount = (amount/LST_RATE);
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: from,
            toPubkey: to,
            lamports: solAmount * LAMPORTS_PER_SOL
        })
    );
    const txnSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);

    console.log(`Sent ${solAmount} SOLS to ${to}: ${txnSignature}`);
}