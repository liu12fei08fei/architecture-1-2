const errorHandler = {
    error(app,logger){
        // 500管理，如果涉及到百度搜索的时候，最好设置成为404之类的状态，防止网站因为失误导致不必要的麻烦
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                //error logs pm2 logs我使用的log4js更加的专业
                logger.error(error);
                ctx.status = error.status || 500;
                ctx.body = 500;
                console.log('<===500', ctx.status, '===>');
            }
        });
        app.use(async(ctx,next)=>{
            await next();
            if(404 != ctx.status) return;
            ctx.status = 404;
            console.log('<===404', ctx.status, '===>');
            //状态写到日志里去
            logger.error('页面丢了');
            ctx.body =  '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="http://yoursite.com/yourPage.html" homePageName="回到我的主页"></script>';
        });
    }
};
export default errorHandler;