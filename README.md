# Room Reservation System

A platform that allows students to choose a dorm room.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### MacOS

```
VScode (with C# exension installed) or Visual studio
dotnet core (https://dotnet.microsoft.com/download)
Insomnia/Postman
Docker
Datbase Management Tool
```

### Installing

Clone the project and restore all the dependencies. The VScode C# extension should help you dynamically navigate through the project.

Run the docker container with the MSSQL image (https://dev.to/justinhhorner/mssql-on-macos-via-docker-k1c).

```
Run the container with the same env variables as in the ConnectionString
```

After the container is running go into **_Source/Backend/Data/RoomReservation.Data_** and run the migrations using the command:

```
dotnet ef database update
```

If you have setup the docker container with the right credentials the migrations should execute successfully.

Start the project

## Running the skeleton

Start the project and try to make a request through Postman/Insomnia. For Insomnia you can import the workspace with requests from the **_Insomnia_Workspace_RR.json_**
