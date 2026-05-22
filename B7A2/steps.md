
# Configuring a Express project with postgres backend

step: 1 -> npm init -y  // Initializing project
        Configure-package.json:
        1. change the type to module

step: 2 -> npm i -D typescript // Installing typescript as a dev dependency

step: 3 -> npx tsc --init // Initializing Typescript 
        Configure-tsconfig.json:
            1. uncomment src, out directory
            2. Module: esnext
            3. types: "node"
            4. comment out jsx file

step: 4 -> create folders "src, dist"
step: 5 -> npm i express //install express js
step: 6 -> npm i --save-dev @types/express //Install the types for typescript support
step: 7 -> npm i -D tsx //Install typescript executor as dev dependency
step: 8 -> npm i pg // Installs postgres support for express/nodejs
        --> after installing pg,
                for typescript support: npm i --save-dev @types/pg

step: 9 -> We're connecting postgres in neon db so put the connection string to dotenv
step: 10 ->  npm i dotenv // install dotenv package
step: 11 -> npm i bcryptjs // for encryption


//JWT based authentications

step: 1 -> npm i jsonwebtoken
step: 2 -> npm i --save-dev @types/jsonwebtoken
step: 3 -> for refresh token install cookie parser
                `npm i cookie-parser`
                `npm i --save-dev @types/cookie-parser`
step: 4 -> setting up CORS 
                `npm i cors`
                `npm i --save-dev @types/cors`
