import { EventEmitter } from "node:events";

const task = new EventEmitter();

task.on("greet", (name) => {
    console.log(`Hello, ${name}! Welcome to the session`);
});

task.on("greet", () => {
    console.log("Class started by Chandrahas Mishra");
});

task.on("exit", (reason) => {
    console.log(`Session ending. Reason: ${reason}`);
});

task.on("exit", () => {
    console.log("Class finished by Chandrahas Mishra");
});

// Emit events
task.emit("greet", "Student");
task.emit("exit", "Class completed");
