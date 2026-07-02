import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary">
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob aurora-blob--violet" />
        <div className="aurora-blob aurora-blob--cyan" />
      </div>
      <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-accent-violet border-r-accent-cyan animate-spin" />
      <p className="mt-6 text-secondary text-sm tracking-[0.3em] uppercase">
        Loading
      </p>
    </div>
  );
};

export default Loading;
