import React from 'react';
import { Button, Form, Input, Select, message } from 'antd';
import { useDispatch } from 'dva';
// import ss from './index.less';

const { Option } = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};

const LoginPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        console.log('values', values);

        dispatch({
            type: 'analysis/add',
            payload: values
        }).then((resp) => {
            console.log('---add---resp---', resp)
            message.success('添加成功');
        });
    };

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                <Select>
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                    <Option value="其他">其他</Option>
                </Select>
            </Form.Item>
            <Form.Item name="phone" label="手机" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
        </Form>
    );
};
export default LoginPage;
