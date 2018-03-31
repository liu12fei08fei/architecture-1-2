import indexController from './indexController';

const controllerInit = {
    getAllrouters(app,router){
        app.use(router(_ => {
            _.get('/index', indexController.indexAction());
            _.get('/index/test', indexController.testAction());
        }))
    }
};

export default controllerInit;