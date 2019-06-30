let Generator = require('yeoman-generator');
let yosay = require('yosay');
let mkdirp = require('mkdirp');

module.exports = class extends Generator
{
    constructor(args, opts) {
        super(args, opts);

        this.option('className');
        this.option('author');
    }

    async prompting() {
        this.log(yosay("Let's create some ObjectModel!"));

        this.answers = await this.prompt([
            {
                type: "input",
                name: "className",
                message: "ObjectModel class name",
                store: true
            },
            {
                type: "input",
                name: "author",
                message: "Module author",
                store: true
            }
        ]);

        this.answers.year = new Date().getFullYear();
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('ObjectModel.php'),
            this.destinationPath(this.config.get('root') + '/classes/' + this.answers.className + '.php'),
            this.answers
        );
    }
}