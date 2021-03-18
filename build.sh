# #!/bin/sh

 
# # 版本信息输出
# echo "当前编译版本为$build_type";
# echo 'node \c'
# node -v
# npm config get registry;

# # 附加环境参数
# ERR_MSG_MISS_BUILD_EXTERNAL_PARAMS="错误：缺少 build_external_params 参数\n\n
# - test 测试环境\n
# - uat uat环境\n
# - online 线上环境\n
# "
# if [[ "$1" =~ ^(test|uat|online)$ ]]; then
#   export PROJECT_ENV=$1
#   env | grep PROJECT_ENV
# else
#   echo -e $ERR_MSG_MISS_BUILD_EXTERNAL_PARAMS
#   exit 1
# fi

# # 打包命令主体：优先使用yarn进行包安装，如果没有使用npm
# if which yarn 2>/dev/null; then
#     echo 'yarn \c'
#     yarn -v
#     yarn -production --ignore-engines
#     yarn build
# else
#     echo 'npm \c'
#     npm -v
#     npm install --production
#     npm run build
# fi


# # 错误拦截
# if [ $? -ne 0 ]; then
# exit 1
# fi

# rm -rf ./output


# mkdir -p ./output/html/static
# mkdir -p ./output/html
