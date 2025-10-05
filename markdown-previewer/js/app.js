
const domContainer = document.getElementById('container');

class Header extends React.Component {
  render() {
    return (
        <header>
          <div className="header-left">
            (<i className="fa fa-fire">)</i>
            <h1>{this.props.name}</h1>
          </div>
          <div className="header-right">
            <a><i className="fa fa-window-maximize style-icon"></i></a>
          </div>
        </header>
    );
  }
}

class Editor extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className='editor'>
        <Header name='Editor' />
        <textarea
          rows="15" cols="115" onChange={this.props.handleChange}
          value={this.props.textArea}
        />
      </div>
  );
  }
}

class RenderText extends React.Component {

  render() {
    let word = this.props.markup;
    let start = word[0];
    let text = word[1].replace(/_/g,'');
    let end = word.slice(2);

    return ( <div>
        <p>
            {start}
            <span style={this.props.inputStyle}>{text}</span>
            {end}
        </p>
      </div>
    );
  }
}

class RenderLink extends React.Component {

  render() {

    let markup = this.props.markup;
    let start = markup[0];
    /* parsing the url from the string */
    let linkLoc = markup[1].slice(markup[1].indexOf('https'), markup[1].indexOf(')'));
    /* parsing remaining text from the given line */
    let end = markup[1].split(')').slice(1);

    return (
            <div>
                <p>
                  {start}
                  <a href={linkLoc} target="_blank">[links]</a>
                  {end}
                 </p>
            </div>
        );
    }
}

class RenderList extends React.Component {

  render() {
    let markup = this.props.markup;
    let indent = markup.split('-')[0];
    let inputStyle = '';

    {
      indent.length <= 1 ?
        inputStyle = {listStyleType: "disc", whiteSpace: "pre"} :
          indent.length >1 && indent.length < 3 ?
              inputStyle={listStyleType: "circle", whiteSpace: "pre"} :
                  inputStyle={listStyleType: "square", whiteSpace: "pre"}
    }

    let text = markup.split('-').join('');
    return (
      <li style={inputStyle}>{text}</li>
    );
  }
}

class RenderImage extends React.Component {

  render() {
    let markup = this.props.markup;
    let linkText = markup.split('[')[1].split(']')[0];
    let linkUrl = markup.split(']')[1].replace('(','').replace(')','');

    return (
      <div>
        <a href={linkUrl} target='_blank'><img src={linkUrl} alt={linkText}/></a>
      </div>
    );
  }
}

class Previewer extends React.Component {

   constructor(props) {
     super(props);
   }

   render() {

     const markup = this.props.input.split('\n');
     const boldRegex = /\*\*/;
     const crossOutRegex = /~~/;
     const linksRegex = /\[links\]/;
     const singleTicksRegex = /(?<!`)`{1}(?!`)/;
     const multiTicksRegex = /^`{3}/gim;
     const h1regex = /^#\s/;
     const h2regex = /^##\s/;
     const h3regex = /^###\s/;
     const newLineregex = /^\s*$/;
     const indentlistRegex = /^\s*-\s/;
     const listRegex = /^-/;
     const numberedlistRegex = /^1/;
     const imgLinkRegex = /^!/;
     let items = [];

     for (let i = 0; i < markup.length; i++) {
         items.push(({
           '# '              :   <h1 style={{borderBottom: "solid black 3px"}}>{markup[i].split('# ')[1]}</h1>,
           '## '             :   <h2 style={{borderBottom: "solid black 3px"}}>{markup[i].split('## ')[1]}</h2>,
           '### '            :   <h3 style={{paddingTop: 20}}>{markup[i].split('## ')[1]}</h3>,
           ''                :   <br />,
           '**'              :   < RenderText markup={markup[i].split('**')} inputStyle={{fontWeight: "bold"}} />,
           '~~'              :   < RenderText markup={markup[i].split('~~')} inputStyle={{textDecoration: "line-through"}} />,
           '[links]'         :   < RenderLink markup={markup[i].split('[links]')} />,
           '-'               :   < RenderList markup={markup[i]} />,
           ' -'              :   < RenderList markup={markup[i]} />,
           ' - '             :   < RenderList markup={markup[i]} />,
           '  - '            :   < RenderList markup={markup[i]} />,
           '   - '           :   < RenderList markup={markup[i]} />,
           '    - '          :   < RenderList markup={markup[i]} />,
           '     - '         :   < RenderList markup={markup[i]} />,
           '      - '        :   < RenderList markup={markup[i]} />,
           '       - '       :   < RenderList markup={markup[i]} />,
           '        - '      :   < RenderList markup={markup[i]} />,
           '!'               :   < RenderImage markup={markup[i]} />,
           "default"         :   <p style={{whiteSpace: "pre"}}>{markup[i]}</p>

         }) [ markup[i].match(h1regex)              ||
              markup[i].match(h2regex)              ||
              markup[i].match(h3regex)              ||
              markup[i].match(newLineregex)         ||
              markup[i].match(boldRegex)            ||
              markup[i].match(crossOutRegex)        ||
              markup[i].match(linksRegex)           ||
              markup[i].match(listRegex)            ||
              markup[i].match(indentlistRegex)      ||
              markup[i].match(imgLinkRegex)         ||
              "default" ]);
       }

      return (
        <div className='previewer'>
           <Header name='Previewer'/>
           {items}
        </div>
       );
   }
 }


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
     inputValue: this.props.textArea
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
      this.setState({
        inputValue: event.target.value
   });
  }

  render() {

    return (
      <div>
        <div>
          <Editor textArea={this.state.inputValue} handleChange={this.handleChange} />
        </div>
        <div>
          <Previewer input={this.state.inputValue}/>
        </div>
      </div>
    );
  }
}

App.defaultProps = {
   textArea: `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`
 }

ReactDOM.render(
  <App />,
  domContainer
);
