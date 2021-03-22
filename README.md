mimi-server (把秘密放在云端)
=========

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ballantyne/mimi-server)

To put your encrypted secrets in the cloud, click the deploy button above and then clone the repo and add these configuration settings.  This repo should be very easy to modify so that it can be used with other cloud providers.  If someone wants to do that work I welcome the contributions.  I made this as an example of how to stream directly to a cloud provider without saving to disk.  You ought to be able to use the kepa-de-mimi module to send a encrypted file wherever.  Feel free to modify this project to suit your needs.


```bash
  heroku config:set AWS_ACCESS_KEY_ID=key
  heroku config:set AWS_SECRET_ACCESS_KEY=secret
  heroku config:set AWS_REGION=region
  heroku config:set AWS_BUCKET=bucket
```

Contributing
------------

If you'd like to contribute a feature or bugfix: Thanks! To make sure your fix/feature has a high chance of being included, please read the following guidelines:

1. Post a [pull request](https://github.com/ballantyne/mimi-server/compare/).
2. Make sure there are tests! We will not accept any patch that is not tested.
   It's a rare time when explicit tests aren't needed. If you have questions
   about writing tests for paperclip, please open a
   [GitHub issue](https://github.com/ballantyne/mimi-server/issues/new).


And once there are some contributors, then I would like to thank all of [the contributors](https://github.com/ballantyne/mimi-server/graphs/contributors)!




License
-------

It is free software, and may be redistributed under the terms specified in the MIT-LICENSE file.

Copyright
-------
© 2018-2022 Scott Ballantyne. See LICENSE for details.
