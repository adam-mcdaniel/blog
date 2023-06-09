---
title: Compilers For The Future
date: "2023-06-08T11:52:37.121Z"
template: "post"
draft: false
slug: "/blog/compilers-for-the-future"
category: "Compilers"
tags:
  - "Compilers"
  - "Opinion"
description: "How can we future-proof our programming languages?"
socialImage: /media/lisp.png
---

[***Click here to skip directly to the web demo of the compiler.***](#web-demo)

## The Life Of A Programming Language

> In the beginning the *Developer* created the language and the compiler. Now the semantics of the language were formless and empty, undefined declarations were over the face of the headers, and the *Cursor of the Developer* was hovering above the code on the screen.

> And the *Developer* said: **"Let there be types,"** and there were types. The *Developer* saw that the types were good, and they separated the type-safe from the type-unsafe.

A compiler author hits the enter key on their screen and their language implementation compiles and runs. The code is *flawless*. The compiler author is happy. The compiler author commits their changes like a responsible developer and goes home for the day.

***Time ticks by and the Earth moves around the Sun.***

The compiler author works on other projects for a time and later returns to their language after a few years. They find that: a dependency has been yanked, one of the libraries won't compile without python2, and old compiled programs no longer run on the latest version of their OS. The compiler author is sad. The compiler author fixes the issues and commits their changes like a responsible developer and goes home for the day.

***Time ticks by and the Earth moves around the Sun.***

The compiler author is much older. The compiler author writes their philosophy regarding compiler design and semantics in a series of blog posts. While the compiler author is still alive, they are able to confess the *One True Way* to write programs idiomatically and what their compiler is *supposed* to do. Users are only able to write programs in this language as much as the compiler author makes it easy for them to know how to write programs in this language. The compiler author *must* spread the gospel of their language to the masses for it to live. A small community of users have gathered, and they rely on the compiler author's implementation for their projects to work. The compiler author is happy. The compiler author commits their changes like a responsible developer and goes home for the day.

***Time ticks by and the Earth moves around the Sun.***

The compiler author is dead. The community for the language has slowly shrunk, and the only remnants of the dialect are a few programs used to check people's tax returns for the next ~1000 years. The compiler author's implementation of the language sits in a repository completely untouched over the ages. These files are the fossils of a language.

***Time ticks by and the Earth moves around the Sun.***

Decades have passed. Hardware has transformed. 64 bit code support is obsolete. Manufacturers are transitioning away from traditional x86 based assembly architectures and using the new McDonald's "McLambda-Bitecode" CPU (I'm lovin' it™) powered by the legendary STBLC (Simply-Typed-Binary-Lambda-Calculus) instruction set architecture.

The compiler author's language is not only dead, it is *buried*. The language is decomposing in its repository while time eats it up. To run any of the compiler author's programs now, a new implementation of the language must be written from scratch. The fate of the language depends on how difficult it is to resuscitate the language from its grave.

*Will a machine ever sing a song in this tongue again?*

## An Immortal Language

A language is truly mortal when it is too difficult to resuscitate from the dead. Similarly, a language is immortal when it is easy to resuscitate from the dead.

One example of an immortal language is BrainF*$!. A novice programmer can implement a BrainF^%@ compiler in a single sitting. Any program written in BrainF&~+ will be simple to support by a compiler written in any general purpose programming language in the future. BrainF!@# is immortal.

| BrainF%=" Instruction | C Source Code Equivalent |
|-|-|
|`>`|`++ptr;`|
|`<`|`--ptr;`|
|`+`|`++(*ptr);`|
|`-`|`--(*ptr);`|
|`.`|`putchar(*ptr);`|
|`,`|`*ptr = getchar();`|
|`[`|`while (*ptr) {`|
|`]`|`}`|

This language is immortal because the *complexity* of the language is so minimal. The trade off in BrainF\\{& is that the complexity is shifted into the source code. The only way to simplify the source code is to take on more complexity in the language. This is the trade off of immortality. An immortal language must balance both the complexity required to implement the language and the complexity of source code required to implement any possible algorithm. 

> And a voice from heaven said, "This is my *Compiler*, whom I love; with it I am well pleased."

The goal of a compiler author is that their language live. Their language is the embodiment of their programming philosophy (or some subset of their philosophy) and a part of their legacy. The compiler author *ought* to balance the complexity of the language and the complexity of the source code so that their language is immortal. The compiler author *ought* to express their language with the smallest set of architecture dependent primitives necessary. If they do not, their language will be choked by the thorns and thistles and will eventually suffocate from the unnecessary effort required to port the language due to the extra complexity.

*How can we set ourselves free from this curse?*

## Writing Future-Proof Compilers (A Proposed Architecture)

BrainF\*! is a simple language, but it is not a *useful* language. It is not useful for many reasons:

1. It's not expressive enough to simply represent the logic of real world problems.
2. As a compiler target, it is not efficient. Addition is `O(N)`. For a language to be useful, it must *at least* be able to implement any algorithm in the smallest possible time complexity (and ideally space complexity, but this might be less important).
3. It is *incomplete* for general purpose use. There is functionality that developers need that can't be implemented in BrainF\*!. For example, there is no way to compile a program that reads a file from disk, because there is no way to call foreign functions.

Compiler authors want to write useful languages, so the language must be able to express the logic of real world problems. The language must be able to implement any algorithm in the smallest possible time complexity. The language must be able to call foreign functions. The language must be able to do all of this while being as simple as possible.

What might a language look like that is simple, expressive, and efficient? What might a language look like that is *future-proof*?

I propose the following architecture for a future-proof language: a Turing tape architecture with a register and a read/write head over the tape. The architecture is simple to understand, and a compiler for the instruction set could easily be implemented by a freshman computer science student. The architecture is flexible enough to represent real world problems efficiently, 1:1 with common programming constructs.

[***Click here to skip directly to the web demo of the compiler.***](#web-demo)

### Prelude

This prelude demonstrates the types of all the primitives necessary to implement this language. The Turing tape architecture, much like BrainF\*!, is very simple to port, but it is much more expressive, efficient, and *complete*.

```c
// The cells of the Turing tape can be interpreted as an integer, a float, or a pointer.
union cell {
    long long int i;
    double f;
    union cell *p;
}   // The tape is a contiguous array of cells.
    tape[200000],
    // The tape pointer
    *ptr = tape,
    // A stack containing the list of previous tape pointer positions.
    *refs[1024],
    // The stack pointer for the list of previous tape pointer positions.
    **ref = refs,
    // The register.
    reg;

// An array containing the defined labels.
void (*labels[10000])(void);
```

### Instructions

Below are the **core** instructions. These are instructions that *must* be implemented for every target, although the implementation of the `Get` and `Put` input and output devices depends on the hardware executing the program; not every hardware has a keyboard and a screen, so compilers for targets aren't required to implement all of the `Get` and `Put` input and output device interfaces.

| Instruction | Description | C Source |
|---|:---|---|
| `While` | While the register is not zero... | `while (reg.i) {` |
| `If` | If the register is not zero... | `if (reg.i) {` |
| `Else` | Otherwise (can only be inserted between an `If` and an `End`)... | `} else {` |
| `Function` | Start a function definition. | `void f{LABEL_ID}() {` |
| `End` | End a `While`, `If`, `If` `Else`, or `Function` block. | `}` |
| `Set(n)` | Set the register to a value. | `reg.i = n;` |
| `Call` | Call the Nth defined function in the program (0 indexed) where N is the value of the register as an integer. | `labels[reg.i]();` |
| `Return` | Return from the current function and resume execution after the callsite. | `return;` |
| `Save` | Store the register in the cell under the tape pointer. | `*ptr = reg;` |
| `Restore` | Read the value in the cell under the tape pointer and store it in the register. | `reg = *ptr;` |
| `Move(n: int)` | Move the tape pointer by N cells. | `ptr += n;` |
| `Where` | Store the tape pointer in the register. | `reg.p = ptr;` |
| `Deref` | Look at the cell under the tape pointer. Treat this as an address. Set the tape pointer to this address. Remember the previous tape pointer position so we can go back later. | `*ref++ = ptr; ptr = ptr->p;` |
| `Refer` | Go back to the previous tape pointer position before the matching `Deref`. | `ptr = *--ref;` |
| `Index` | Treat the register as a pointer. Shift this pointer by N cells, where N is the value of the cell under the tape pointer. | `reg.p += ptr->i;` |
| `Add` | Add the value under the tape pointer to the register as an integer. | `reg.i += ptr->i;` |
| `Sub` | Subtract the value under the tape pointer to the register as an integer. | `reg.i -= ptr->i;` |
| `Mul` | Multiply the value under the tape pointer to the register as an integer. | `reg.i *= ptr->i;` |
| `Div` | Divide the value under the tape pointer to the register as an integer. | `reg.i /= ptr->i;` |
| `Rem` | Modulo the value under the tape pointer to the register as an integer. | `reg.i %= ptr->i;` |
| `BitwiseNand` | Treat the register and the value under the tape pointer as 64 bit vectors (or the highest possible number of bits supported by the cell size on the platform). Perform a bitwise NAND operation on them. | `reg.i &= ptr->i;` |
| `GreaterEqualZero` | Is the register greater than or equal to zero? | `reg.i = reg.i >= 0;` |
| `Get(Input(InputMode, InputChannel))` | This provides a standardized interface for developers to write code that can read from a keyboard, a file, a network socket, etc. | *Target implementation for that specific input mode and channel interface, if supported.* |
| `Put(Output(OutputMode, OutputChannel))` | This provides a standardized interface for developers to write code that can write to a screen, a file, a network socket, etc. | *Target implementation for that specific output mode and channel interface, if supported.* |

Below are the **standard** instructions. The compiler tries to use core instructions only, but will use standard instructions as required by the source code. Code using floating point instructions must use the standard instructions to do those operations. Almost all targets implement the standard instructions, but they are not required to do so. A bare metal target might not have floating point support, for example. Targets can support *some* of the standard instructions, but not all of them. For example, a target might support floats, but not have an allocator, so it can't support `Alloc` and `Free`.

Additionally, the standard instructions implement the `Peek` and `Poke` instructions used for FFI. Any functionality that's outsourced to foreign code must use these instructions. The compiler for the target will then link in the foreign code in accordance with the interfaces used by the `Peek` and `Poke` instructions.

| Instruction | Description | C Source |
|---|:---|---|
| `SetFloat(n: float)` | Set the register to a floating point value. | `reg.f = n;` |
| `ToInt` | Convert the register (interpreted as a floating point value) to an integer. | `reg.i = reg.f;` |
| `ToFloat` | Convert the register (interpreted as an integer) to a floating point value. | `reg.f = reg.i;` |
| `Sin` | Treat the register as a floating point value. Compute the sine of this value. | `reg.f = sin(reg.f);` |
| `Cos` | Treat the register as a floating point value. Compute the cosine of this value. | `reg.f = cos(reg.f);` |
| `Tan` | Treat the register as a floating point value. Compute the tangent of this value. | `reg.f = tan(reg.f);` |
| `ASin` | Treat the register as a floating point value. Compute the arcsine of this value. | `reg.f = asin(reg.f);` |
| `ACos` | Treat the register as a floating point value. Compute the arccosine of this value. | `reg.f = acos(reg.f);` |
| `ATan` | Treat the register as a floating point value. Compute the arctangent of this value. | `reg.f = atan(reg.f);` |
| `AddFloat` | Add the value under the tape pointer to the register as a floating point value. | `reg.f += ptr->f;` |
| `SubFloat` | Subtract the value under the tape pointer to the register as a floating point value. | `reg.f -= ptr->f;` |
| `MulFloat` | Multiply the value under the tape pointer to the register as a floating point value. | `reg.f *= ptr->f;` |
| `DivFloat` | Divide the value under the tape pointer to the register as a floating point value. | `reg.f /= ptr->f;` |
| `RemFloat` | Modulo the value under the tape pointer to the register as a floating point value. | `reg.f %= ptr->f;` |
| `GreaterEqualZeroFloat` | Is the register greater than or equal to zero as a floating point value? | `reg.i = reg.f >= 0;` |
| `Alloc` | Allocate a block of N cells, where N is the value of the register as an integer, and store the pointer in the register. | `reg.p = malloc(reg.i * sizeof(reg));` |
| `Free` | Free the memory block pointed to by the register. | `free(reg.p);` |
| `Poke(FFI-Interface)` | Write a value to the given FFI interface. A developer might `Poke` an interface to request some platform specific functionality (such as some external function call in LibC), and `Peek` is used to read the value returned by the interface. | *Target implementation for that specific FFI interface, if supported.* |
| `Peek(FFI-Interface)` | Read a value from the given FFI interface and store it in the register. A developer might `Poke` an interface to request some platform specific functionality (such as some external function call in LibC), and `Peek` is used to read the value returned by the interface. | *Target implementation for that specific FFI interface, if supported.* |

These instruction sets aren't definitive by any means: I want less redundant instructions (Add and Subtract), support for more bit operations like leftshift and rightshift, and functionality for math expressions like logarithms. All instructions should only operate on the register, the value under the tape, and (optionally) a constant literal argument. This design makes it very easy for an optimizer to make deductions about the state of the tape at any given moment — just short of statically determining all the values under the tape at runtime.

## A Compiler for the Architecture

Now that we have a simple to implement instruction set that ***could*** (albeit somewhat inconveniently) represent the bulk of our real world problems. More importantly, it can be translated *1:1* with a simple psuedo-assembly language designed over the architecture, emulating a stack using predefined tape locations as registers.

```x86asm
fun fact // Factorial function in the psuedo-asm language
    if [FP]
        mov [FP], A
        dec A
        push A
        call fact
        mul [FP + 1], [FP]
        pop
    else
        set [FP], 1
    end
end
```

To really prove that the architecture is viable, I've implemented a compiler for a high level language that targets the instruction set. It has parametric polymorphism, algebraic datatypes, pattern matching, and more. The language is simple enough that it can easily be ported to platforms like the web, but it's also capable of important algorithms like AES encryption and decryption (Rijndael). The compiler could be reimplemented in itself (with a *lot* of effort). The stages of compilation used to create the language are suitable intermediate representations for implementing other languages as well.

This webdemo shows the compiler in action: you can change the output to see the generated IR, the psuedo-assembly, the instruction set code, the equivalent C source, the x86 assembly, and the execution output (the generated instructions are fed into an interpreter after compilation).

### Web Demo

<embed type="text/html" src="https://adam-mcdaniel.github.io/sage/sage/web/index.html" title="Compiler" width="100%" height="940em"></embed>

You might worry that the architecture forces the language to compile to a verbose number of instructions, and that this leads to inefficiency despite being portable. Fear not: optimizations can be applied very aggressively to make the code highly performant. A compiler, for example, might implement first class Tensor objects which can be compiled using the simple architectures instructions. An optimizing compiler can discern a matrix multiplication *very easily* just using peephole optimizations on the compiled instructions, and the optimizer can substitute those operations with the equivalent BLAS library calls. This allows programs to be *compiled for portability* for distribution (write once run anywhere, *and* add a new supported platform in an afternoon), but then it also allows programs to utilize *optimized platform specific code upon execution / lowering to a given target*.

## Conclusion

Wow, now I can compile high level programs using polymorphism and algebraic types down to an architecture that can essentially be compiled to your favorite target with string replacement and a little bit of duct tape! Compiled programs which use this architecture are *at least* guaranteed to be simple to resurrect: *some* degree of immortality. This architecture will survive as long as there are machines with imperative instruction sets, and probably as long as Turing-complete general-purpose-languages that have integers and array-like data structures.

The compiler author is happy. The compiler author commits their changes like a responsible developer and goes home for the day.

***Time ticks by and the Earth moves around the Sun.***
