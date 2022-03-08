# GitHub Traffic Website
This website shows you the github traffic on your repositories. View it in action [here](https://Github-Traffic.s40.repl.co).
## Setup
Edit the config vars. First generate a Personal Acccess Token [here](https://github.com/settings/tokens/new). Then set the variable on this line: https://github.com/Oren-Lindsey/github-traffic-site/blob/1c2e1b7fd5175d3da9212234392e24c3bc987a76/index.js#L8
to it using your favorite environment variable system. This is required because you must have permission to do view the stats.
Next change the username on this line: 
https://github.com/Oren-Lindsey/github-traffic-site/blob/1c2e1b7fd5175d3da9212234392e24c3bc987a76/index.js#L9
to your username. This is needed so you don't try to get stats for someone else's repositories.
Then finally change this variable on this line:
https://github.com/Oren-Lindsey/github-traffic-site/blob/1c2e1b7fd5175d3da9212234392e24c3bc987a76/index.js#L10
to whatever repository title (without the author) you want to be the default one that shows up when the page first loads.
## Run
`node index.js` in the shell
## Shields.io badge
If you want a cool shields.io badge like this: ![Github Views on this repo](https://img.shields.io/endpoint?color=github&logo=github&style=flat-square&url=https%3A%2F%2Fgithub-traffic.s40.repl.co%2Fapi%2Fviews%2Fgithub-traffic-site%2Fshields), just go to [this website](https://shields.io/endpoint) and put this: `https://YOURDOMAIN/api/views/REPO/shields` in the url field in the form at the bottom. You can do the normal shields.io customization.
##
![Github Views on this repo](https://img.shields.io/endpoint?color=github&logo=github&style=flat-square&url=https%3A%2F%2Fgithub-traffic.s40.repl.co%2Fapi%2Fviews%2Fgithub-traffic-site%2Fshields)
