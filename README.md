# IDoneThis - Quick add form

## Description

Very simple mobile-friendly HTML form to submit a done to IDoneThis

## Demo

Can be used at http://flesler.github.io/idonethis-form/

It posts your dones using [IDoneThis API](https://idonethis.com/api/v0.1/dones/#post).
The form is responsive and especially suited to be used from a mobile phone.

## Querystring parameters

### team

You must specify the team to which the done should belong to.

### token

To [authenticate you](https://idonethis.com/api/v0.1/#authentication), you must provide your [API token](https://idonethis.com/api/token/).

### day_start (optional)

I don't know about you, but I always continue doing stuff after midnight and, as I see it, they belong to the "previous" day.

In other words, days begin when I wake up. That's why I added implemented this parameter that allows you to specify an hour (1-23). All dones logged before that hour will end up in the previous day.

### Example

This is an example of a URL with all 3 parameters:
```
http://flesler.github.io/idonethis-form/?team=my_team&token=9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b&day_start=8
```

## Adding a shortcut on Home Screen

Check [this link](http://teachmeios.com/how-to-add-a-webpage-bookmark-as-an-icon-on-home-screen-of-iphone-ipad-mini-and-ipod-touch/) out to see how to achieve that in iOS.
Can also be done on other OS, you'll have to google it.

Here's how it looks on my phone:

![](https://raw.githubusercontent.com/flesler/idonethis-form/gh-pages/home-screen.jpg)

## Why I made this

When I'm on my PC, I use [idid](https://github.com/jviotti/idid) to quicky add dones from the command-line.
Sometimes I'm away from my computer and would love to add dones with my phone, there's an [iOS app](https://itunes.apple.com/us/app/idonethis-personal-team-done/id953098586?mt=8) but I don't like it (and seems others don't either).
Instead, I keep a quick link to this form with my credentials included for fast submissions.
Also for me, deferring the start of the day is a sweet useful feature.

## Data privacy

Your team and API key are in no way stored or shared, you can verify that by reading the code.