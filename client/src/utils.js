import { useRef, useEffect } from 'react';
import store from "./store";
import { notification } from "antd";
import { increment, decrement } from "automate-redux";

export function incrementPendingRequests() {
    store.dispatch(increment("pendingRequests"));
}

export function decrementPendingRequests() {
    store.dispatch(decrement("pendingRequests"));
}

export const notify = (type, title, msg, duration) => {
    notification[type]({ message: title, description: String(msg), duration: duration });
}

export function useDocumentTitle(title, prevailOnUnmount = false) {
    const defaultTitle = useRef(document.title);
  
    useEffect(() => {
      document.title = title;
    }, [title]);
  
    useEffect(() => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    }, [prevailOnUnmount])
  }