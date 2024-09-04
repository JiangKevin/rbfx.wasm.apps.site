# 清屏
clear
reset
#
export FmDev=$(pwd)
echo $ FmDev
#
# rm ./common.data -y
# rm ./data.js -y
# file_packager common.data --preload ./web/db@/ --preload ./Data/tt@/Project/tt --js-output=data.js
file_packager common.data --preload ./web/asset@/ --js-output=data.js

mv ./common.data ./web/common/common.data
mv ./data.js ./web/common/data.js
#
node server.js
