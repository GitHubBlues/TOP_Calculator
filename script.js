let operand1_ = "";
let operand2_ = "";
let operator_ = "";
let operatorSymbol = "";
let operand1_provisional = "";
let operatorB_ = false; 

function addF(a,b){
    return Number(a) + Number(b);    
}

function subtractF(a,b){
    return Number(a) - Number(b); 
}

function multiplyF(a,b){
    return Number(a) * Number(b);    
}

function divideF(a,b){
    return Number(a)/Number(b);
}

function operate(number1, number2, operation){
    if (operation == "add"){
        return addF(number1, number2);
    }else if (operation == "subtract"){
        return subtractF(number1, number2);
    }else if (operation == "multiply"){
        return multiplyF(number1, number2);
    }else if (operation == "divide"){
        return divideF(number1, number2);
    }else{

    }
}

function processInputDigit(arg){
    if (operand1_provisional.length !==0){
        operand1_provisional = "";
        btnScreenResult.textContent = ""; 
        btnScreenCalc.textContent = "";     
    }
    if (operatorB_ == false){
        if (arg == "."){
            if (/\./.test(operand1_)){
                return; 
            } else{
                operand1_  += arg;
                btnScreenResult.textContent = operand1_ ; 
                btnScreenCalc.textContent = operand1_ ; 
            }
        } else if (arg == "backspace"){ 
            operand1_ = operand1_.slice(0, operand1_.length-1);
            btnScreenResult.textContent = operand1_ ; 
            btnScreenCalc.textContent = operand1_ ;
        } else {
            operand1_  += arg;
            btnScreenResult.textContent = operand1_ ; 
            btnScreenCalc.textContent = operand1_ ;
        }

    } else {
        if (arg == "."){
            if (/\./.test(operand2_)){
                console.log(/./.test(operand2_));
                return; 
            } else{
                operand2_  += arg;
                btnScreenResult.textContent = operand2_ ;
                btnScreenCalc.textContent = operand1_.concat(operatorSymbol, operand2_); 
            }
        } else if (arg == "backspace"){ 
            operand2_ = operand2_.slice(0, operand2_.length-1);
            btnScreenResult.textContent = operand2_ ; 
            btnScreenCalc.textContent = operand1_.concat(operatorSymbol, operand2_); 
        } else {
            operand2_  += arg;
            btnScreenResult.textContent = operand2_ ; 
            btnScreenCalc.textContent = operand1_.concat(operatorSymbol, operand2_); 
        }
    }
}

function processInputOperator(arg){
    if (operand1_provisional.length !==0){
        operand1_ = operand1_provisional;
        operand1_provisional = "";
        btnScreenCalc.textContent = operand1_;   
        btnScreenResult.textContent = operand1_;  
    }          

    if (operand1_.length ==0){
        console.log("first operand missing");    
    } else if (operand2_.length ==0) {
        operatorB_ = true; 
        operator_ = arg;
        switch (arg) {
            case "add":      
                operatorSymbol = " + ";
                break;
            case "subtract": 
                operatorSymbol = " - ";
                break;
            case "multiply": 
                operatorSymbol = " * ";
                break;
            case "divide":    
                operatorSymbol = " / ";  
                break;
        }
        btnScreenCalc.textContent = operand1_.concat(operatorSymbol);
    } else{
        let result = operate(operand1_, operand2_, operator_); 
        btnScreenResult.textContent = result; 
        operand1_ = result.toString();
        operatorB_ = true; 
        operator_ = arg;
        operand2_ = "";
        switch (arg) {
            case "add":      
                operatorSymbol = " + ";
                break;
            case "subtract": 
                operatorSymbol = " - ";
                break;
            case "multiply": 
                operatorSymbol = " * ";
                break;
            case "divide":    
                operatorSymbol = " / ";  
                break;                   
            }
        btnScreenCalc.textContent = operand1_.concat(operatorSymbol);  
        
    }        
}

function processInputEqual(arg){
    if ( operand1_.length>0 && operand1_.length>0 && operatorB_ == true){
        let result = operate(operand1_, operand2_, operator_); 
        btnScreenResult.textContent = result; 
        btnScreenCalc.textContent = operand1_.concat(operatorSymbol + operand2_ + "=" + result); 
        operand1_ = "";
        operand2_ = "";
        operator_ = "";
        operatorSymbol = "";
        operand1_provisional = result.toString();
        operatorB_ = false;  
    } 
}

function processInputClear(){
    operand1_ = "";
    operand2_ = "";
    operator_ = "";
    operand1_provisional = "";
    operatorB_ = false; 
    btnScreenResult.textContent = "" ; 
    btnScreenCalc.textContent = "" ; 
};

const btn0 = document.querySelector("#key0");
btn0.addEventListener("click", (e) => processInputDigit("0"));
const btn1 = document.querySelector("#key1");
btn1.addEventListener("click", (e) => processInputDigit("1"));
const btn2 = document.querySelector("#key2");
btn2.addEventListener("click", (e) => processInputDigit("2"));
const btn3 = document.querySelector("#key3");
btn3.addEventListener("click", (e) => processInputDigit("3"));
const btn4 = document.querySelector("#key4");
btn4.addEventListener("click", (e) => processInputDigit("4"));
const btn5 = document.querySelector("#key5");
btn5.addEventListener("click", (e) => processInputDigit("5"));
const btn6 = document.querySelector("#key6");
btn6.addEventListener("click", (e) => processInputDigit("6"));
const btn7 = document.querySelector("#key7");
btn7.addEventListener("click", (e) => processInputDigit("7"));
const btn8 = document.querySelector("#key8");
btn8.addEventListener("click", (e) => processInputDigit("8"));
const btn9 = document.querySelector("#key9");
btn9.addEventListener("click", (e) => processInputDigit("9"));

const btnOp1 = document.querySelector("#keySum");
btnOp1.addEventListener("click", (e) => processInputOperator("add"));
const btnOp2 = document.querySelector("#keySubtract");
btnOp2.addEventListener("click", (e) => processInputOperator("subtract"));
const btnOp3 = document.querySelector("#keyMultiply");
btnOp3.addEventListener("click", (e) => processInputOperator("multiply"));
const btnOp4 = document.querySelector("#keyDivide");
btnOp4.addEventListener("click", (e) => processInputOperator("divide"));
const btnOp5 = document.querySelector("#keyEqual");
btnOp5.addEventListener("click", (e) => processInputEqual("="));
const btnOp6 = document.querySelector("#keyPoint");
btnOp6.addEventListener("click", (e) => processInputDigit("."));
const btnOp7 = document.querySelector("#keyClear");
btnOp7.addEventListener("click", (e) => processInputClear("clear"));
const btnOp8 = document.querySelector("#keyBackspace");
btnOp8.addEventListener("click", (e) => processInputDigit("backspace"));

const btnScreenResult = document.querySelector(".screen-result");
const btnScreenCalc = document.querySelector(".screen-calculation");

const keyboard = document.addEventListener("keydown", (e) => {
    const keycode = e.key;
    if (keycode >= 0 && keycode < 10) {
        processInputDigit(keycode.toString());    
    } else if (keycode == "."){
        processInputDigit(".");    
    } else if (keycode == "Backspace"){
        processInputDigit("backspace");  
    } else if (keycode == "+"){
        processInputOperator("add");   
    } else if (keycode == "-"){
        processInputOperator("subtract");              
    } else if (keycode == "*"){
        processInputOperator("multiply"); 
    } else if (keycode == "/"){
        processInputOperator("divide") 
    } else if (keycode == "="){
        processInputEqual("=");
    } else if (keycode == "Enter"){
        processInputEqual("="); 
    } else if (keycode == "Delete"){
        processInputClear("clear");
    }      
    console.log(keycode);                            
}); 