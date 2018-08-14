# Webpack Runtime Config

## Problem Statement:

This fixes the long standing problem of having the environment variables during runtime available.

* https://github.com/facebook/create-react-app/issues/578#issuecomment-277843310.
* https://vanja.gavric.org/blog/configure-create-react-app-to-consume-env-variables-during-run-time/

### Use-Case:

We have a create-react-app, which is put into a container and deployed on multiple servers. Right now running `yarn build` will consume all
environment variables - this means, we could run `yarn build` only at `docker start`. This increases the startup time to nearly 2 minutes.

## Requirements:

* Should not influcence running `yarn start` at all - this means, the ".env" file, ".env.local" and environment variables should still be
usable.
* Minimal influence on the existing code-base
* No dependencies, so that it can be run easily in docker (meaning: bash-scripts)

## Architecture:

* at build-time (`yarn build`) all environment variables are reset to a placeholder variable
    * Only those variables listed inside .env are replaced (and only those starting with `REACT_`)
* at run-time (nginx, serve) all placeholders are replaced with the environment variables
    * Only those variables inside the environment are replaced (not those from .env)


## Sample Script

Included in this repository is a small create-react-app sample application.
Just run `yarn build -t frontend .`.
Then run `yarn run -e="REACT_APP_VAR1=Y;REACT_APP_VAR2=123" -p3000:80 -t frontend`.

## Modifications to existing codebase

Because of the treeshaking of uglify, statements such as `if (process.env.REACT_APP_VAR1 === "Y")` must be rewritten - otherwise this
statement is evaluated at compile-time. This would then evaluate to `if (@REACT_APP_VAR1@ === "Y")` and remove the statement.

The solution is quite simple - confuse the treeshaker with a method-call:
Either use .valueOf() or .toString():
`if (process.env.REACT_APP_VAR1.valueOf() === "Y")` 
