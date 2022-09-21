import algosdk from 'algosdk'
import { algodClient } from './connection';

export const optInApplication = async(
  algodClient: algosdk.Algodv2,   
  student: algosdk.Account, 
  appIndex: number,
) => {
  try {  
    const suggestedParams = await algodClient.getTransactionParams().do()
    let txn = algosdk.makeApplicationOptInTxnFromObject({
      from: student.addr,
      appIndex,
      // @ts-ignore
      suggestedParams
    });
  
    let signedTxn = txn.signTxn(student.sk);
    let tx = (await algodClient.sendRawTransaction(signedTxn).do());
    console.log(`Transaction ID: ${tx.txId}`)
  }
  catch (err) {
      console.log("err", err);
  }
}

export const registerDiplomaLocalState = async(
  algodClient: algosdk.Algodv2,
  registrar: algosdk.Account,
  student: algosdk.Account,
  appIndex: number,
  diploma: string
) => {
  try {  
    const suggestedParams = await algodClient.getTransactionParams().do()
    const appArgs = []
    appArgs.push(
      // @ts-ignore
      new Uint8Array(Buffer.from("register_diploma")),
      new Uint8Array(Buffer.from(diploma)),
    )
    
    let txn1 = algosdk.makeApplicationCallTxnFromObject({
      appArgs,
      appIndex,
      from: registrar.addr,
      suggestedParams,
      onComplete: 0,
      accounts: [student.addr]
      
    })

    const signedTxn = txn1.signTxn(registrar.sk)
    const tx = (await algodClient.sendRawTransaction(signedTxn).do())
    await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
    console.log(`Transaction ID: ${tx.txId}`)
  }
  catch (err) {
      console.log("err", err);
  }
}

export const createASAAndKeep = async(
  algodClient: algosdk.Algodv2,
  registrar: algosdk.Account,
  student: algosdk.Account
  ) => {
    try {  
      const suggestedParams = await algodClient.getTransactionParams().do()
      let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
      from: registrar.addr,
      note: new Uint8Array(Buffer.from("student diploma generation")),
      total: 1,
      decimals: 0,
      defaultFrozen: false,
      manager: registrar.addr,
      reserve: registrar.addr,
      freeze: registrar.addr,
      clawback: registrar.addr,
      unitName: "DPLM",
      assetName: `Diploma for ${student.addr.slice(0,6)}`,
      suggestedParams
    })

    const signedTxn = txn.signTxn(registrar.sk)
    const tx = (await algodClient.sendRawTransaction(signedTxn).do())
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
    console.log(`Asset ID: ${confirmedTxn["asset-index"]} - Tx ID: ${tx.txId}`)
    }
    catch (err) {
        console.log("err", err);
    }
  }

export const setASALocalState = async(
  algodClient: algosdk.Algodv2,
  registrar: algosdk.Account,
  student: algosdk.Account,
  asaId: string,
  appIndex: number
  ) => {
    try { 
      const suggestedParams = await algodClient.getTransactionParams().do()
      const appArgs = []
      appArgs.push(
        // @ts-ignore
        new Uint8Array(Buffer.from("set_asa")),
        new Uint8Array(Buffer.from(asaId)),
      )
      
      let txn = algosdk.makeApplicationCallTxnFromObject({
        appArgs: appArgs,
        appIndex,
        from: registrar.addr,
        suggestedParams,
        onComplete: 0,
        accounts: [student.addr]
      })

      const signedTxn = txn.signTxn(registrar.sk)
      const tx = (await algodClient.sendRawTransaction(signedTxn).do())
      await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
      console.log(`Transaction ID: ${tx.txId}`)
    }
    catch (err) {
        console.log("err", err);
    }
  }

export const hasDiplomaToClaim = async(
  indexerClient: algosdk.Indexer,
  student: algosdk.Account,
  appId: number
  ) => {
    try {  
      const suggestedParams = await algodClient.getTransactionParams().do()
      const applicationID = appId;
      const address = student.addr;
      const accountApplications = await indexerClient
        .lookupAccountAppLocalStates(student.addr)
        .applicationID(applicationID)
        .do();
      let accountHasDiploma = false
      if (accountApplications['apps-local-states'].length > 0) {
        accountHasDiploma = true
      }
      console.log(accountHasDiploma?'Student has a diploma':'Student doesnt have registered diploma to claim')
      return accountHasDiploma
    }
    catch (err) {
        console.log("err", err);
    }
  }

export const optInDiploma = async(
  algodClient: algosdk.Algodv2,
  student: algosdk.Account,
  asaId: string,
  ) => {
    try {
      const suggestedParams = await algodClient.getTransactionParams().do()
      let aoptin = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: student.addr,
        to: student.addr,
        amount: 0,
        assetIndex: parseInt(asaId),
        suggestedParams
      })
      const signedTxn = aoptin.signTxn(student.sk)
      const tx = (await algodClient.sendRawTransaction(signedTxn).do())
      console.log(`Transaction ID: ${tx.txId}`)
    }
    catch (err) {
        console.log("err", err);
    }
  }

export const sendDiploma = async(
  algodClient: algosdk.Algodv2,
  registrar: algosdk.Account,
  student: algosdk.Account,
  asaId: string
  ) => {
    try {  
      const suggestedParams = await algodClient.getTransactionParams().do()
      let atxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: registrar.addr,
        to: student.addr,
        amount: 1,
        assetIndex: parseInt(asaId),
        suggestedParams
      })
      const signedTxn = atxn.signTxn(registrar.sk)
      const tx = (await algodClient.sendRawTransaction(signedTxn).do())
      await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
      console.log(`Transaction ID: ${tx.txId}`)
    }
    catch (err) {
        console.log("err", err);
    }
  }

export const clearLocalState = async(
  algodClient: algosdk.Algodv2,
  student: algosdk.Account,
  appIndex: number
  ) => {
    try {
      const suggestedParams = await algodClient.getTransactionParams().do()
      let ctxn = algosdk.makeApplicationClearStateTxnFromObject({
        from: student.addr,
        appIndex,
        suggestedParams
      })

      const signedTxn = ctxn.signTxn(student.sk)
      const tx = (await algodClient.sendRawTransaction(signedTxn).do())
      await algosdk.waitForConfirmation(algodClient, tx.txId, 4);
      console.log(`Transaction ID: ${tx.txId}`)
    }
    catch (err) {
        console.log("err", err);
    }
  }