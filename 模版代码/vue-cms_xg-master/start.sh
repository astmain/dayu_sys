#!/bin/bash

#退出窗口
function handleExitWindow(){
  echo 按任意键退出
  read -n 1
  exit 1
}

#判断文件是否存在 并创建
function handleCreateFile(){
  nodeModulesFile=$1  #项目依赖文件路径

  #判断目录是否存在
  [ ! -d "$nodeModulesFile" ] && {
     return 1
  }
}

fileUrl="./installPage/node_modules"
handleCreateFile $fileUrl

#文件依赖不存在，可以安装依赖
[ $? == 1 ] && {
cd "./installPage" && npm install && npm run dev
} || {
cd "./installPage" && npm run dev
}

handleExitWindow


