let Generator = require('yeoman-generator');
let yosay = require('yosay');
let mkdirp = require('mkdirp');

module.exports = class extends Generator
{
    constructor(args, opts) {
        super(args, opts);

        this.option('className');
    }

    async prompting() {
        this.log(yosay("Let's create some AdminController!"));

        this.answers = await this.prompt([
            {
                type: "input",
                name: "className",
                message: "ObjectModel class name",
                store: true
            }
        ]);

        this.answers.author = this.config.get('author');
        this.answers.year = new Date().getFullYear();
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('AdminController.php'),
            this.destinationPath(this.config.get('root') + '/controllers/admin/Admin' + this.answers.className + '.php'),
            this.answers
        );
    }
}