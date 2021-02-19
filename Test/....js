let i = [1,2,3]
function yeet(){
    return [...i]
}
let y = yeet()
y.push(5)
console.log(y, i)