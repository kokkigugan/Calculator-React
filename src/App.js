import React from 'react'
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "0",
      formula: "",
      evaluated: false };

    this.reset = this.reset.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
  }

  reset() {
    this.setState({
      output: "0",
      formula: "" });

  }

  maxDigitWarning() {
    let temp = this.state.output;
    this.setState({
      output: "Digit Limit Reached" });

    setTimeout(() => this.setState({ output: temp }), 1000);
  }

  handleNumbers(e) {
    
    if (
    this.state.output === 0 &&
    (((e.target.value === 0 &&
    !(/^0/.test(this.state.output)) && this.state.output.includes("."))) ||
    /Limit/.test(this.state.output)))
    {
      return;
    }

    if (this.state.output.length > 10) {
      this.maxDigitWarning();
      return;
    }

    if (this.state.evaluated) {
      this.setState({
        evaluated: false,
        output: e.target.value,
        formula: e.target.value });

      return;
    }

    let output;
    if (/^0/.test(this.state.output) && this.state.output.includes(".")) {
      output = this.state.output + e.target.value;
    } else if (/^[-/*+0]/.test(this.state.output)) {
      output = e.target.value;
    } else {
      output = this.state.output + e.target.value;
    }

    this.setState({
      output: output,
      formula: this.state.formula + e.target.value });

  }

  handleOperators(e) {
    let value = e.target.value.replace("x", "*");
    let formula = this.state.formula;
    let operator = "";

    if ((formula === "" && value !== "-") || formula === "-") {
      return;
    }

    if (this.state.evaluated) {
      this.setState({
        evaluated: false,
        formula: this.state.output + value,
        output: value });

      return;
    }

    if (/\+-$|\*-$|\/-$|--$/.test(formula)) {
      operator = formula.slice(0, -2) + value;
      console.log("Block 1");
    } else if (
    /[-/*+]$/.test(formula) &&
    value !== "-" &&
    !/--$/.test(formula))
    {
      operator = formula.slice(0, -1) + value;
      console.log("Block 2");
    } else if (
    /[-/*+]$/.test(formula) &&
    value === "-" &&
    !/--$/.test(formula))
    {
      operator = formula + value;
      console.log("Block 3");
    } else if (!/[-/*+]$/.test(formula)) {
      operator = formula + value;
      console.log("Block 4");
    }
    
    else {
        operator = "Syntax Error";
        console.log("Syntax Error");
      }

    this.setState({
      output: value,
      formula: operator
      
    });
  }

  handleDecimal(e) {
    if (this.state.output.includes(".")) {
      return;
    }
    this.setState({
      output: this.state.output + e.target.value,
      formula: this.state.formula + e.target.value });

  }

  handleEvaluate() {
    let expression = this.state.formula;
    if (!expression) {
      return;
    }
    if (/[-/*+]$/.test(expression)) {
      expression = expression.slice(0, -1);
    }
    expression = expression.replace("--", "+0+0+0+0+0+0+");
    let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
    this.setState({
      output: answer,
      formula: this.state.formula + "=" + answer,
      evaluated: true });

  }

  render() {
    return (
      React.createElement("div", { className: "calculator" }, 
      React.createElement(Formula, { formula: this.state.formula }), 
      React.createElement(Output, { output: this.state.output }), 
      React.createElement("p", null, this.state.prevVal), 
      React.createElement(Button, {
        reset: this.reset,
        numbers: this.handleNumbers,
        operators: this.handleOperators,
        decimal: this.handleDecimal,
        evaluate: this.handleEvaluate })));



  }}


class Button extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { className: "buttonContainer" }, 
      React.createElement("button", { id: "clear", onClick: this.props.reset, value: "AC" }, "AC"), 


      React.createElement("button", {
        id: "divide",
        className: "operator",
        onClick: this.props.operators,
        value: "/" }, "/"), 



      React.createElement("button", {
        id: "multiply",
        className: "operator",
        onClick: this.props.operators,
        value: "x" }, "x"), 



      React.createElement("button", {
        id: "subtract",
        className: "operator",
        onClick: this.props.operators,
        value: "-" }, "-"),



      React.createElement("button", {
        id: "add",
        className: "operator",
        onClick: this.props.operators,
        value: "+" }, "+"), 



      React.createElement("button", { id: "one", onClick: this.props.numbers, value: "1" }, "1"), /*#_PURE_*/


      React.createElement("button", { id: "two", onClick: this.props.numbers, value: "2" }, "2"), /*#_PURE_*/


      React.createElement("button", { id: "three", onClick: this.props.numbers, value: "3" }, "3"), /*#_PURE_*/


      React.createElement("button", { id: "four", onClick: this.props.numbers, value: "4" }, "4"), /*#_PURE_*/


      React.createElement("button", { id: "five", onClick: this.props.numbers, value: "5" }, "5"), /*#_PURE_*/


      React.createElement("button", { id: "six", onClick: this.props.numbers, value: "6" }, "6"), /*#_PURE_*/


      React.createElement("button", { id: "seven", onClick: this.props.numbers, value: "7" }, "7"), /*#_PURE_*/


      React.createElement("button", { id: "eight", onClick: this.props.numbers, value: "8" }, "8"), /*#_PURE_*/


      React.createElement("button", { id: "nine", onClick: this.props.numbers, value: "9" }, "9"), /*#_PURE_*/


      React.createElement("button", { id: "zero", onClick: this.props.numbers, value: "0" }, "0"), /*#_PURE_*/


      React.createElement("button", { id: "decimal", onClick: this.props.decimal, value: "." }, "."), /*#_PURE_*/


      React.createElement("button", { id: "equals", onClick: this.props.evaluate, value: "=" }, "=")));




  }}


class Output extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      React.createElement("div", { className: "output display", id: "display" },
      this.props.output));


  }}


class Formula extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return React.createElement("div", { className: "formula display" }, this.props.formula);
  }}


  export default App;
