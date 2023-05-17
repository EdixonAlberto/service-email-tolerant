# Service Email - Challenge Chiper

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Service fault-tolerant to sending emails.

## Started

- Installation

```bash
$ cd ./backend
$ yarn install

# development
$ yarn start

# watch mode
$ yarn dev

# production mode
$ yarn start:prod
```

- Environment Variables

Must be created un file `.env` in the root of the project "backend", for this you can execute the following command to
copy the provided variables template.

```bash
$ cp template.env .env
```

- Services Mail

Two providers or services were used for sending mail: "Mailgun" and "Sendgrid", before starting the project you must
obtain the necessary credentials.

Create a `MAILGUN_API_KEY` logging into your [mailgun account](http://www.mailgun.com), must have the following format:
`/\w{32}-\w{8}-\w{8}/`

Create a `SENDGRID_API_KEY` logging into your [sendgrid account](https://sendgrid.com), must have the following format:
`/SG\.\w{14}\.\w{24}`

- Testing

In the [thunder-tests](./thunder-tests) folder is a request collection with all the endpoints ready to test. In
addition, the project is prepared with unit, e2e and coverage test, these are the respective commands:

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Production

- CI: the "Github" platform is used with the service of [Github Action](https://docs.github.com/es/actions)

- Pipeline: a [workflow github](../.github/workflows/backend.yaml) file was created a series of steps to review, build
  and test the code.

- Deploy: it was decided to use the "Google Cloud Platform" platform with the service of
  [AppEngine](https://cloud.google.com/appengine) to host the mail service. You can deploy the project from local by
  executing the following command:

```bash
$ yarn build && yarn deploy
```

> NOTA: Please note that this project was built and tested using the following technologies environment:

- node v18.12.0
- yarn v1.22.19
- nestjs/cli v9.1.5
