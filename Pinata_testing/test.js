import { config } from "dotenv";
import { PinataSDK } from "pinata";

config();

const pinata = new PinataSDK({
    pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZThiYWZiZC1iODY5LTRmOTgtOWNmNS1jYzljZmY4ODAzMGUiLCJlbWFpbCI6Im1vaGl0MjYwNTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5OWFjYTEzMTg3NWE1ZjY5YzU4MyIsInNjb3BlZEtleVNlY3JldCI6IjM0NWI0YjI0NzkwOTE0MzM0NTBkMjcxMjU5NDdiOWRkN2ZhZjE2NjVjOTcxNTVlYmIxOWE2Y2U3OTIyZTExZDAiLCJleHAiOjE3NzQxMTg2NjJ9.Uaud34LYOVAWxPObdrz8nsoQfklokj0dn52KcJB1lVQ",
    pinataGateway: "rose-chemical-leopon-23.mypinata.cloud",
});

async function main() {
    try {
        const file = new File(["hello"], "Testing.txt", { type: "text/plain" });
        const upload = await pinata.upload.public.file(file);
        console.log(upload);
    } catch (error) {
        console.log(error);
    }
}

await main();