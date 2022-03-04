<h1 align="center">
 <img width="200" src="https://tr.gravatar.com/userimage/183519138/efb93caed9ebdb11303b62379395458a.png?size=200"/>
 <br/>
 Pingu
</h1>

The best way to watch YouTube by video chatting with friends.

> It is **not suitable** for **use** as it is still in the **development** stage.

## Introduce
+ [Roadmap](#roadmap)
  +  [Technologies planned to be used](#technologies-planned-to-be-used)
+ [Folder structure](#folder-structure)
+ [Usage](#usage)
+ [Contributing](#contributing)
+ [Contributors](#contributors)
+ [License](#license)

## Roadmap
You can see what we've done before and what we will work on in the future.

**development**
- [ ] Chat
- [ ] Embeded YouTube
- [ ] Voice and Video chat
- [ ] Basic test
- [ ] Dockerize, CI/CD, GitHub Bots, pre-production

**production**
- [ ] Admin panel

### Technologies planned to be used
Node.js, TypeScript(optional), Nest.js, Socket.io, Redis, MongoDB, Peer.js

## Folder structure
```bash
.
├── CONTRIBUTING.md # Contributing document
├── dist # Build folder
├── LICENSE
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── sample.env 
└── src
    ├── Constants
    │   ├── index.js
    │   └── SocketEvents.js
    ├── Events # socket events handlers, <job-category>/index.js
    │   ├── index.js 
    │   └── System
    │       └── index.js
    ├── server.js 
    └── Socket.js 

```
## Usage
## Install
```bash
git clone https://github.com/anchovycation/pingu-api.git
cd pingu-api
```

## Setup
Install dependencies
```bash
npm install
```

## Set environment variables
Copy [sample.env](./sample.env) file then changes values.
```bash
cp sample.env .env
```

## Start
### Production
```bash
npm start
```
### Develpoment
Develop using hotreload

```bash
npm run start:dev
```
## Lint
```bash
npm run lint
```
**Fix lint errors**:
```bash
npm run lint:fix
```
## Build Code
```bash
npm run build
```
## Contributing
If you want to contribute to the project, please first **check** if the work you are doing is already an **issue**. If there is an issue and there is someone assigned to the issue, **contact that person**. If there is no issue, you can send your development to the project managers by opening a **pull request**. Please read [CONTRIBUTING.md](./CONTRIBUTING.md)

## Contributors
<a href = "https://github.com/anchovycation/pingu-api/graphs/contributors">
  <img src = "https://contrib.rocks/image?repo=anchovycation/pingu-api"/>
</a>

## License
[GNU GENERAL PUBLIC LICENSE Version 3](./LICENSE)
