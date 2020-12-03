import React, { Fragment } from "react";
import "./styles.css";
import Media from "react-media";
import { Switch, Route } from 'react-router-dom';

function TouchView() {
  return (
    <div className="page touch">
      <h1>Touch View</h1>
      <p>Have touch feature</p>
    </div>
  )
}

function DefaultView() {
  return (
    <div className="page def">
      <h1>Default View</h1>
      <p>Have pointer feature</p>
    </div>
  )
}



export default function App() {
  return (
    <div className="App">
      <Media
        queries={{
          pointer: "(any-pointer: fine)",
          noPointer: "(any-pointer: coarse)",
          none: "(any-pointer: none)"
        }}
      >
        {(matches) => {

          let View = Fragment;

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
            <Switch>
              <Route path="/" component={View} />
            </Switch>
          </Fragment>
        }}
      </Media>
    </div>
  );
}
