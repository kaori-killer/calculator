const button = document.querySelector(".button");
const input_val = document.querySelector(".input_val");

let infix = []

button.addEventListener("click", (e)=> {
    const target = e.target;
    const name = target.classList[0];
    const value = target.textContent;
    
    if(target.matches('button')){
        input_val.value += value;

        switch(name) {
            case 'reset_button': {
                infix = [];
                input_val.value = "";
                break;
            }
            case 'equal_button': {
                input_val.value = stackCalc(transPostfix(infix));
                break;
            }
            default : {
                infix.push(value);
                break;
            }
        }
    }
});

const transPostfix = (infix) => {
    console.log(infix);
    
    let postfix = [];
    let stack = [];

    infix.map((it) => {
        if(it === '+' || it === '-' || it === '*' || it === '/'){
            while(stack.length > 0 && 
                (stack[stack.length-1] === '*' || stack[stack.length-1] === '/') &&
                (it === '*' || it === '/')
            ){
                postfix.push(stack.pop());
            }   
            stack.push(it);
        }
        else {
            postfix.push(it);
        }});
    while(stack.length > 0){
        postfix.push(stack.pop());
    }
    return postfix;
}

const stackCalc  =  (stack) => {
    console.log(stack)

    let result_stack = [];
    stack.map((it => {
        if(it >= '0' && it <= '9') {
            result_stack.push(it-'0');
        } else {
            const a = result_stack.pop();
            const b = result_stack.pop();

            switch(it) {
                case '+': {
                    result_stack.push(a + b);
                }
                case '-': {
                    result_stack.push(a - b);
                }
                case '*': {
                    result_stack.push(a * b);
                }
                case '/': {
                    result_stack.push(a / b);
                }
            }
        }
    }))
    console.log(result_stack)
    console.log(result_stack[0])
    return result_stack[0];
}