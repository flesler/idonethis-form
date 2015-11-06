# 1.2.0
- `team` parameter was renamed to `teams`
- `teams` parameter can include many teams separated by comma, which results in radio buttons to pick team
- The TAB key can be used to toggle between teams
- The text of teams radio buttons are links to their dones page
- Stopped using form.reset() because radio buttons reset as well
- Turned off native autocomplete on done input

# 1.1.2
- Auto (re)focus the input if the user starts typing

# 1.1.1
- Added notices related to `day_start` parameter

# 1.1.0
- Added support for `day_start` querystring parameter. Done's created before that hour will be added to the previous day.
- Expanded the documentation on README.md
- Added link to project home with a Github icon 
- Default querystring includes day_start=0

# 1.0.1
- UX improvements on mobile

# 1.0.0
- First version, does what is it supposed to do