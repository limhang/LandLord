import React from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';
import {Form, Icon, Input, Button, Checkbox, Modal} from 'antd';
import styles from './Login.css';

function Login({
  loading,
  dispatch,
  form:{
    getFieldDecorator,
    validateFields
  },
  account,
})  {

  function commit(data) {
    const {username, password} = data;
    dispatch({
      type: 'UserInfo/auth',
      payload:{username, password},
      callback(){
        const modal = Modal.error({
          title: 'warning--message',
          content: '账号密码错误，请重新输入',
        });
        setTimeout(() => modal.destroy(), 3000);
      },
    });
    // dispatch({type: 'users/fetch',payload:{}});
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((error,values) => {
      if (!error) {
        commit(values);
      }
    });
  }


  return (
    <div className={styles.container}>
      <span className={styles.logo}>Welcome To LANDLORD</span>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          {
            getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username!'
                }
              ]
            })(<Input addonBefore={<Icon type="user"/>} placeholder="Username" />)
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your Password!'
                }
              ]
            })(<Input addonBefore={<Icon type="lock"/>} type="password" placeholder="Password" />)
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox disabled>Remember me</Checkbox>)
          }
          <span className={styles.toOther }>Or <Link to="/register">register now!</Link></span>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.button}
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>

  );
}

export default connect((state, ownProps) => {
  const {account} = state.UserInfo;
  return {
    loading: state.loading.models.UserInfo,
    account,
  };
})(Form.create({})(Login));
