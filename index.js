const API =
  "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";

const ActiveQuote = props => {
  return (
    <div>
      <p className="quote">{props.option.quote}</p>
      <p className="author">{props.option.author}</p>
    </div>
  );
};

class App extends React.Component {
  state = {
    allQuotes: [],
    optionQuote: {
      quote: "",
      author: "",
    },
    prevArray: [],
    diasabledButton: false,
    textButton: "Pokaż",
    shouldHide: false,
  };

  componentDidMount() {
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error(response.status);
      })
      .then((response) => response.json())
      .then((data) => {
        const indexFirst = Math.floor(Math.random() * data.length);
        this.setState({
          allQuotes: data,
          optionQuote: data[indexFirst],
          prevArray: [indexFirst],
        });
      });
  }

  handleNextQuote = () => {
    const { allQuotes, prevArray } = this.state;
    const index = Math.floor(Math.random() * allQuotes.length);
    prevArray.push(index);
    this.setState({
      optionQuote: allQuotes[index],
      diasabledButton: true,
    });
  };

  handlePrevQuote = () => {
    const { allQuotes, prevArray } = this.state;
    const indexPrev = prevArray[prevArray.length - 2];
    this.setState({
      optionQuote: allQuotes[indexPrev],
      diasabledButton: false,
    });
  };

  handleChangeText = () => {
    if (this.state.textButton === "Pokaż") {
      this.setState({
        textButton: "Ukryj",
        shouldHide: true,
      });
    } else {
      this.setState({
        textButton: "Pokaż",
        shouldHide: false,
      });
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Cytat na dziś</h1>
        <ActiveQuote option={this.state.optionQuote} />
        <div className="btn">
          <button
            disabled={this.state.diasabledButton ? false : true}
            onClick={this.handlePrevQuote}
          >
            Wróć do poprzedniego
          </button>
          <button onClick={this.handleNextQuote}>Wylosuj następny</button>
          <button
            onClick={this.handleChangeText}
          >{`${this.state.textButton} ulubiony cytat Anety`}</button>
        </div>
        <div className={this.state.shouldHide ? "favoriteQuote" : "hidden"}>
          <p className="quote">
            "You can never cross the ocean until you have the courage to lose
            sight of the shore."
          </p>
          <p className="author">"Christopher Columbus"</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
