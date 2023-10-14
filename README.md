# Postman Function Cheat Sheet

## How to Use it?

You can use the `eval()` function to use a function like this:

```js
eval(pm.environment.get('function_check_schema'))(schema);
```