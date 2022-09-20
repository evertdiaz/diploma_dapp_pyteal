### access sandbox
`./sandbox enter algod`

### get local account list
`goal account list`

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

### optin app from registrar and from student

`goal app optin -f INSERT_ADDRESS_HERE --app-id INSERT_APPID_HERE`

### reading global and local state
`goal app read --global --app-id APPID --guess-format`
`goal app read --local -f INSERT_ADDRESS_HERE --app-id INSERT_APPID_HERE --guess-format`

### calling the app
```
goal app call \
-f INSERT_ADDRESS_HERE \
--app-id INSERT_APPID_HERE \
--app-account "INSERT_ADDRESS_HERE" \
--app-arg "str:register_diploma" \
--app-arg "str:diploma-title" 
```

### debugging
Add this at the end of the app call
`—out=dump.dr —dryrun-dump`
And then execute
`tealdbg debug /data/INSERT_SOURCE_HERE/approval.teal -d dump.dr —listen 0.0.0.0`