#!/bin/bash

echo "[0] Start initial container script @ "`date '+%Y-%m-%d %H:%M:%S'`

echo "[1] Install configuration utilities"
apt-get update 
apt-get install -y curl jq

echo "[2] Detect configuration values"
CONTAINER_METADATA=$(curl ${ECS_CONTAINER_METADATA_URI_V4}/task)
PRIVATE_IP=$(echo $CONTAINER_METADATA | jq --raw-output .Containers[0].Networks[0].IPv4Addresses[0])
AZ=$(echo $CONTAINER_METADATA | jq --raw-output .AvailabilityZone)
echo "Metadata: ${CONTAINER_METADATA}"
echo "Private IP: ${PRIVATE_IP}"
echo "Availability zone: ${AZ}"

RANDOM_ID=$(cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)
echo "[3] Generate runtime seed: ${RANDOM_ID} ";

BUILD_FILE="/app/build.json"
CONFIG_FILE="/server/config.json"
mkdir -p /server
if [ ! -f "$CONFIG_FILE" ]; then 
	echo "[4] Create configuration file: ${CONFIG_FILE}"
	echo $RANDOM_ID > ${CONFIG_FILE}; 
else
	echo "[4] Detected configuration file: ${CONFIG_FILE}"
fi

RUNTIME_ID=$(cat ${CONFIG_FILE})
echo "[5] Parse runtime ID: ${RUNTIME_ID}"

BUILD_ID=$(cat ${BUILD_FILE})
echo "[6] Parse build ID: ${BUILD_ID}"

# the index.html file is generated with the private ip and the unique id
INDEX_FILE=/app/index.html
echo "[7] Write configuration data: ${INDEX_FILE}"

echo -e "<!-- " >> $INDEX_FILE
echp -e " STARTUP_TIME: "`date '+%Y-%m-%d %H:%M:%S'` >> $INDEX_FILE
echp -e " BUILD_ID: ${BUILD_ID}" >> $INDEX_FILE
echo -e " RUNTIME_ID: ${RUNTIME_ID}" >> $INDEX_FILE
echo -e " PRIVATE_IP: ${PRIVATE_IP}" >> $INDEX_FILE
echo -e " AZ: ${AZ}" >> $INDEX_FILE
echo " -->" >> $INDEX_FILE

echo "[8] Finish initial container script @ "`date '+%Y-%m-%d %H:%M:%S'`

echo "[9] Start nginx service @ "`date '+%Y-%m-%d %H:%M:%S'`
nginx -g "daemon off;"