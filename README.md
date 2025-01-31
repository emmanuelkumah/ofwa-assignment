# Galamsay Sites Data Analysis API

## Overview

This project provides a RESTful API for analyzing illegal small-scale mining (Galamsay) activities in Ghana. The API processes CSV data containing information about number of galamsay sites in the cities across the regions providing various endpoints for analyzing the data.

## Prerequisites

You should have:

- Node.js (version 14.0.0 or higher)
- npm (Node Package Manager)
- The CSV file with Galamsay mining data

## Set up process

Follow the instructions below to install the project on your computer

### Clone the repository

```sh
git clone <repository-url>
cd ofwa-assignment
```

### Install all dependences

Package dependences can be found in the package.json. To install the dependences run:

```sh
npm install
```

### Prepare your data

The galamsay_data.csv file is in the project root directory

## Configuration

The API runs on port 3000 by default. You can modify this by setting the PORT environment variable

### **Environment Variables**

This project uses a `.env` file to securely store sensitive information, such as the MongoDB connection string. Follow the steps below to set up the `.env` file and connect to the database.

#### **Steps to Set Up the `.env` File**

1. **Create a `.env` File**  
   In the root directory of the project, create a file named `.env`.

2. **Add the MongoDB Connection String**  
   Inside the `.env` file, add the following line:
   ```env
   MONGO_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### **Run the app**

Use the command below to start the app:

```sh
npm run dev
```

### **API Endpoints**

Here is a list of the available API endpoints for this project. Each endpoint includes a brief description, the HTTP method, and any required parameters.

#### **Base URL**

```sh
http://localhost:3000/api/v1/galamsay
```

### **Endpoints**

1. **Get All Galamsay Data**

- **Endpoint**: `/`
- **Method**: `GET`
- **Description**: Retrieve all galamsay data from database
- **Parameters**: None

2.  **Get Region With Highest Number of Galamsay Site**

- **Endpoint**: `/highest-region`
- **Method**: `GET`
- **Description**: Retrieve region with highest galamsay site
- **Parameters**: None

3.  **Get cities where the Galamsay sites exceed a given threshold**

- **Endpoint**: `/sites-exceeds-threshold`
- **Method**: `GET`
- **Description**: Retrieve region with galamsay sites exceeding 10
- **Parameters**: None

4.  **Get average number of Galamsay sites per region.**

- **Endpoint**: `/average`
- **Method**: `GET`
- **Description**: Retrieve average number of Galamsay sites per region
- **Parameters**: None

5.  **Get total number of galamsay sites across all cities.**

- **Endpoint**: `/total-sites`
- **Method**: `GET`
- **Description**: Retrieve total number of galamsay sites
- **Parameters**: None

## **Running Test Cases**

Follow these steps to run the test cases for this project:

#### **Prerequisites**

- Ensure you have all the required dependencies installed. You can install them by running:

  ```bash
  npm install
  ```

  **Run all test cases**
  To execute all the test cases, use the following command:

```bash
 npm test
```
