"use client";
import { useEffect } from "react";

const SmoothScroll = () => {

  useEffect(() => {
    // Native CSS smooth scrolling (set in globals.css) is used instead of
    // locomotive-scroll, which transformed the page and broke the fixed
    // navbar + fixed aurora background in the new design.
  }, []);

  return null;
};
export default SmoothScroll;
