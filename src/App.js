import React, { Fragment } from "react";
import "./styles.css";
import Media from "react-media";
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";

function TouchView({ tech }) {
  return (
    <div className="page touch">
      <h1>Touch View</h1>
      <p>Have touch feature</p>
      <p>{`{${tech}}`}</p>
    </div>
  )
}

function DefaultView({ tech }) {
  return (
    <div className="page def">
      <h1>Default View</h1>
      <p>Have pointer feature</p>
      <p>{`{${tech}}`}</p>
    </div>
  )
}


function WithMediaQueries() {
  return (
    <Media
      queries={{
        pointer: "(any-pointer: fine)",
        noPointer: "(any-pointer: coarse)",
        none: "(any-pointer: none)"
      }}
    >
      {(matches) => {

        let View = DefaultView;

        if (matches.pointer) {
          View = DefaultView;
        }
        else if (matches.pointer && matches.noPointer) {
          View = DefaultView;
        }
        else if (matches.noPointer) {
          View = TouchView;
        }
        else {
          View = DefaultView;
        }


        return <Fragment>
          <View tech="MediaQuery" />
        </Fragment>
      }}
    </Media>
  )
}


function WithModernizr() {
  let View = DefaultView;
  if (window) {
    const { Modernizr } = window;
    if (Modernizr) {
      if (Modernizr.pointerevents && Modernizr.touchevents) {
        View = DefaultView;
      }
      else if (Modernizr.touchevents) {
        View = TouchView;
      }
    }
  }
  return (
    <View tech="Modernizr" />
  )
}


export default function App() {
  console.log(window.Modernizr);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={["/"]} component={WithMediaQueries} />
          <Route path={"/mod"} component={WithModernizr} />
        </Switch>
      </Router>
    </div>
  );
}
