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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNativeTokens = exports.burnTokens = exports.mintTokens = exports.TOKEN_DECIMALS = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const address_1 = require("./address");
const connection = new web3_js_1.Connection("https://api.devnet.solana.com", "confirmed");
const payer = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(address_1.PRIVATE_KEY));
const mintAddress = new web3_js_1.PublicKey(address_1.TOKEN_MINT_ADDRESS);
const LST_RATE = 960000000; // 1 SOL = 0.96 HSOL
exports.TOKEN_DECIMALS = 1000000000;
const mintTokens = (toAddress, fromAddress, amount) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(fromAddress);
    console.log(toAddress);
    console.log(payer.publicKey);
    const to = new web3_js_1.PublicKey(toAddress);
    const from = new web3_js_1.PublicKey(fromAddress);
    const amt = LST_RATE * (amount / web3_js_1.LAMPORTS_PER_SOL); //send 0.96 * x custom-SOL
    const asscociatedAccount = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(connection, payer, mintAddress, to);
    console.log(asscociatedAccount.address);
    yield (0, spl_token_1.mintTo)(connection, payer, mintAddress, asscociatedAccount.address, payer, amt);
    console.log(`Minted ${amt} tokens to ${to}`);
});
exports.mintTokens = mintTokens;
const burnTokens = (toAddress, fromAddress, burnAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const associatedTokenAccount = yield (0, spl_token_1.getAssociatedTokenAddress)(mintAddress, payer.publicKey);
    console.log(associatedTokenAccount);
    const transaction = new web3_js_1.Transaction().add((0, spl_token_1.createBurnCheckedInstruction)(associatedTokenAccount, mintAddress, payer.publicKey, burnAmount, 9));
    const txnSignature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer]);
    console.log(`Burned ${burnAmount} from ${fromAddress}: ${txnSignature}`);
});
exports.burnTokens = burnTokens;
const sendNativeTokens = (toAddress, fromAddress, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const to = new web3_js_1.PublicKey(toAddress);
    const from = new web3_js_1.PublicKey(fromAddress);
    const solAmount = (amount / LST_RATE);
    const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.transfer({
        fromPubkey: from,
        toPubkey: to,
        lamports: solAmount * web3_js_1.LAMPORTS_PER_SOL
    }));
    const txnSignature = yield (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer]);
    console.log(`Sent ${solAmount} SOLS to ${to}: ${txnSignature}`);
});
exports.sendNativeTokens = sendNativeTokens;
