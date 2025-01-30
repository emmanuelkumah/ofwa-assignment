# Galamsay Mining Data Analysis API

## Overview

This project provides a RESTful API for analyzing illegal small-scale mining (Galamsay) activities in Ghana. The API processes CSV data containing information about mining sites, miners, and environmental impact, providing various analytical endpoints for data visualization and reporting.

## Features

Overall mining activity summary statistics

## Prerequisites

Node.js (version 14.0.0 or higher)
npm (Node Package Manager)
CSV file with Galamsay mining data

## Installation

- Clone the repository

```sh
git clone <repository-url>
cd ofwa-assignment
```

- Install all dependences

```sh
npm install
```

- Prepare your data
  Place your galamsay_data.csv file in the project root directory

## Configuration

The API runs on port 3000 by default. You can modify this by setting the PORT environment variable

## Run the app

1. Start the server

```sh
node server.js
```

2. The API will be available at http://localhost:3000 (or your configured port)
