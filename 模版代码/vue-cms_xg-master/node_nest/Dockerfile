#引入基本的镜像
FROM node:16.0.0-alpine

# 添加时区环境变量，亚洲，上海
ENV TIME_ZONE Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TIME_ZONE /etc/localtime

ENV NODE_ENV=production

RUN mkdir -p /vueCms

ADD . /vueCms

#设置/vueCms为工作目录
WORKDIR /vueCms

COPY ["package.json", "yarn.lock", "./"]

RUN npm run build

RUN rm yarn.lock

# 配置环境变量
ENV NODE_ENV pro

#暴露后端接口的端口号
EXPOSE 3000

#暴露即时通信的端口号
EXPOSE 9876

# 程序启动命令
CMD ["node","./dist/main.js"]
#CMD /bin/bash

##FROM golang:alpine as build-env
#ENV GOROOT /usr/local/go
#ENV GOPATH /data/gopath
#ENV PATH $GOROOT/bin:$PATH
#RUN yum install -y curl
#RUN wget -c https://storage.googleapis.com/golang/go1.15.11.linux-amd64.tar.gz \
#    && tar -C /usr/local -xzf go1.15.11.linux-amd64.tar.gz \
#    && rm -rf go1.15.11.linux-amd64.tar.gz
##RUN mkdir -p /data/go
#RUN ln -sv /usr/local/go/bin/go /bin
#
## 为我们的镜像设置必要的环境变量
#ENV GOPROXY=https://goproxy.cn  \
#    GO111MODULE=on \
#    CGO_ENABLED=0 \
#    GOOS=linux \
#    GOARCH=amd64
#
#RUN mkdir -p /www123
##把当前所有的内容添加到镜像的www123文件夹下
##ADD . /www123
#
## 进入镜像的www123文件夹下，将我们的代码编译成二进制可执行文件app
#RUN cd /www123 && go build -o www123exe .
#
##分阶段，减少体积
##FROM alpine
#
##时区问题
##RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
##RUN apk add --no-cache tzdata \
##    && ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
##    && echo "Asia/Shanghai" > /etc/timezone
#
#WORKDIR /www123
##COPY --from=build-env /www123/www123exe /www123
#ADD . /www123
#
## 暴露服务端口
#EXPOSE 8181
#
##启动点
#ENTRYPOINT ./www123exe
# 启动容器时运行的命令
#CMD ["/www123/www123exe"]

#docker run -d -p 8282:3000 -v /usr/local/nginx/html/test/nestjs/public:/vueCms/public/ vue-cms-nestjs:latest


#执行Dockerfile生成镜像
#docker build -f Dockerfile -t vue-cms-nestjs:latest .
#-f flag 是我们的dockerfile
#-t tag 是镜像标签
#最后的（.） 命令式当前文件夹下的Dockerfile

#运行镜像
#-d设置后台运行 8181为访问端口ip 8080项目中设置的端口ip
#docker run -d -p 8282:3000 vue-cms-nestjs:latest



#Docker入门教程101: 基于Docker部署Go项目
##https://zhuanlan.zhihu.com/p/453776691


#生成对的docker镜像文件
#执行文件也成功，但是映射端访问不了，因为服务器的端口号没有开放设置



