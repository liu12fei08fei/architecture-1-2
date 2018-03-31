/**
 * @fileOverview 实现Index 数据模型
 * @author liufeifei@qq.com
 * @param  {number} a 神经病呀
 * @param  {number} b 都是神经病呀
 * @return {string}   还是神经病
 */
function fn(a,b){
    return a+b;
}

/** Class representing a point. */
export default class IndexModel{
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(){}
    /**
     * Get the x value.
     * @return {number} The x value.
     */
    getData(){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                resolve("Hello IndexAction");
            }, 1000);
        });
    }
}