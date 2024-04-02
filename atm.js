#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let userId = "";
const userPin = 4956;
let current_balance = 100000;
// ------------------------ Input User ------------------------
const userName_ans = await inquirer.prompt({
    name: "usr_name",
    type: "input",
    message: chalk.green("\nWhat's your Good Name !"),
});
if (userName_ans.usr_name !== undefined &&
    userName_ans.usr_name !== null &&
    userName_ans.usr_name !== "") {
    userId = userName_ans.usr_name;
}
// ------------------------ ATM Main function ------------------------
async function atm_func() {
    console.log(chalk.magenta.bold("\n\t🏦  Welcome to ATM ! 😃\n"));
    const pin_ans = await inquirer.prompt({
        name: "pin",
        type: "number",
        message: chalk.cyan("Enter your 4-Digit pin code."),
    });
    if (pin_ans.pin === userPin) {
        console.log(chalk.green.bold(`\n\t👋 Hello ${userId}, welcome to the ATM.🏦\n`));
        // console.log(
        //   chalk.hex("#FFA500")(`💲 Your Current Balance is: ${current_balance}\n`)
        // );
        let anotherTransaction = true;
        while (anotherTransaction) {
            const choice = await inquirer.prompt([
                {
                    type: "list",
                    name: "options",
                    message: chalk.red.bold("Please select an option:"),
                    choices: [
                        "Deposit Amount",
                        "Cash Withdraw",
                        "Balance Check",
                        "Fast Cash",
                    ],
                },
            ]);
            // ------------------------ Deposit Amount ------------------------
            if (choice.options === "Deposit Amount") {
                const Deposit_ans = await inquirer.prompt({
                    name: "deposit_amount",
                    type: "number",
                    message: chalk.red("Enter your Amount to Deposit: "),
                });


                if (Deposit_ans.deposit_amount > 0) {
                    current_balance += Deposit_ans.deposit_amount;
                    console.log(chalk.hex("#FFA500")(`\n💲 Your Current Balance is: $${current_balance}\n`));
                }
                else {
                    console.log(chalk.red.bold(`\n\t⚠️ You Entered Invalid Amount.`));
                }
            }
            // ------------------------ Cash-Withdraw ------------------------
            else if (choice.options === "Cash Withdraw") {
                const Withdraw_ans = await inquirer.prompt([
                    {
                        type: "number",
                        name: "amount",
                        message: "Enter the amount to withdraw:",
                    },
                ]);
                if (Withdraw_ans.amount < current_balance && Withdraw_ans.amount > 0) {
                    console.log(`\nWithdrawn $${Withdraw_ans.amount} from your account.`);
                    console.log(chalk.hex("#FFA500")(`\n💲 Your Current Balance is: $${current_balance - Withdraw_ans.amount}\n`));
                }
                else {
                    console.log(chalk.red.bold(`\n\t⚠️ Insufficient balance or Invalid Amount.`));
                }
            }
            // ------------------------ Balance check ------------------------
            else if (choice.options === "Balance Check") {
                console.log(chalk.hex("#FFA500")(`\n💲 Your Current Balance is: $${current_balance}\n`));
            }
            // ------------------------ Fast cash ------------------------
            else if (choice.options === "Fast Cash") {
                const fast_cash = await inquirer.prompt([
                    {
                        type: "list",
                        name: "options",
                        message: chalk.red.bold("Please select an option:"),
                        choices: [
                            "- Withdraw: $500",
                            "- Withdraw: $1000",
                            "- Withdraw: $5000",
                            "- Withdraw: $10000",
                        ],
                    },
                ]);
                if (current_balance >= 500) {
                    if (fast_cash.options === "- Withdraw: $500") {
                        console.log(`\nWithdrawn $500 from your account.`);
                        console.log(chalk.hex("#FFA500")(`\n💲 Your Current Balance is: $${current_balance - 500}\n`));
                    }
                    else if (fast_cash.options === "- Withdraw: $1000") {
                        console.log(`\nWithdrawn $1000 from your account.`);
                        console.log(chalk.hex("#FFA500")(`\n💲 Your Current Balance is: $${current_balance - 1000}\n`));
                    }
                    else if (fast_cash.options === "- Withdraw: $5000") {
                        console.log(`\nWithdrawn $5000 from your account.`);
                        console.log(chalk.hex("#FFA500")(`\n💲 Your Current Balance is: $${current_balance - 5000}\n`));
                    }
                    else if (fast_cash.options === "- Withdraw: $10000") {
                        console.log(`\nWithdrawn $10000 from your account.`);
                        console.log(chalk.hex("#FFA500")(`\n💲 Your Current Balance is: $${current_balance - 10000}\n`));
                    }
                }
                else {
                    console.log(chalk.red.bold(`\n\t⚠️ Insufficient balance or Invalid Amount.`));
                }
            }
            const confirmation_ans = await inquirer.prompt({
                type: "confirm",
                name: "user_confirmation",
                message: chalk.red.bold("Do you want to do another transaction.? "),
            });
            if (confirmation_ans.user_confirmation === false) {
                anotherTransaction = false;
            }
        }
        console.log(chalk.magentaBright.bold("\n\t🏦 Thank you for using the ATM. Have a great day! 😃"));
        process.exit(); // Code for program end
    }
}
atm_func();
