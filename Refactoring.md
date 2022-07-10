# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
The code is already mostly clean and readable, expcept for the nested if statements. Nested if statements increase code complexity and are harder to reason about compared to code with no nested if statements.

By creating the `createHashFromEvent` function, I eliminated the nested if.
Also, by creating the createHashFromEvent function, i made sure functionally related code was in the same place instead of scattered in different places in the script. For example, before the refactor, code for retireving partitionKey from the event object and to convert it to a string if it wasn't a string already, was in two different places. But after the refactor, both retrieving and conversion are in the same function.

Also, assigning TRIVIAL_PARTITION_KEY in the first line where event is checked for null or undefined, better expresses the  concept that if no input is given, then the return value should be TRIVIAL_PARTITION_KEY, else a hash should be generated from the input.

Code that is functionally related is placed together while that which is not so much associated is sepaarted. Cohesion is  achieved.