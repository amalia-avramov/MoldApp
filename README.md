# Moldsafe

The application is designed to provide users with real-time information about the indoor environment, especially in terms of critical temperature and humidity parameters that favor mold growth.

## Prerequisites

Before running this project, make sure you have the following installed on your machine:

- Visual Studio Code
- Docker for Desktop
- PlatformIO extension
- Dev Containers extension

## Setup

Clone this repository to your local machine.

### 1. Docker Setup
A Docker Compose file has been provided for running the entire application stack together. To use it, run the following command  in the project root folder:

```bash
docker-compose up -d
```
Docker will start the Mosquitto, InfluxDB and MongoDB containers together.

### 2. Backend Setup

#### Development Container Setup

- Open the `/backend` folder in VS Code.
- When prompted to reopen the project in a container, click "Reopen in Container". If not prompted, you can open the Command Palette (Ctrl+Shift+P) and select "DevContainers: Reopen in Container".
- Install the dependencies by running the following command:

```bash
npm install
```

- Run backend server using:

```bash
npm run start:dev
```

### 3. Frontend Setup

- Navigate to the `/frontend` folder and install the dependencies by running the following command:
```bash
npm install
```
- Run frontend server using:
```bash
npm run dev
```

### 4. Sensor Setup
- Open the `/sensors` folder in VS Code.
- Once the PlatformIO project is opened, you can use the PlatformIO sidebar to access various features, such as building, uploading firmware, and managing libraries.
- Use `Upload and Monitor` task to upload the firmware and monitor the device output.