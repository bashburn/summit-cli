# Sample scripts for working with EAP6 and JBoss Operations Network

## Instructions
1. Run "./resolve.sh create-datasource.js > create-datasource-build.js" to generate the JavaScript file from the imports.
2. Edit run\_script.sh to set the RHC\_CLI\_HOME directory.
3. Run "./run\_script.sh -u rhqadmin -p rhqadmin -f `pwd`/create-datasource-build.js"

