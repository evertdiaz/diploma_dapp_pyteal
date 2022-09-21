### access sandbox
`./sandbox enter algod`

### app creation
```
goal app create \
--creator INSERT_ADDRESS_HERE \
--approval-prog /data/INSERT_SOURCE_HERE/approval.teal \
--clear-prog /data/INSERT_SOURCE_HERE/clear.teal \
--global-byteslices 1 \
--global-ints 0 \
--local-byteslices 1 \
--local-ints 0
```

### set your accounts for testing
Check current accounts: `goal account list`
Get Mnemonic: `goal account export -a INSERT_AN_ADDRESS`

### reading global and local state
`goal app read --global --app-id INSERT_APPID_HERE --guess-format`
`goal app read --local -f INSERT_ADDRESS_HERE --app-id INSERT_APPID_HERE --guess-format`
