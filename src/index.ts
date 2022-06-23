// TODO - check if it can be removed and only importuseState and useEffect, test build!!!
// import { useState, useEffect } from 'react';
import * as React from 'react';

export const useMyHook = () => {
  let [{
    counter
  }, setState] = React.useState<{
    counter: number;
  }>({
    counter: 0
  });

  React.useEffect(() => {
    let interval = window.setInterval(() => {
      counter+= 2;
      setState({counter})
    }, 1000)
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return counter;
};