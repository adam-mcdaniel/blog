#!/bin/bash

# OLD BUILD SCRIPTS
# npm run build
# rm -Rf docs
# cp public docs -R

# NEW BUILD SCRIPTS
# Build the docker image
docker build -t blog-builder .
# Stop and remove the container if it exists
docker stop $(docker ps -lq)
# Run the docker image
docker run -it -p "8000:8000" blog-builder
# Now copy the `public` folder from the container to the host
docker cp $(docker ps -lq):/app/public .

# Move the public folder to the docs folder
rm -Rf docs
mv public docs