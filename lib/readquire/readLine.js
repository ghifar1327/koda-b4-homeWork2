const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 async function question(input) {
    return new Promise((resolve)=>{
        rl.question(input, (answer)=>{
            resolve(answer)
        })
    })  
 }
async function exit() {
    rl.close()
}
module.exports = {
    question,
    exit
}