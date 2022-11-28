# Frontend Service Email - Challenge Chiper

<p align="center">
  <a href="https://vuejs.org/" target="blank"><img src="https://vuejs.org/images/logo.png" width="200" alt="Vue Logo" /></a>
</p>

SPA web app to show the operation of the fault-tolerant email delivery service.

### Web Demo &#x279c; [https://edixonalberto.github.io/challenge-chiper/](https://edixonalberto.github.io/challenge-chiper/)

## Installation

```bash
$ cd ./frontend
$ yarn install

# watch mode
$ yarn dev

# build project
$ yarn build

# production mode
$ yarn preview
```

## Environment Variables

Must be created un file `.env` in the root of the project "frontend", for this you can execute the following command to
copy the provided variables template.

```bash
$ cp template.env .env
```

## Deploy

In the project a [workflow of github](../.github/workflows/frontend.yaml) was created to perform a compilation by via
**Github Actions** and automated deployment via **Github Pages**

> NOTA: Please note that this project was built and tested using the following technologies environment:

- node v18.12.0
- yarn v1.22.19
- vite v3.2.4
