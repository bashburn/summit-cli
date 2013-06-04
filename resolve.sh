#!/bin/bash
#
### Dependency resolver for javascript
# Harri Savolainen (hsavolai@redhat.com)
#
# Usage: Include @include [file with path] in js files.
# Recursive and cyclic dependencies supported.
#

## Lookup value from array
# $1 value
# $2 array[@]
# returns $FOUND, $NOT_FOUND

NOT_FOUND=250  
FOUND=251 

function inArray() {
    
   local lookup=$1    
   shift
   declare -a array=("${!1}")
   arraySize=( ${#array[@]} - 1 );

  for (( j=0; j<$arraySize; j++ )) do
        if [ "${array[$j]}" == "$lookup" ]; then
	 return $FOUND;
	fi
  done

  return $NOT_FOUND;
}

## resolve cyclic dependencies in javascript files
# $1 filename 
# Note no support for spaces in file names
function resolveDeps () {

  if [ -r "$1" ]; then 
    for i in `grep @import $1 | awk {'print $3'}`; do 
    
    inArray $i depsArray[@]
    retVal=$?;

    if [ "$retVal" -eq $NOT_FOUND  ]; then
      depsArray[$numDeps]=$i;
      let numDeps++;
      resolveDeps $i;
    fi

    done
  fi
} 

## Main

if [ $# -ne 1 ]; then
  echo "Javascript dependecy resolution."
  echo "Usage: $0 [filename.js]"
  exit 1;
fi
if [ -r $1 ]; then 
  scriptHome=$(cd `dirname $1` && pwd)
  cd $scriptHome;
  numDeps=1;
  fileName=`basename $1`;
  depsArray["0"]=$fileName;

  resolveDeps $fileName;

  for (( c=0; c<$numDeps; c++ ))
  do
    cat ${depsArray[$c]};
  done
fi
