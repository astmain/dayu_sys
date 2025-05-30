/*- coding = utf-8 -*-
@Time : 2023/5/13 11:38
@Author : 沉默小管
@File : index.ts
@web  : golangblog.blog.csdn.net
@Software: WebStorm
*/

import {io} from "socket.io-client";

export class socketClient{
    //socket链接路径
    private socketUrl:string=""

    //尝试链接次数
    private attemptsNum:number = 0;

    //socket链接对象
    private client;
    constructor() {
        this.init();
    }
    /**
     * socket链接
     */
    init(){
        this.socketUrl = import.meta.env.VITE_SOCKET_HTTP
        let wssType = import.meta.env.VITE_NODE_ENV=='pro'?'wss://':'ws://';
        this.client = io(wssType+this.socketUrl,{path:"/socket"}).connect()
        this.handleConnect();
        this.handleDisconnection();
        this.handleConnectError();
        this.handleReconnectAttempt();
        this.handleReconnecting();
        this.handleReconnectingError();
        return this;
    }

    /**
     * 连接成功状态显示
     */
    handleConnect(){
        // 连接成功
        this.client.on("connect", () => {
            console.log(this.client.id, '监听客户端连接成功-connect');
        })
        return this;
    }

    /**
     * socket事件
     * @param eventMsgName  事件名称
     * @param func          函数
     */
    handleSocketEvent(eventMsgName:string,func:Function){
        this.client.on(eventMsgName,func)
        return this;
    }

    /**
     * 向服务端发送消息，通过已有的事件
     * @param eventMsgName  事件名称
     * @param msg           发送消息内容
     */
    handleSocketEmit(eventMsgName:string,msg:any){
        this.client.emit(eventMsgName, msg)
        return this;
    }

    /**
     * 监听是否断开连接
     */
    handleDisconnection(){
        this.client.on("disconnect", (reason) => {
            console.log(this.client.connected);
            console.log("断开连接-disconnect", reason);
        })
        return this;
    }

    /**
     * 获取错误信息
     */
    handleError(){
        this.client.on("error", (err) => {
            console.log("获取错误信息", err);
        })
        return this;
    }

    /**
     * 获取连接错误
     */
    handleConnectError(){
        this.client.on("connect_error", (err) => {
            console.log("获取连接错误", err);
        })
        return this;
    }
    /**
     * 重连成功
     */
    handleReconnect(){
        this.client.on("reconnect", (attemptNumber) => {
            console.log("重连成功-reconnect", attemptNumber);
        })
        return this;
    }
    /**
     * 尝试重连时触发
     */
    handleReconnectAttempt(){
        this.client.on("reconnect_attempt", (attemptNumber) => {
            console.log("尝试重连-reconnect_attempt", attemptNumber);
        })
        return this;
    }
    /**
     * 在尝试重新连接时触发
     */
    handleReconnecting(){
        this.client.on("reconnecting", (attemptNumber) => {
            console.log("在尝试重新连接时触发-reconnecting", attemptNumber);
        })
        return this;
    }
    /**
     * 重连尝试错误
     */
    handleReconnectingError(){
        this.client.on("reconnect_error", (err) => {
            console.log("重连尝试错误-reconnect_error", err);
        })
        return this;
    }
}