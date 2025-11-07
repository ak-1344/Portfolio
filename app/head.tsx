import React from "react";

export default function Head() {
  return (
    <>
      {/* Basic favicon (browsers fallback) */}
      <link rel="icon" href="/favicon.ico" />

      {/* PNG favicons for better control */}
      <link rel="icon" type="image/png" sizes="32x32" href="/resume.png" />

      <meta name="theme-color" content="#ffffff" />
    </>
  );
}
