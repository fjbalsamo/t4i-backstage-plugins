# Tech4Impact 2025

Creating a [Backstage](https://backstage.io) plugins

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (>= 16.x)
- Yarn (>= 1.x)
- Docker (optional, for backend services)

## Running the Project

To start working with this repository, clone it and install dependencies:

```sh
git clone https://github.com/fjbalsamo/t4i-backstage-plugins.git
cd t4i-backstage-plugins
yarn install
yarn dev
```

> This will start the Backstage development environment.

## Creating plugin

You can create a new plugin using the Backstage CLI:

```sh
yarn new
```

### Create a Frontend Plugin

```sh
yarn new
```

> choose `frontend-plugin` option and follow the instructions

### Create a Backend Plugin

```sh
yarn new
```

> choose `backend-plugin` option and follow the instructions

## Project Overview

We’ll be creating two plugins:

1. Frontend Plugin – a UI component that interacts with Backstage.
2. Backend Plugin – an API service that handles requests from the frontend.

## Interaction Flow:

- The frontend sends requests to the backend plugin.
- The backend processes the request and returns a response.
- The frontend updates the UI accordingly.

## Basic Knowledge Required

To follow along, familiarity with the following technologies is recommended:

- NodeJS – for the backend service
- ReactJS – for the frontend plugin
- Material-UI – for styling the frontend components
