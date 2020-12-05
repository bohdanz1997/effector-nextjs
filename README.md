## Run locally

### Install packages
```bash
yarn install
```

### Configure backend host
Add to `/etc/hosts`
```text
<node container ip>   node
```

### Build and run containers
```bash
docker-compose up -d --build
```

Open react app in a browser http://localhost:4444
