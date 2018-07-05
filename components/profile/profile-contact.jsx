import Company from './profile-company';

export default class ProfileContact extends Company {
  placeholder() {
    return 'Insira dados de contato de sua empresa, em formato markdown (.md). Para referência em como escrever um markdown, acesse [este link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) e utilize qualquer editor de sua preferência, por exemplo o [Markdownpad](http://markdownpad.com/) ou o [ghostwriter](https://wereturtle.github.io/ghostwriter/).';
  }

  fieldName() {
    return 'contact';
  }
}
