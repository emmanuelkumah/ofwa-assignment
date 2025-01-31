# Galamsay Mining Data Analysis API

## Overview

This project provides a RESTful API for analyzing illegal small-scale mining (Galamsay) activities in Ghana. The API processes CSV data containing information about number of galamsay sites in the cities across the region providing various endpoints for data visualization and reporting.

## Prerequisites

You should have:

- Node.js (version 14.0.0 or higher)
- npm (Node Package Manager)
- CSV file with Galamsay mining data

## Installation

Follow the instructions below to install the project on your computer

- Clone the repository

```sh
git clone <repository-url>
cd ofwa-assignment
```

- Install all dependences
  Package dependences can be found in the package.json. To install the dependences run:

```sh
npm install
```

- Prepare your data
  Place your galamsay_data.csv file in the project root directory

## Configuration

The API runs on port 3000 by default. You can modify this by setting the PORT environment variable

## Run the app

1. Start the server
   The project uses nodemon to automatically restart the app. To start the app run

```sh
npm run dev
```

2. The API will be available at http://localhost:3000 (or your configured port). Use your web browser, Postman or Thunder client for the http request

## Testing
