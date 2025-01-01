// npm i @solana/web3.js@1
// npm install @solana-developers/helpers
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    sendAndConfirmTransaction,
    SystemProgram,
    Transaction,
    clusterApiUrl
} from '@solana/web3.js';
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";

async function main() {
    const wallet1 = process.env.PUBLIC_KEY;
    const wallet2 = process.env.WALLET2_PUBLIC;
    if (!wallet1 || !wallet2) {
        throw new Error("Wallets not found");
    }
    const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
    const connection = new Connection(clusterApiUrl("devnet"));
    const wallet1Public = new PublicKey(wallet1);
    const wallet2Public = new PublicKey(wallet2);
    const balance = await connection.getBalance(wallet1Public);
    const balance2 = await connection.getBalance(senderKeypair.publicKey);
    console.log(`The balance of the account at ${wallet1Public} is ${balance} lamports`);
    console.log(`The balance of the account at ${senderKeypair.publicKey} is ${balance2} lamports`);


    const transaction = new Transaction();


    const sendSolInstruction = SystemProgram.transfer({
        fromPubkey: wallet1Public,
        toPubkey: wallet2Public,
        lamports: 100,
    });

    transaction.add(sendSolInstruction);

    const signature = await sendAndConfirmTransaction(connection, transaction, [
        senderKeypair,
    ]);

    console.log(`Finished: `, signature);
}

main();