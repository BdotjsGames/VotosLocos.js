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