### Installation
#### Requirements
[`phantomjs >= 1.9`](http://phantomjs.org/)

[`python 2.7`](http://www.python.org/download/)

A json file containing the accounts that you wish to automate. (formatted accordingly to syntax as shown in the [logins_template.json](headless/json/logins_template.json)

and lastly a task-scheduler, like cron or WTS.
#### Usage
`python headless.py <path/to/logins_file> <threads_amount>`

<img style="display:inline;" alt="Headless screenshot" src="http://i.imgur.com/0bHMTKv.png"/>