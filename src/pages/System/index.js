import { Button } from 'antd';
import { history } from 'umi';

const SystemPage = () => {
    const onLogOut = () => {
        localStorage.removeItem('authorization');
        history.push('/login');
    };

    return (
        <>
            <Button onClick={onLogOut}>退出登录</Button>
        </>
    );
};

export default SystemPage;
