import { Form, Input, message, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { connect } from 'umi';

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
        dispatch,
        isModalOpen = false,
        record = null,
        modalType = 'add',
        setModalType = () => {},
        setIsModalOpen = () => {},
        onFetchList = () => {},
    } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        if (modalType === 'edit') {
            form.setFieldsValue({ ...record });
        } else {
            form.resetFields();
        }
    }, [modalType]);

    const onOk = () => {
        form.submit();
        onFinish();
    };

    const onCancel = () => {
        setIsModalOpen(false);
        setModalType('add');
        form.resetFields();
    };

    const onFinish = (values) => {
        if (!values) return;

        if (modalType === 'add') {
            dispatch({
                type: 'home/add',
                payload: values,
            }).then((resp) => {
                onCancel();
                onFetchList();
                message.success('添加成功');
            });
        } else {
            const { id } = record;
            dispatch({
                type: 'home/update',
                payload: { id, ...values },
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
        <Modal
            title={titleEnum[modalType]}
            forceRender
            open={isModalOpen}
            onOk={onOk}
            onCancel={onCancel}
        >
            <Form {...layout} form={form} onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="姓名"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true }]}
                >
                    <Select>
                        <Option value="男">男</Option>
                        <Option value="女">女</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="手机"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default connect((home) => ({
    home,
}))(AddModal);
