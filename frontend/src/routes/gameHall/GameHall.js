import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
import styles from './GameHall.css';

function GameHall ({
  loading,
  dispatch,
  AllGamesInfo,
  UserInfo,
})  {

  const roomArray = [1,2,3,4,5,6];
  var ws;
  function connect() {
    // 创建websocket
    ws = new WebSocket("ws://"+"coderhelper.cn"+":4040");
    // 当socket连接打开时，输入用户名
    // 当有消息时根据消息类型显示不同信息
    ws.onmessage = onmessage;
    ws.onclose = function() {
      console.log("连接关闭，定时重连");
      connect();
    };
    ws.onerror = function(e) {
      console.log(e);
    };
  }

  function onmessage(e)
  {
    console.log(e.data);
    var data = eval("("+e.data+")");
    switch(data['type']){
      // 服务端ping客户端
      case 'ping':
        ws.send('{"type":"pong"}');
        break;;
      // 登录 更新用户列表
      case 'login':
        //{"type":"login","client_id":xxx,"client_name":"xxx","client_list":"[...]","time":"xxx"}
        say(data['client_id'], data['client_name'],  data['client_name']+' 加入了聊天室', data['time']);
        if(data['client_list'])
        {
          client_list = data['client_list'];
        }
        else
        {
          client_list[data['client_id']] = data['client_name'];
        }
        flush_client_list();
        console.log(data['client_name']+"登录成功");
        break;
      // 发言
      case 'say':
        //{"type":"say","from_client_id":xxx,"to_client_id":"all/client_id","content":"xxx","time":"xxx"}
        say(data['from_client_id'], data['from_client_name'], data['content'], data['time']);
        break;
      // 用户退出 更新用户列表
      case 'logout':
        //{"type":"logout","client_id":xxx,"time":"xxx"}
        say(data['from_client_id'], data['from_client_name'], data['from_client_name']+' 退出了', data['time']);
        delete client_list[data['from_client_id']];
        flush_client_list();

      case 'init':
        console.log(data);
      dispatch({
        type: 'AllGamesInfo/xxx',
        payload:{client_id:data['client_id'],userName:UserInfo.username},
      });
    }
  }

  function getIntoRoom(x) {
    // dispatch({
    //   type: 'AllGamesInfo/xxx',
    //   payload:{username, password},
    //   callback(){
    //     const modal = Modal.error({
    //       title: 'warning--message',
    //       content: '账号密码错误，请重新输入',
    //     });
    //     setTimeout(() => modal.destroy(), 3000);
    //   },
    // });

    connect();

    console.log(x);
    console.log(UserInfo);
  }
  return (
    <div className={styles.container}>
      <ul className={styles.main}>
        {/*这里需要绑定null，暂时不明白为什么*/}
        {roomArray.map(x => <li className={styles.cell} key={x} onClick={getIntoRoom.bind(null,x)}>{x}</li>)}
      </ul>
    </div>

  );
}

export default connect((state) => {
  const {AllGamesInfo} = state.AllGamesInfo;
  const UserInfo = state.UserInfo;
  return {
    loading: state.loading.models.AllGamesInfo,
    AllGamesInfo,
    UserInfo,
  };
})(GameHall);
