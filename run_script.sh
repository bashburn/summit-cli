#!/bin/bash
RHQ_CLI_HOME=../../servers/rhq-remoting-cli-4.4.0.JON312GA
PATH=${PATH}:${RHQ_CLI_HOME}/bin
export RHQ_CLI_HOME
rhq-cli.sh $@

