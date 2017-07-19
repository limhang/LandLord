import React from 'react';
import { connect } from 'dva';
import {Form, Icon, Input, Button, Modal} from 'antd';
import styles from './Register.css';
import {Link} from 'dva/router';

function Register(
    {
        loading,
        dispatch,
        form:{
            getFieldDecorator,
            validateFields,
        },
        showerror,
        account,
    }
) {

    function showError() {
        const modal = Modal.success({
            title: 'Message',
            content: '请确保密码2次输入相同',
            okText: 'OK',
        });
        setTimeout(() => modal.destroy(), 2000);
    }

    function loginfn() {
        if (showerror == true) {
            showerror = false;
            console.log(showerror);
            const modal = Modal.success({
                title: 'warning--message',
                content: '账号密码错误，请重新输入',
            });
            setTimeout(() => modal.destroy(), 3000);
        }
    }

    function commit(data) {
        const {username, password,repeat} = data;
        if (repeat === password) {
            dispatch({type: 'UserInfo/register',payload:{username, password,repeat}});
        } else {
            showError();
        }
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
            <span className={styles.logo}>Join UrlStore</span>
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    {
                        getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    type: 'email',
                                    message: 'Please input your email!'
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
                        getFieldDecorator('repeat', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your Password Again!'
                                }
                            ]
                        })(<Input addonBefore={<Icon type="lock"/>} type="password" placeholder="Password" />)
                    }
                </Form.Item>
                <Form.Item>
                    <Button className={styles.signIn}><Link to="/login" >Login</Link></Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className={styles.button}
                        loading={loading}
                        onClick={loginfn}
                    >
                        Create an account
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}


export default connect((state) => {
    const {showerror, account} = state.UserInfo;
    return {
        loading: state.loading.models.UserInfo,
        showerror,
        account,
    };
})(Form.create({})(Register));
