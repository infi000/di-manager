#!/bin/sh

SECONDS=0

rm *.zip
yarn build

if [ $? -ne 0 ]; then
exit 1
fi

mkdir -p ./output/html
mkdir -p ./output/html/static

# 结算开放平台-商户后台
cp ./build/index.html ./output/html/index.html
cp -r ./build/static/* ./output/html/static

TIME=`date +%m%d-%H%M`
zip -qr settlement-open-${TIME}.zip ./output
rm -rf ./build ./output

duration=$SECONDS
echo "耗时 $(($duration / 60)) 分 $(($duration % 60)) 秒"
