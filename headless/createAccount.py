import json
import urllib
import urllib2
import sys
import random

firstnames = json.load(open('json/firstnames.json'))
lastnames = json.load(open('json/lastnames.json'))
logins = json.load(open('json/logins.json'))

firstname = random.choice(firstnames)
lastname = random.choice(lastnames)
email = sys.argv[1]
password = sys.argv[2]
post = (
  "FirstName="            + firstname +
  "&LastName="            + lastname +
  "&EmailAddress="        + email +
  "&RepeatEmailAddress="  + email +
  "&Password="            + password +
  "&ConfirmPassword="     + password +
  "&UserGender=Male&Gender=Male"
)

try:

  response = urllib2.urlopen("http://www.eovendo.com/Signup/SignupUser", post)
  resp = json.loads(response.read())

  if resp["returnUrl"] == 'error_captcha': 
    print "Captcha required."
  
  else: 
    print "{0} has been created!".format(email)
  
    login = {"EmailAddress": email, "Password": password}
    logins.append(login)
    with open('json/logins.json', 'w') as outfile:
      json.dump(logins, outfile)
      print email + " has been stored!"

except Exception, e:
  print e