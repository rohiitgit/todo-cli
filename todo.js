const { Command } = require('commander');
const program = new Command();
const fs = require('fs');


program
    .name('todo-cli')
    .description('CLI to add, remove, edit todos and mark a todo as done.')
    .version('0.0.1');

program.command('add')
    .description('adds a todo')
    .argument('<string>', 'todo to add')
    .action((str) => {
        const jsonString = JSON.stringify(str)
        fs.appendFile('todos.json', jsonString, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('todo was added')
            }
        })
    });


program.command('del')
    .description('deletes a todo')
    .argument('<string>', 'todo to add')
    .action((str) => {
        fs.readFile('todos.json', "utf-8", (err, data) => {
            if (err) {
                console.log(err)
                return
            } else {
                const updatedData = data.replace(new RegExp(str, 'g'), '').trim();
                fs.writeFile('todos.json', updatedData, 'utf-8', (err) => {
                    if (err) {
                        console.log(err)
                        return;
                    } else {
                        console.log('Deleted todo')
                    }
                });
            }
        })
    });

program.command('mark')
    .description('marks todo as done')
    .argument('<string>', 'marks todo as done')
    .action((str) => {
        fs.readFile('todos.json', "utf-8", (err, data) => {
            if (err) {
                console.log(err)
                return
            } else {
                const updatedData = data.replace(new RegExp(str, 'g'), str+':done').trim();
                fs.writeFile('todos.json', updatedData, 'utf-8', (err) => {
                    if (err) {
                        console.log(err)
                        return;
                    } else {
                        console.log('Marked todo as done')
                    }
                });
            }
        })
    });

program.parse();