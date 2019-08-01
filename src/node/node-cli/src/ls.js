const program = require('commander')
const fs = require('fs')
const chalk = require('chalk')

program.arguments('<dirname>').option('-l, --list').action( function(dirname){
    console.log(dirname)
    const files = fs.readdirSync(dirname)
    if (this.list){
        let str = ''
        files.forEach(f => {
            str += f + '\r\n'
        })
        console.log(chalk.bgGreen.red(str))
    }else {
        console.log(files)   
    }
})

process.argv.push(__dirname)
program.parse(process.argv)
