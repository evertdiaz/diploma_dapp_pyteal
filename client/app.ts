import algosdk, { decodeAddress, Transaction, Indexer } from "algosdk";
import { optinASA } from "../../cryptomonday_js/asa";

import { algodClient, indexerClient } from './connection'
import { appId, student, registrar, asaId } from './data'
import { optInApplication, registerDiplomaLocalState, createASAAndKeep, setASALocalState, hasDiplomaToClaim, optInDiploma, sendDiploma, clearLocalState } from "./methods";

const main = async() => {
  // OptIn the student to the application
  // optInApplication(algodClient, student, appId)

  // Registrar sets local state for a specific student 
  // registerDiplomaLocalState(algodClient, registrar, student, appId, "diploma-course-new")

  // Next the registrar mints the NFT and save it for a later claim from student
  // createASAAndKeep(algodClient, registrar, student)

  // Third transaction for set the ASA number on the local state
  // setASALocalState(algodClient, registrar, student, asaId, appId)

  // Check if the student has a diploma to claim
  // if (await hasDiplomaToClaim(indexerClient, student, appId)) {
  //   // Optin the ASA
  //   // optInDiploma(algodClient,student,asaId)

  //   // Send the Diploma
  //   // sendDiploma(algodClient,registrar,student,asaId)

  //   // Clear local state
  //   // clearLocalState(algodClient,student,appId)

  // }
}

main()