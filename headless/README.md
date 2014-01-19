### Installation
#### Requirements
*(required)*  
[`phantomjs >= 1.9`](http://phantomjs.org/)

*(required)*  
[`python 2.7`](http://www.python.org/download/)

*(required)*  
A json file containing the accounts that you wish to automate. (formatted accordingly to syntax as shown in [logins_template.json](headless/json/logins_template.json)).

*(optional)*  
A json file containing a set of proxies (formatted accordingly to syntax as shown in [proxies.json](headless/json/proxies.json)).

*(optional)*  
A task-scheduler, like cron or WTS.
#### Usage
`python headless.py <threads_amount>`

<img style="display:inline;" alt="Headless screenshot" src="http://i.imgur.com/0bHMTKv.png"/>