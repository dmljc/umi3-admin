import react, { useEffect } from 'react';
import { Modal, message, Form, Input, Select, } from 'antd';
import { useDispatch } from 'dva';

const { Option } = Select;

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 18,
    },
};

const AddModal = (props) => {
    const {
        visible = false,
        record = null,
        modalType = 'add',
        setModalType = () => { },
        setVisible = () => { },
        onFetchList = () => { }
    } = props;

    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (modalType === 'edit') {
            console.log('record--->', record)
            form.setFieldsValue({ ...record })
        } else {
            form.resetFields();
        }
    }, [modalType]);

    const onOk = () => {
        form.submit();
        onFinish();
    };

    const onCancel = () => {
        setVisible(false);
        setModalType('add');
        form.resetFields();
    };

    const onFinish = (values) => {
        if (!values) return;

        if (modalType === 'add') {
            dispatch({
                type: 'analysis/add',
                payload: values
            }).then((resp) => {
                onCancel();
                onFetchList();
                message.success('添加成功');
            });
        } else {
            const { id } = record;
            dispatch({
                type: 'analysis/update',
                payload: { id, ...values }
            }).then((resp) => {
                onCancel();
                onFetchList();
                message.success('编辑成功');
            });
        }
    };

    const titleEnum = {
        add: '新增用户',
        edit: '编辑用户',
    };

    return (
        <Modal title={titleEnum[modalType]} visible={visible} onOk={onOk} onCancel={onCancel}>
            <Form {...layout} form={form} onFinish={onFinish}>
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
        </Modal>
    )
};

export default AddModal;