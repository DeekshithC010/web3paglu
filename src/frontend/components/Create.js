import { useState } from 'react';
import { ethers } from "ethers";
import { Row, Form, Button } from 'react-bootstrap';
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlZThiYWZiZC1iODY5LTRmOTgtOWNmNS1jYzljZmY4ODAzMGUiLCJlbWFpbCI6Im1vaGl0MjYwNTA0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI5OWFjYTEzMTg3NWE1ZjY5YzU4MyIsInNjb3BlZEtleVNlY3JldCI6IjM0NWI0YjI0NzkwOTE0MzM0NTBkMjcxMjU5NDdiOWRkN2ZhZjE2NjVjOTcxNTVlYmIxOWE2Y2U3OTIyZTExZDAiLCJleHAiOjE3NzQxMTg2NjJ9.Uaud34LYOVAWxPObdrz8nsoQfklokj0dn52KcJB1lVQ", // Keep this secret
});

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState("");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (!file) return;

    try {
      const upload = await pinata.upload.public.file(file);
      if (upload.cid) {
        console.log("Uploaded Image:", upload);
        setImage(`https://rose-chemical-leopon-23.mypinata.cloud/ipfs/${upload.cid}`);
      }
    } catch (error) {
      console.error("Pinata IPFS image upload error: ", error);
    }
  };

  const createNFT = async () => {
    if (!image || !price || !name || !description) {
      alert("Please fill all fields");
      return;
    }

    const metadata = { image, price, name, description };

    try {
      const upload = await pinata.upload.public.json(metadata);
      if (upload.cid) {
        await mintThenList(upload.cid);
      }
    } catch (error) {
      console.error("Pinata IPFS metadata upload error: ", error);
    }
  };

  const mintThenList = async (metadataCid) => {
    try {
      const uri = `https://rose-chemical-leopon-23.mypinata.cloud/ipfs/${metadataCid}`;
      let tx = await nft.mint(uri);
      let receipt = await tx.wait();

      let tokenId = receipt.events[0].args.tokenId.toNumber();
      console.log("Minted NFT Token ID:", tokenId);

      await (await nft.setApprovalForAll(marketplace.address, true)).wait();
      const listingPrice = ethers.utils.parseEther(price.toString());
      await (await marketplace.makeItem(nft.address, tokenId, listingPrice)).wait();
      alert("NFT Created & Listed Successfully!");
    } catch (error) {
      console.error("Error creating NFT: ", error);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4">
              <Form.Control type="file" required name="file" onChange={uploadToIPFS} />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} variant="primary" size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Create;
