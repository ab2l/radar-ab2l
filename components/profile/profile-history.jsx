import Company from './profile-company';

export default class ProfileProducts extends Company {
  placeholder() {
    return 'Insira a história de sua empresa, em formato markdown (.md). Para referência em como escrever um markdown, acesse [este link](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) e utilize qualquer editor de sua preferência, por exemplo o [Markdownpad](http://markdownpad.com/) ou o [ghostwriter](https://wereturtle.github.io/ghostwriter/).';
  }

  fieldName() {
    return 'history';
  }
}
