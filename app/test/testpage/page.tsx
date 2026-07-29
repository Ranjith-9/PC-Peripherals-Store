"use client";
import { useState, useEffect } from "react";

export default function testPage() {
  useEffect(() => {
    async function callAPI() {
      const res = await fetch("/api/testapi", {
        method: "GET",
      });
    }
    callAPI();
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}
