
# Auth Made Easy

A simple and flexible package which let you setup your express backend very easily

## Installation

```bash
npm install auth-made-easy
```

### Setup 
1. create a index.js file
2. import authmadeeasy method

 ```javascript

  import authmadeeasy from "auth-made-easy/authmadeeasy.js";

  authmadeeasy({
    db_uri: 'mongodb://localhost:27017',
    db_name: 'mycustomdb',
    port: 3000
  });

 ```

 3. Update package.json

 ```
 {
  "scripts": {
    "dev": "nodemon index.js",
    "run": "node index.js"
  },
  "type": "module",
  "dependencies": {
    "auth-made-easy": "^1.0.3"
  }
}

```
