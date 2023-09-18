---
title: "Exploring the Node.js Event Loop"
date: "2023-09-18"
description: "Explore the Node.js event loop and its phases for managing and executing asynchronous tasks. Learn about Libuv, the Reactor pattern, and callbacks."
---

The Event Loop is responsible for scheduling and executing tasks in separate stacks. It is present both in JavaScript and Node.js architecture (part of Libuv).

But before we dive into the event loop itself, let’s take a look at this Node.js architecture overview diagram:

![Node Architecture Diagram](/images/node-js-structure.png)

_Reference: This diagram is based on [this image](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781492077282/files/assets/dsnj_0103.png)._

- **The core Node.js APIs**, written in JavaScript, which implements the high level code providing a set of built-in modules and APIs for various tasks.
- **The binding layer**, which are native C/C++ modules that helps out acting as an interface between Libuv (and other low-level functionalities from the operating system) and JavaScript.
- **The V8**, which is a C++ based open-source engine designed by Google and responsible for interpreting and running JavaScript (the same one used in your in Chrome browser).
- **The Libuv library**, which provides an API for creating event loops, managing the event queue, running asynchronous I/O operations, and queuing other types of task. This was natively built by the Node.js team to handle the complexity of non-blocking behavior in various types of resources and the various interfaces for the event demultiplexer across operating systems (such as epoll, kqueue, etc.)

Now we can dive in a little bit more in Node’s Event Loop:

As you might have guessed by its name, the Event Loop operates in a loop, managing a queue of events that are used to trigger callbacks and move the application along. It responds to various events, such as receiving messages on a socket, changes in files, or scheduled tasks using `setTimeout()`.

We can take a look at the Reactor Pattern in Node.js to check out how the Event Loop works:

![Reactor Pattern Diagram](/images/reactor-pattern.png)

_Reference: This diagram is based on [this image](https://learning.oreilly.com/api/v2/epubs/urn:orm:book:9781839214110/files/Images/B15729_01_03.png)._

When a new I/O operation is generated, the application submits a request to the event demultiplexer (where node keeps the in-progress async operations). The application also provides a callback (handler) that will be invoked when the operation completes. This is a non-blocking call, which allows the application to continue to be used normally.

The Event Demultiplexer will push a set of events into the Event Queue, and these events correspond to the I/O operations that were completed.

That’s when the Event Loop iterates over each event in this queue. The callback associated with each event is then invoked (the callback can also request new asynchronous operations which will be also added to the event demultiplexer).

We might also describe, in a very simple way, the asynchronous behavior: The application wants to access a resource without blocking everything else and provides a callback to handle it, which will then be invoked when the operation completes.

The Event Loop is a critical part of the Libuv library, which is based on this exact Reactor Pattern. However, we have different components acting as event demultiplexers depending on each operational system, and that is called the I/O polling interface. Also, the Event Loop has several stages that can hold different event queues for the callbacks as well. Let’s take a look at those stages:

![Libuv Event Loop Diagram](/images/libuv-event-loop.png)

_Reference: This diagram is based on [this image](https://docs.libuv.org/en/v1.x/_images/loop_iteration.png)._

1. **Run due Timers**: Run all scheduled timer callbacks that have reached their specified timeout (setTimeout or setInterval).

2. If the loop is alive, then the iteration starts; else, the loop exits.

3. **Call pending callbacks**: All I/O callbacks triggered by the previous asynchronous operations are called, and if there is any callback deferred on the current loop, it goes to the next iteration.

4. **Run idle handles**: Libuv runs all idle handles in every active iteration.

5. **Run prepare handles**: Prepare handles get their callbacks called right before the loop will block for I/O.

6. **Poll for I/O**: Libuv checks for pending I/O operations, waits for incoming connections or data. If there are no more I/O events or timers to process, the event loop will be blocked (the blocking time is calculated) until any other event occurs or a timer expires. Finally, the I/O handles that were monitoring reading/writing operations will have their callbacks called.

7. **Run check handles**: Callbacks triggered by setImmediate() are executed immediately after the poll stage, when the loop has blocked for I/O and before the closing of all callbacks.

8. **Call close callbacks**: Callbacks that are triggered via EventEmitter close events.

9. **Update loop time**: The timestamp for "now" is updated.

10. **Run due timers**: All overdue timers are executed, and if a timer becomes due while other timers are being processed during the current iteration, it won't be executed until the subsequent loop.

Additionally, there are two special microtask queues: one for callbacks registered with **`process.nextTick()`** and another for promise callbacks. These callbacks in microtask queues take priority over regular callbacks, in the following order: callbacks in the next tick queue run before those in the promise queue. Callbacks in the promise queue, in turn, run before the callbacks in the event loop phase queues.

Understanding the event loop and its phases will help you to find the best way to manage and apply async operations in your code, which can improve the overall performance of your application.

**References**:

1. Distributed Systems with Node.js. O'Reilly Media.
   [Online] Available at: [https://distributed-systems-with-node-js](https://learning.oreilly.com/library/view/distributed-systems-with/9781492077282/)
2. Node.js Design Patterns - Third Edition. O'Reilly Media.
   [Online] Available at: [https://node-js-design-patterns](https://learning.oreilly.com/library/view/node-js-design-patterns/9781839214110/)
3. Official Libuv Documentation.
   [Online] Available at: [https://docs.libuv.org](https://docs.libuv.org/en/v1.x/index.html)
