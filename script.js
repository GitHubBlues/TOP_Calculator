/* global variables*/
let operand1_ = "";
let operand2_ = "";
let operator_ = "";
let operatorSymbol = "";
let operand1_provisional = "";
let operatorB_ = false; 


/* mathematic functions*/
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


/* functions handling inputs*/
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


/* query selectors*/
const btnScreenResult = document.querySelector(".screen-result");
const btnScreenCalc = document.querySelector(".screen-calculation");
const btnDigit = document.querySelectorAll(".btn-digit");
const btnOp1 = document.querySelector("#keySum");
const btnOp2 = document.querySelector("#keySubtract");
const btnOp3 = document.querySelector("#keyMultiply");
const btnOp4 = document.querySelector("#keyDivide");
const btnOp5 = document.querySelector("#keyEqual");
const btnOp6 = document.querySelector("#keyPoint");
const btnOp7 = document.querySelector("#keyClear");
const btnOp8 = document.querySelector("#keyBackspace");


/* add eventListeners for screen click*/
btnDigit.forEach(item => item.addEventListener("click", (e) => processInputDigit(e.target.innerText)));
btnOp1.addEventListener("click", (e) => processInputOperator("add"));
btnOp2.addEventListener("click", (e) => processInputOperator("subtract"));
btnOp3.addEventListener("click", (e) => processInputOperator("multiply"));
btnOp4.addEventListener("click", (e) => processInputOperator("divide"));
btnOp5.addEventListener("click", (e) => processInputEqual("="));
btnOp6.addEventListener("click", (e) => processInputDigit("."));
btnOp7.addEventListener("click", (e) => processInputClear("clear"));
btnOp8.addEventListener("click", (e) => processInputDigit("backspace"));


/* add eventListeners for keyboard touchpad*/
const keyboard = document.addEventListener("keydown", (e) => {
    const keycode = e.key;
    e.preventDefault();  
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