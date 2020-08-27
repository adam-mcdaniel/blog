---
title: Writing a Compiler with Honeycomb
date: "2020-01-09T01:35:32.169Z"
template: "post"
draft: false
slug: "writing-a-compiler-with-honeycomb"
category: "Compilers"
tags:
  - "Parsing"
  - "Compilers"
description: "After reading about parser combinator libraries, I started to write my own! I eventually got it into a working state, and published it on crates.io under the name `honeycomb`."
socialImage: "/blog/media/honeycomb.jpg"
---

After reading about parser combinator libraries, I started to write my own! I eventually got it into a working state, and published it on crates.io under the name `honeycomb`.

You can find it [here](https://github.com/adam-mcdaniel/honeycomb).

My absolute FAVORITE thing about honeycomb is that it doesn't depend on anything, not even the standard library! Im super proud of that fact :)

To test honeycomb's capabilities, I started work on a simple compiler for an object oriented and functional programming language. Within a three or so hours of work, the compiler was fully implemented! This was a huge surprise to me because working with Lark-Parser in Python would take a full days work.

The you can find the language [here](https://github.com/adam-mcdaniel/xassembler).

It's dynamically typed, and is compiled to a custom 10 instruction set virtual machine code implemented in Rust. After compiling my language to Rust, the output Rust code can then be lowered to native executable code!

Although this was just a test, I am VERY interested in writing a compiled scripting language that acts as a cross platform version of Bash. I've drawn a lot of my inspiration from Groovy, which is a language commonly used as a more robust replacement for shell scripts. I think a cross platform scripting language and shell would be a wonderful advancement in programming technology, and I can't wait to investigate this topic further.
