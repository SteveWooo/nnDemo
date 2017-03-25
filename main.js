let fs = require('fs');
// y = a*k + b*j ＋ c;
// 答案：y = 4a + 3b + 3;
// target 计算k和j
class NN {
    countOut(input){
        this.input = input;
        let result = 0;
        for(let i in this.w){
            result += this.input[i] * this.w[i];
        }
        //激活函数为 y = x;
        return result;
    }
    study(inputs,ans){
        let result = this.countOut(inputs);
        let E = Math.pow((ans-result),2)/2;
        let w_1Change = inputs.a * (result - ans);
        let w_2Change = inputs.b * (result - ans);
        let w_3Change = inputs.c * (result - ans);
        let speed = 0.5;
        this.w.a -= speed * w_1Change;
        this.w.b -= speed * w_2Change;
        this.w.c -= speed * w_3Change;
        writeNN(this);
    }
    check(inputs){
        let result = 0;
        for(let i in this.w){
            console.log(this.w[i]);
            result += inputs[i] * this.w[i];
        }
        //激活函数为 y = x;
        console.log(result);
        return result;
    }
    constructor(w,count,valve){
        this.count = count;
        this.input = [];
        this.valve = valve;
        this.w = w;
    }
}
let writeNN = (data)=>{
    fs.writeFileSync('./node', JSON.stringify(data));
}
let createNode = ()=>{
    let w = {a:Math.random()*2-1,b:Math.random()*2-1,c:Math.random()*2-1};
    let nn = new NN(w,2,2);
    writeNN(nn);
}
let getNode = ()=>{
    let node = {};
    node = fs.readFileSync('./node', 'utf-8');
    if(node == ''){
        createNode();
        console.log('create success');
        return false;
    }
    return JSON.parse(node);
}
var main = ()=>{
    let node = getNode();
    if(!node)return false;
    let n = new NN(node.w,node.count,node.valve);
    let c = 1;
    for(let a=-1;a<=1;a+=0.1){
        for(let b = -1;b<=1;b+=0.1){
            n.study({a:a,b:b,c:c},4*a+3*b+3*c);
        }
    }
    n.check({a:2,b:1,c:1});//学习完检查的	
}
main();