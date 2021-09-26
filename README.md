# Travel App

## Table of Contents

---

- [Travel App](#travel-app)
  - [Table of Contents](#table-of-contents)
  - [Project Description](#project-description)
  - [Requirements](#requirements)
  - [Dependencies](#dependencies)
  - [To Run Project](#to-run-project)
  - [Test Using Jest](#test-using-jest)
  - [Extend Your Project](#extend-your-project)

## Project Description

---

This is a final project from Udacity Front End Nanodegree Program. The project makes use of html, css, javascript, webpack, jest, node, and express.

The web application takes a date and city as an input, and displays the weather information and countdown of the days that are left until the travel.

## Requirements

---

- Need to dounload and install [node](https://nodejs.org/en/).

## Dependencies

---

All the dependencies are listed in the "package.json" file. How to install them can be found in the next section.

## To Run Project

---

**Step 1: Create .env file**
First You need to create ```.env``` file inside the project root.
Inside you need to create the following:
```
USER_NAME=<user_name>
WEATHER_KEY=<api_key>
PIXABAY_KEY=<api_key>
```

The ```USER_NAME``` is from [Geoname](http://www.geonames.org/export/web-services.html).

The ```WEATHER_KEY``` is from [Weatherbit](https://www.weatherbit.io/account/create).

The ```PIXABAY_KEY``` is from [Pixabay](https://pixabay.com/api/docs/).

**Step 2: Install Dependencies**

In the terminal, ```cd``` into the project folder(.../travel-app):

```bash
$ npm install

```

**Step 3: Start server**

Open two terminal, in one:
```bash
$ npm run build-dev
```

The above starts the dev server and opens up the browser on port 8080.

And in the other:
```bash
$ npm run build-prod
$ npm run start
```

The above starts the server on port 8081.

## Test Using Jest

Test can be ran using the following command in the terminal in project root folder:

```bash
$ npm run test
```

## Extend Your Project

Feature implemented:

- Allow the user to remove the trip.
  - When user clicks "Remove Trip" button, the trip information gets emptied.