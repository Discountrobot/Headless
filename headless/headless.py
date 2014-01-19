import subprocess, json, threading, sys, random, time, os, math
from Queue import Queue, Empty

class Headless:

  dir_path = os.path.dirname(os.path.abspath(__file__))
  phantom = 'phantomjs'
  phantom_flags = {
    "proxy": "--proxy",
    "auth": "--proxy-auth",
    "type": "--proxy-type" 
  }

  headless_path = os.path.join(dir_path, 'headless.js')
  logins_path   = os.path.join(dir_path, 'json/logins_template.json')
  proxies_path  = os.path.join(dir_path, 'json/proxies.json')
  log_path      = os.path.join(dir_path, 'logs/events.txt')

  logins = Queue()
  proxies = []
  estimate = []

  worker_amount = 1
  workers = []
  
  def __init__(self):

    # set worker amount if specified
    try:
      worker_amount = int(sys.argv[1])
    except Exception, e:
      print "no worker amount specified assuming 1"

    # load & parse logins file 
    try:
      # parse the json file
      logins = json.load(open(self.logins_path))

      # shuffle the list to obscure our intentions
      random.shuffle(logins)


      # put the logins in the queue.
      for login in logins:
        if login['EmailAddress'] and login['Password']:
          self.logins.put(login) 

      print "found " + str(self.logins.qsize()) + " valid accounts"
    
    except Exception, e:
      sys.exit(self.logins_path + " could not be found")

    # load and parse proxies
    try:
      # parse the json file
      json_proxies = json.load(open('json/proxies.json'))
      self.proxies = self._flagify(json_proxies)

    except Exception, e:
        print self.proxies_path + " could not be found"

  # turns a proxy into phantomjs flags
  def _flagify(self, json_proxies):
    proxies = []

    for idx, proxy in enumerate(json_proxies):
      flags = []
      # check if the ip and port are defined pass otherwise
      if not proxy["ip"] or not proxy['port']:
        continue
      else:
        flag = self.phantom_flags['proxy'] + "=" + proxy["ip"] + ":" + proxy["port"]
        flags.append(flag)
      # append auth information if present
      if proxy["username"] and proxy["password"]:
        flag = self.phantom_flags['auth'] + "=" + proxy["username"] + ":" + proxy["password"]
        flags.append(flag)
      # if the type is set append it, phantom assumes "http" otherwise
      if proxy["type"]:
        flag = self.phantom_flags["type"] + "=" + proxy["type"]
        flags.append(flag)
      proxies.append(" ".join(flags))

    print "found " + str(len(proxies)) + " valid proxies"
    
    # if there are no valid proxies, use our own IP
    if len(proxies) == 0:
      return " "
    else:
      return proxies

  def _commander(self, cmd, flags, target, targetflags):
    flags = ' '.join(flags)
    targetflags = ' '.join(targetflags)
    return ' '.join([cmd, flags, target, targetflags])    

  # calculate an estimate for the time left
  def _calculateEstimate(self, start_time, timeout):
    
    self.estimate.append( (time.time() - start_time) + timeout)
    
    estimated_average = round((sum(self.estimate) / len(self.estimate)) * self.logins.qsize())
    mins = int(math.floor(estimated_average / 60))
    secs = int(estimated_average - mins * 60)

    print "{0} accounts left ..".format(self.logins.qsize())
    print "estimated time left: {0}.{1}min ..".format(mins,secs); 

  def _automate(self):
    while not self.logins.empty():
      login = self.logins.get() # get the next login in the queue
      start_time = time.time() # time the session
      timeout = random.randint(15,30)
      name = threading.current_thread().name
      proxy = random.choice(self.proxies) # get a proxy

      command = self._commander(self.phantom, [proxy], self.headless_path, [login['EmailAddress'],login['Password']])
      process = subprocess.Popen(command, shell = True)
      process.wait() # wait for the proccess to finish
      
      # calculate an estimate for the time left
      self._calculateEstimate(start_time, timeout)
      
      # create a timeout before continuing
      print name + " waiting {0}s ..".format(timeout)
      time.sleep(timeout)
      
    # write to events.txt when the script successfully executed. 
    with open(self.log_path, 'a') as outfile:
      date = time.strftime("%H:%M:%S - %d/%m/%y \n")
      outfile.write("Ran {0}".format(date))

  def run(self):
    for i in range(1): # create n threads 
      worker = threading.Thread(target = self._automate)
      worker.daemon = True
      worker.start()
      self.workers.append(worker)
      
    for worker in self.workers:
      worker.join()

if __name__ == '__main__':
  headless = Headless()
  headless.run()