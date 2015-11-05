# IDoneThis - Quick add form

## Description

Very simple mobile-friendly HTML form to submit a done to IDoneThis

## Demo

Can be used at http://flesler.github.io/idonethis-form/

It posts your dones using [IDoneThis API](https://idonethis.com/api/v0.1/dones/#post).
The form is responsive and is especially suited to be used from a mobile phone.

## Authentication

For it to work, as specified on the [API's docs](https://idonethis.com/api/v0.1/#authentication), you need to provide your team name and [API token](https://idonethis.com/api/token/).
Add them to the querystring, here's an example:

```
http://flesler.github.io/idonethis-form/?team=my_team&token=9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b
```

## Why I made this

When I'm on my PC, I use [idid](https://github.com/jviotti/idid) to quicky add dones from the command-line.
Sometimes I'm away from my computer and would love to add dones with my phone, there's an [iOS app](https://itunes.apple.com/us/app/idonethis-personal-team-done/id953098586?mt=8) but I don't like it (and seems others don't either).
Instead, I keep a quick link to this form with my credentials included for fast submissions.

## Data privacy

Your team and API key are in no way stored or shared, you can verify that by reading the code.