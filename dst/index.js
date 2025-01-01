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
// npm i @solana/web3.js@1
// npm install @solana-developers/helpers
const web3_js_1 = require("@solana/web3.js");
const helpers_1 = require("@solana-developers/helpers");
require("dotenv/config");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet1 = process.env.PUBLIC_KEY;
        const wallet2 = process.env.WALLET2_PUBLIC;
        if (!wallet1 || !wallet2) {
            throw new Error("Wallets not found");
        }
        const senderKeypair = (0, helpers_1.getKeypairFromEnvironment)("SECRET_KEY");
        const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"));
        const wallet1Public = new web3_js_1.PublicKey(wallet1);
        const wallet2Public = new web3_js_1.PublicKey(wallet2);
        const balance = yield connection.getBalance(wallet1Public);
        const balance2 = yield connection.getBalance(senderKeypair.publicKey);
        console.log(`The balance of the account at ${wallet1Public} is ${balance} lamports`);
        console.log(`The balance of the account at ${senderKeypair.publicKey} is ${balance2} lamports`);
        const transaction = new web3_js_1.Transaction();
        const sendSolInstruction = web3_js_1.SystemProgram.transfer({
            fromPubkey: wallet1Public,
            toPubkey: wallet2Public,
            lamports: 100,
        });
        transaction.add(sendSolInstruction);
        const signature = (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [
            senderKeypair,
        ]);
        console.log(`Finished: `, signature);
    });
}
main();
