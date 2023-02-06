const express = require('express');
const router = express.Router()
const axios = require('axios')
const { ethers } = require('ethers');


const private_key = "";

const createVoucher = async(domain, nftContract,tokenId,amount,price,royalty,startTime,duration,minter,owner,buyer,minted,CollectionName)=>{
    const voucher = {nftContract,tokenId,amount,price,royalty,startTime,duration,minter,owner,buyer,minted,CollectionName}
    const types = {
        LazyNFTVoucher: [
            {name: "nftContract", type: "address"},
            {name: "tokenId", type: "uint256"},
            {name: "amount", type: "uint256"},
            {name: "price", type: "uint256"},
            {name: "royalty", type: "uint256"},
            {name: "startTime", type: "uint256"},
            {name: "duration", type: "uint256"},
            {name: "minter", type: "address"},
            {name: "owner", type: "address"},
            {name: "buyer", type: "address"},
            {name: "minted", type: "bool"},
            {name: "CollectionName", type: "string"}
        ]
    }

    console.log(`hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii`);

    try{
        const signer = new ethers.Wallet(`0x${private_key}`);

        const signature = await signer._signTypedData(domain, types, voucher);


        return {
            ...voucher,
            signature
        }
    }catch(err){
        console.log(err)
    }

    
}

router.get('/api/v1/buyItem/:nftid',async (req,res)=>{
    try{
        const SIGNING_DOMAIN_NAME = "DiggDevelopment";
        const SIGNING_DOMAIN_Version = "1";
        const chainId = 80001;
        const contractAddress = "0xB8c8aCeA197fb341d6bb6Ad2E85DfB109d215C3d";

        const nftid = req.params.nftid;

        const domain = {
            name : SIGNING_DOMAIN_NAME,
            version: SIGNING_DOMAIN_Version,
            verifyingContract : contractAddress,
            chainId
        };

        

        const nftContract ="0xeD94F34a8F12027938cB16bd1F2Ab77d9127edCA" ;
        const tokenID = "1";
        const amount = "1";
        const price = ethers.utils.parseEther("0.001");
        const royalty= "2";
        const startTime = "1";
        const duration = "1";
        const minter = "0x4932b72f8F88e741366a30aa27492aFEd143A5E1";
        const owner = "0x4932b72f8F88e741366a30aa27492aFEd143A5E1";
        const buyer = "0x12dDd3b17aeD6DaA6241E37d3a1Ed19258D17ab1";
        const minted = false;
        const CollectionName = "abcd";

        
        const voucher = await createVoucher(domain,nftContract,tokenID,amount,price,royalty,startTime,duration,minter,owner,buyer,minted,CollectionName);
        let signature = voucher.signature;
        signature = signature.substring(2);
        const r= "0x"+signature.substring(0,64);
        const s= "0x"+signature.substring(64,128);
        const v= parseInt(signature.substring(128,130),16);

        console.log(v, r, s);

        console.log(`["${voucher.nftContract}","${voucher.tokenId}","${voucher.amount}","${voucher.price}","${voucher.royalty}","${voucher.startTime}","${voucher.duration}","${voucher.minter}","${voucher.owner}","${voucher.buyer}",${voucher.minted},"${voucher.CollectionName}","${voucher.signature}"]`)
        res.json(voucher);


    }catch(err){
        res.status(500).send("Internal Server Error");
    }



});

module.exports = router;