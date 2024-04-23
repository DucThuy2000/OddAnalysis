## Run local
```
npm i pnpm
nvm use 18 (at least node version 18)
pnpm i
pnpm start
```

## Deploy
```
pnpm build
docker build -t my-football .
docker run -d -p 80:80 my-football
```


