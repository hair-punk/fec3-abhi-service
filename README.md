# Exhaust Computer Entertainment Sales Platform

This repository contains the Exhaust sales platform video player module.  The Exhaust platform is designed with the technical considerations of computer game sales, and this video player leverages AWS and the [react-player](https://github.com/CookPete/react-player) project.

![cropped video player screenshot](https://user-images.githubusercontent.com/1322821/60388296-2504f600-9a64-11e9-8d98-97cea548811b.png)
# Link
http://13.57.253.108:3008/
## Related Projects
  - https://github.com/hair-punk/fec3-tvo-service
  - https://github.com/hair-punk/fec3-amkw-service
  - https://github.com/hair-punk/fec3-azu-service

## Usage
Install the dependencies with

```npm install```

Then, install mongodb in the package manager of your choice

Then seed the database by running

```npm run seed-db```

To start the express server run

```npm run express-server```

To start the front end run

```npm run front-end```

Now the server is operational and should be accessable from localhost:3008

The videoplayer will not work without an s3 bucket integration.  

