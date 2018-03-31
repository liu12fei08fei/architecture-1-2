import IndexModel from '../models/IndexModel';
const indexController = {
    indexAction(){
        return async(ctx, next) => {
            const indexModels = new IndexModel();
            const result = await indexModels.getData();
            ctx.body = await ctx.render('index', { data: result});
            // ctx.body = result;
            console.log('<===controllerInit', ctx.status, '===>');
        }
    },
    testAction(){
        return (ctx,next)=>{
            ctx.body = {
                data:"hello test"
            };
        };
    }
};

export default indexController;