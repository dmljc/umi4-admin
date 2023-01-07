import { useEffect } from 'react';
import { connect } from 'umi';
import ss from './index.less';

const AnalysisPage = () => {
    useEffect(() => {
        handleScreenAuto();
        window.onresize = () => handleScreenAuto();
        return () => (window.onresize = null);
    }, []);

    // 数据大屏自适应函数
    const handleScreenAuto = () => {
        const designDraftWidth = 1920; //设计稿的宽度
        const designDraftHeight = 960; //设计稿的高度

        // 根据屏幕的变化适配的比例
        // clientWidth = content + padding
        // offsetWidth = content + padding + border
        // scrollWidth = content + 不可见部分的 width

        const ele = document.documentElement;
        const clientWidth = ele.clientWidth;
        const clientHeight = ele.clientHeight;

        const clientScale = clientWidth / clientHeight;
        const designScale = designDraftWidth / designDraftHeight;

        const scale =
            clientScale < designScale
                ? clientWidth / designDraftWidth
                : clientHeight / designDraftHeight;

        // 缩放比例
        document.querySelector(
            '#screen',
        ).style.transform = `scale(${scale}) translate(-50%)`;
    };

    return (
        <div className={ss.root}>
            <div className={ss.screen} id="screen">
                <div className={ss.wrap}>
                    <header>头部</header>
                    <main>
                        <div className={ss.left}></div>
                        <div className={ss.center}></div>
                        <div className={ss.right}></div>
                    </main>
                    <footer>底部</footer>
                </div>
            </div>
        </div>
    );
};

export default connect((analysis) => ({
    analysis,
}))(AnalysisPage);
