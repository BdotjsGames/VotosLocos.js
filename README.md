# Votos Locos

# build instructions
after adding any new js files run the build script
`./build.sh`
this creates a new src/index.html file that automatically includes all .js files in the project, in alphabetical order.

I use prefixed numbers on file names to change the build order. This is pretty much only necessary for class inheritance. 

# git pages build
git pages is only able to read an index.html at the root level, for some reason.
Right now i'm manually copying the src/index.html to index.html
and find and replacing all "./" with "./src/"

# export aseprite images and json by layers
1. Ensure you have a .env file. And add the following env variable

```
ASEPRITE_PATH="C:/Program Files/Aseprite/"
```

2. Then run the following command

> npm run export_aseprite

or 

> vscode debug select Run npm export_aseprite and run it.

3. Notice png and json metadata will be added into the src/Assets/images/ directory.