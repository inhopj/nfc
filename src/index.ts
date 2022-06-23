/**
 * TODOs - Add eslint, add husky pre-commit hook
 */
// TODO - check if it can be removed and only import useState and useEffect, test build!!!
// import { useState, useEffect } from 'react';
import * as React from 'react';

export const useCounter = () => {
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