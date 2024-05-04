## ShareVideo setup

### 1. Clone Repository and Install Dependencies

Clone repository from Github:

```bash
# git
https://github.com/haizizhen001/share-video
```


### 2. Available Scripts Docker

In the project directory, you can run docker BE:

```bash
cd be
docker compose up

```

Docker FE:
```bash
cd fe
docker build -t fe-sharevideo .
docker run --publish 3000:3000 fe-sharevideo
```

BE: http://localhost:3001
FE: http://localhost:3000



### 3. Start Backend Server manual:
Please install mongodb
Change database in .env
Go to path: 
```bash
cd be
```
Run Backend Server in Development mode:
```bash
npm run start

# watch mode
npm run start:dev
```

Run Backend Server in Production mode:
```bash
npm run start:prod
```

### 4. Start Frontend Server manual:
Go to path: 
```bash
cd fe
```
Setup .env api and api websocket in .env
Install by yarn
```bash
yarn install
```

Run Frontend Server:
```bash
yarn start
```

Run build file:
```bash
yarn build
```








