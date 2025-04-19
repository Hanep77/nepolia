"use client";

import React, { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";

interface EditorProps {
  rows?: number,
  action: Dispatch<SetStateAction<string>>,
  className?: string,
  defaultValue?: string
}

export default function Editor({ rows = 2, action, className, defaultValue }: EditorProps) {
  const handleInput = (e: KeyboardEvent) => {
    const target = e.target as HTMLTextAreaElement
    const text = target.value.split("\n").map((value: string) => `<p>${value}</p>`).join("");
    action(text);
  }

  return (
    <textarea className={`${className} outline-none whitespace-pre-wrap resize-none w-full`}
      name="editor" rows={rows} onKeyUp={handleInput} spellCheck="false" defaultValue={defaultValue} placeholder="type here..." required>
    </textarea>
  )
}
