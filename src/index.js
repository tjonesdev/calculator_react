import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

const calcKeys = [
  {
    id: "clear",
    html: "C",
    val: "",
    key: [27, 46],
    shift: false,
    position: "body",
    type: "clear"
  },
  {
    id: "plus-minus",
    html: String.fromCharCode(177),
    val: "",
    key: [120],
    shift: false,
    position: "body",
    type: "plus-minus"
  },
  {
    id: "percent",
    html: String.fromCharCode(37),
    val: "",
    key: [53],
    shift: 53,
    position: "body",
    type: "percent"
  },
  {
    id: "divide",
    html: String.fromCharCode(247),
    val: String.fromCharCode(247),
    key: [191, 111],
    shift: false,
    position: "panel",
    type: "core"
  },
  {
    id: "seven",
    html: 7,
    val: 7,
    key: [55, 103],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "eight",
    html: 8,
    val: 8,
    key: [56, 104],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "nine",
    html: 9,
    val: 9,
    key: [57, 105],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "multiply",
    html: String.fromCharCode(215),
    val: String.fromCharCode(215),
    key: [56, 106],
    shift: 56,
    position: "panel",
    type: "core"
  },
  {
    id: "four",
    html: 4,
    val: 4,
    key: [52, 100],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "five",
    html: 5,
    val: 5,
    key: [53, 101],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "six",
    html: 6,
    val: 6,
    key: [54, 102],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "subtract",
    html: String.fromCharCode(8722),
    val: String.fromCharCode(8722),
    key: [189, 109],
    shift: false,
    position: "panel",
    type: "core"
  },
  {
    id: "one",
    html: 1,
    val: 1,
    key: [49, 97],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "two",
    html: 2,
    val: 2,
    key: [50, 98],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "three",
    html: 3,
    val: 3,
    key: [51, 99],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "add",
    html: String.fromCharCode(43),
    val: String.fromCharCode(43),
    key: [187, 107],
    shift: 187,
    position: "panel",
    type: "core"
  },
  {
    id: "zero",
    html: 0,
    val: 0,
    key: [48, 96],
    shift: false,
    position: "body",
    type: "num"
  },
  {
    id: "decimal",
    html: String.fromCharCode(46),
    val: String.fromCharCode(46),
    key: [190, 110],
    shift: false,
    position: "body",
    type: "decimal"
  },
  {
    id: "bksp",
    html: <i className="fas fa-backspace"></i>,
    val: "",
    key: [8],
    shift: false,
    position: "body",
    type: "bksp"
  },
  {
    id: "equals",
    html: String.fromCharCode(61),
    val: "=",
    key: [187, 13],
    shift: false,
    position: "equals",
    type: "equals"
  }
];

const operators = [
  {
    id: "add",
    "+": (a, b) => a + b
  },
  {
    id: "subtract",
    "−": (a, b) => a - b
  },
  {
    id: "multiply",
    "×": (a, b) => a * b
  },
  {
    id: "divide",
    "÷": (a, b) => a / b
  }
];

const DarkMode = (props) => {
  return (
    <button
      id="dark-mode"
      className="dark-mode"
      onMouseDown={props.handleToggle}
    >
      <i
        className={`fas ${!props.dark ? "light-moon fa-moon" : "dark-sun fa-sun"}`}
      ></i>
    </button>
  );
};

const Display = (props) => {
  return (
    <div className="display-all">
      {props.resetAnimation ? (
        <span></span>
      ) : (
        <span
          className={`animate ${
            !props.dark ? "light-animate" : "dark-animate"
          }`}
          style={{ animation: "wipe .5s", animationPlayState: props.playState }}
        ></span>
      )}
      <div
        className={`output-nums ${
          !props.dark ? "light-output-nums" : "dark-output-nums"
        }`}
      >
        {props.output.join(" ")}
      </div>
      <div className="display">{props.display}</div>
    </div>
  );
};

const ButtonPad = (props) => {
  let handleClick;
  switch (props.type) {
    case "num":
    case "decimal":
    case "plus-minus":
      handleClick = props.handleNums;
      break;
    case "core":
      handleClick = props.handleCoreOperators;
      break;
    case "percent":
      handleClick = props.handlePercent;
      break;
    case "equals":
      handleClick = props.handleEquals;
      break;
    case "bksp":
      handleClick = props.handleBksp;
      break;
    case "clear":
      handleClick = props.onClear;
      break;
    default:
      handleClick = "";
  }

  return (
    <button
      id={props.id}
      className={`btn ${
        !props.dark
          ? "light-btn light-" + props.position + " light-" + props.type
          : "dark-btn dark-" + props.position + " dark-" + props.type
      } ${props.type} ${props.id === props.active ? "active" : ""}`}
      onMouseDown={handleClick}
      value={props.val}
    >
      {props.id === "clear" ? (
        <span
          className={`clear-circle ${
            !props.dark ? "light-clear-circle" : "dark-clear-circle"
          }`}
        >
          {props.html}
        </span>
      ) : (
        props.html
      )}
    </button>
  );
};

let outputDec;

class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 0,
      output: [],
      prev: [],
      current: [],
      total: 0,
      decimals: 0,
      dark: false,
      active: false,
      playState: "paused",
      resetAnimation: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNums = this.handleNums.bind(this);
    this.handleCoreOperators = this.handleCoreOperators.bind(this);
    this.handlePercent = this.handlePercent.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleBksp = this.handleBksp.bind(this);
    this.onClear = this.onClear.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    this.setState({
      playState: "paused"
    });
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  resetAnimation(e) {
    this.setState(
      {
        resetAnimation: true
      },
      () => {
        requestAnimationFrame(() => {
          this.setState({ resetAnimation: false });
        });
      }
    );
  }

  handleResize(e) {
    if (document.body.scrollWidth > document.body.clientWidth) {
      window.scrollTo(document.body.scrollWidth, 0);
    }
  }

  handleKeyDown(e) {
    if (this.state.playState === "running") {
      this.resetAnimation();
      this.setState({
        playState: "paused"
      });
    }
    if (e.keyCode === 32) {
      document
        .getElementById("dark-mode")
        .dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true, cancelable: true })
        );
      this.setState({ active: "dark-mode" });
    }
    calcKeys.map((o) => {
      o.key.map((k) => {
        if (e.keyCode === k) {
          if (
            e.shiftKey &&
            e.keyCode === o.shift &&
            (e.keyCode === 187 || e.keyCode === 56 || e.keyCode === 53)
          ) {
            document
              .getElementById(o.id)
              .dispatchEvent(
                new MouseEvent("mousedown", { bubbles: true, cancelable: true })
              );
            this.setState({ active: o.id });
          } else if (
            !e.shiftKey &&
            !o.shift &&
            (e.keyCode === 187 || e.keyCode === 56 || e.keyCode === 53)
          ) {
            document
              .getElementById(o.id)
              .dispatchEvent(
                new MouseEvent("mousedown", { bubbles: true, cancelable: true })
              );
            this.setState({ active: o.id });
          } else if (
            e.keyCode !== 187 &&
            e.keyCode !== 56 &&
            e.keyCode !== 53
          ) {
            document
              .getElementById(o.id)
              .dispatchEvent(
                new MouseEvent("mousedown", { bubbles: true, cancelable: true })
              );
            this.setState({ active: o.id });
          }
        }
      });
    });
  }

  handleKeyUp(e) {
    e.preventDefault();
    this.setState({
      active: false
    });
  }

  handleNums(e) {
    e.preventDefault();
    if (this.state.playState === "running") {
      this.resetAnimation();
      this.setState({
        playState: "paused"
      });
    }
    const eId = e.target.id;
    const eValue = e.target.value;
    this.setState(
      {
        prev: [
          this.state.prev[1],
          eId === "decimal"
            ? "decimal"
            : eId === "plus-minus"
            ? "plus-minus"
            : "num"
        ]
      },
      () => {
        if (this.state.prev[0] === "equals") {
          this.setState({
            display:
              eId === "decimal"
                ? 0 + eValue
                : Number(eValue),
            output: [],
            current: [],
            total: 0
          });
          // DECIMAL
        } else if (eId === "decimal") {
          if (
            this.state.prev[0] === "operator" ||
            this.state.prev[0] === "percent"
          ) {
            this.setState({
              display: 0 + eValue
            });
          } else {
            this.setState({
              display:
                this.state.display % 1 !== 0 || this.state.prev[0] === "decimal"
                  ? this.state.display
                  : this.state.display + eValue
            });
          }
          // PLUS-MINUS
        } else if (eId === "plus-minus") {
          if (this.state.prev[0] !== "operator") {
            this.setState({
              display:
                this.state.display === 0
                  ? this.state.display
                  : this.state.display * -1
            });
          } else {
            this.setState({
              display: 0
            });
          }
          // NUMBER
        } else {
          if (this.state.prev[0] === "plus-minus") {
            this.setState({
              display:
                this.state.display === 0
                  ? eValue
                  : this.state.display + eValue
            });
          } else {
            this.setState({
              display:
                this.state.display === 0 ||
                this.state.prev[0] === "operator" ||
                this.state.prev[0] === "percent"
                  ? eValue
                  : (this.state.display % 1 !== 0 ||
                      this.state.prev[0] === "decimal") &&
                    this.state.display.toString().length >= 17
                  ? this.state.display
                  : this.state.display % 1 === 0 &&
                    this.state.display.toString().length >= 16
                  ? this.state.display
                  : this.state.display + eValue
            });
          }
        }
      }
    );
  }

  handleCoreOperators(e) {
    e.preventDefault();
    if (this.state.playState === "running") {
      this.resetAnimation();
      this.setState({
        playState: "paused"
      });
    }
    const eValue = e.target.value;
    this.setState(
      {
        prev: [this.state.prev[1], "operator"],
        output: [
          ...this.state.output,
          Number(this.state.display),
          eValue
        ],
        current: [
          ...this.state.current,
          Number(this.state.display),
          eValue
        ],
        display: Number(this.state.display)
      },
      () => {
        outputDec = this.state.output[this.state.output.length - 2];
        this.setState({
          decimals:
            this.state.decimals +
            (outputDec % 1 !== 0
              ? Number(outputDec.toString().split(".")[1].length)
              : 0)
        });
        if (this.state.prev[0] === "operator") {
          this.setState(
            {
              output: this.state.output.slice(0, -3).concat(eValue),
              current: this.state.current
                .slice(0, -3)
                .concat(eValue)
            },
            () => {
              this.setState({
                total: this.state.current[0]
              });
            }
          );
        } else if (
          this.state.prev[0] === "equals" &&
          this.state.output.length >= 4
        ) {
          this.setState({
            display: this.state.total,
            output: [this.state.total, eValue],
            current: [this.state.total, eValue]
          });
        } else if (this.state.current.length === 4) {
          operators.map((o) => {
            if (o.hasOwnProperty(this.state.current[1])) {
              let current = o[this.state.current[1]](
                Number(this.state.current[0]),
                Number(this.state.current[2])
              );
              this.setState(
                {
                  current: [current, eValue]
                },
                () => {
                  this.setState({
                    display: this.state.current[0],
                    total: this.state.current[0]
                  });
                }
              );
            }
          });
        }
      }
    );
  }

  handlePercent(e) {
    e.preventDefault();
    if (this.state.playState === "running") {
      this.resetAnimation();
      this.setState({
        playState: "paused"
      });
    }
    this.setState(
      {
        prev: [this.state.prev[1], "percent"]
      },
      () => {
        if (this.state.prev[0] !== "operator") {
          this.setState({
            display:
              (this.state.display / 100).toString().length <= 16
                ? Number.parseFloat(this.state.display / 100)
                : Number.parseFloat(this.state.display / 100).toExponential(2)
          });
        }
      }
    );
  }

  handleEquals(e) {
    e.preventDefault();
    if (this.state.playState === "running") {
      this.resetAnimation();
      this.setState({
        playState: "paused"
      });
    }
    const eValue = e.target.value;
    this.setState(
      {
        prev: [this.state.prev[1], "equals"],
        current: [...this.state.current, this.state.display]
      },
      () => {
        if (this.state.output.length === 0) {
        } else if (this.state.prev[0] === "operator") {
          this.setState(
            {
              current: [this.state.current[0]],
              output: this.state.output.slice(0, -1).concat(eValue),
              total: this.state.current[0]
            },
            () => {
              if (this.state.output.length < 4) {
              }
            }
          );
        } else {
          operators.map((o) => {
            if (o.hasOwnProperty(this.state.current[1])) {
              let current = o[this.state.current[1]](
                Number(this.state.current[0]),
                Number(this.state.current[2])
              );
              this.setState(
                {
                  output: [
                    ...this.state.output,
                    this.state.display,
                    eValue
                  ],
                  current: [current, eValue]
                },
                () => {
                  outputDec = this.state.output[this.state.output.length - 2];
                  this.setState(
                    {
                      decimals:
                        this.state.decimals +
                        (outputDec % 1 !== 0
                          ? Number(outputDec.toString().split(".")[1].length)
                          : 0)
                    },
                    () => {
                      if (
                        this.state.current[0] % 1 !== 0 &&
                        this.state.decimals <
                          this.state.current[0].toString().split(".")[1].length
                      ) {
                        this.setState({
                          display: Number.parseFloat(
                            this.state.current[0].toFixed(this.state.decimals)
                          ),
                          total: Number.parseFloat(
                            this.state.current[0].toFixed(this.state.decimals)
                          )
                        });
                      } else {
                        this.setState({
                          display: this.state.current[0],
                          total: this.state.current[0]
                        });
                      }
                    }
                  );
                }
              );
            }
          });
        }
      }
    );
  }

  handleBksp(e) {
    e.preventDefault();
    if (this.state.playState === "running") {
      this.resetAnimation();
      this.setState({
        playState: "paused"
      });
    }
    if (this.state.prev[1] !== "operator") {
      console.log(this.state.prev[0]);
      this.setState(
        {
          display:
            Math.sign(this.state.display) === -1
              ? 0
              : this.state.display.toString().slice(0, -1)
        },
        () => {
          if (this.state.display.length === 0) {
            this.setState({
              display: 0
            });
          }
        }
      );
    }
  }

  onClear(e) {
    e.preventDefault();
    this.resetAnimation();
    this.setState({
      playState: "running"
    });
    setTimeout(() => {
      this.setState({
        display: "",
        output: [],
        prev: [],
        current: [],
        total: 0
      });
    }, 300);
    setTimeout(() => {
      this.setState({ display: 0 });
    }, 500);
  }

  handleToggle(e) {
    e.preventDefault();
    if (this.state.playState === "running") {
      this.resetAnimation();
      this.setState({
        playState: "paused"
      });
    }
    this.setState({ dark: !this.state.dark });
  }

  render() {
    const splitEvery = (array, length) =>
      array.reduce((result, item, index) => {
        if (index % length === 0) result.push([]);
        result[Math.floor(index / length)].push(item);
        return result;
      }, []);

    const buttons = splitEvery(calcKeys, 4).map((split) => {
      return (
        <div className="btn-row">
          {split.map((i) => {
            return (
              <ButtonPad
                id={i.id}
                html={i.html}
                position={i.position}
                dark={this.state.dark}
                type={i.type}
                active={this.state.active}
                handleNums={this.handleNums}
                handleCoreOperators={this.handleCoreOperators}
                handlePercent={this.handlePercent}
                handleEquals={this.handleEquals}
                handleBksp={this.handleBksp}
                val={i.val}
                onClear={this.onClear}
                key={i.key}
              />
            );
          })}
        </div>
      );
    });
    return (
      <div
        className={`container ${
          !this.state.dark ? "light-container" : "dark-container"
        }`}
      >
        <div
          className={`calculator ${
            !this.state.dark ? "light-calculator" : "dark-calculator"
          }`}
        >
          <DarkMode handleToggle={this.handleToggle} dark={this.state.dark} />
          <Display
            display={this.state.display}
            output={this.state.output}
            playState={this.state.playState}
            resetAnimation={this.state.resetAnimation}
            dark={this.state.dark}
          />
          <div
            className={`calc-body ${
              !this.state.dark ? "light-calc-body" : "dark-calc-body"
            }`}
          >
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculator />, document.getElementById("root"));
