const program = require('commander')

program.version('0.0.1', '-v, --version').usage('hello').option('-a, --all', 'select all').option('-n, --number <v>', 'input number', (v) => {console.log('<v>必选参数' + v)}).option('-s, --search [t]', 'search text', (t) => console.log('可选[t]' + t))

//子命令
program.command('create <project_name>').description('子命令').usage('create -h的说明书').action((name) => {console.log('create ' + name)})

program.parse(process.argv)
