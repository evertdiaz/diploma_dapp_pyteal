import algosdk from 'algosdk'

const algod_token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const algod_host = "http://127.0.0.1";
const algod_port = "4001";
export const algodClient = new algosdk.Algodv2(algod_token, algod_host, algod_port)

const indexer_token = ""
const indexer_host = "http://127.0.0.1"
const indexer_port = "8980"
export const indexerClient = new algosdk.Indexer(indexer_token, indexer_host, indexer_port)
