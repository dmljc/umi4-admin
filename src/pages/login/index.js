import { Button, Form, Input, message } from 'antd';
import { connect } from 'umi';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};

const Login = (props) => {
  const [form] = Form.useForm();
  const { dispatch } = props;

  const onFinish = (values) => {
    if (!values) return;
    dispatch({
      type: 'user/login',
      payload: { ...values },
    }).then((resp) => {
      if (resp.success) {
        message.success('登录成功!!!!!');
      }
    });
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish}>
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item {...layout}>
        <Button type="primary" htmlType="submit">
          登陆
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(() => ({}))(Login);
