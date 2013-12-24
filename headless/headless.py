#!python2.7
import subprocess, json, threading, sys, random, time, os, math
import time
from Queue import Queue, Empty

dir_path = os.path.dirname(os.path.abspath(__file__))
phantom = 'phantomjs'
target = os.path.join(dir_path, 'headless.js')
queue = Queue()
estimate = []

if not (len(sys.argv) >= 3):
  sys.exit("missing accounts file or worker amount!")

# load & parse an accounts file 
try:
  worker_amount = int(sys.argv[2])
  logins = json.load(open(os.path.join(dir_path, sys.argv[1])))
except Exception, e:
  sys.exit(e)

# shuffle the list to obscure our intentions
random.shuffle(logins)

# put the logins in the queue.
for l in logins:
  if l['EmailAddress'] and l['Password']:
    queue.put(l) 

def commander(cmd, flags, target, targetflags):
  flags = ' '.join(flags)
  targetflags = ' '.join(targetflags)
  return ' '.join([cmd, flags, target, targetflags])

def automate():
  while not queue.empty():
    login = queue.get() # pop the queue
    start_time = time.time() # time the session
    timeout = random.randint(15,30)
    name = threading.current_thread().name

    command = commander(phantom, [], target, [login['EmailAddress'],login['Password']])
    process = subprocess.Popen(command, shell = True)
    process.wait() # wait for the proccess to finish
    
    # calculate an estimate for the time left
    estimate.append( (time.time() - start_time) + timeout)
    estimated_average = round((sum(estimate) / len(estimate)) * queue.qsize())
    mins = int(math.floor(estimated_average / 60))
    secs = int(estimated_average - mins * 60)
    print "{0} accounts left ..".format(queue.qsize())
    print "estimated time left: {0}.{1}min ..".format(mins,secs); 

    # create a timeout before continuing
    print name + " waiting {0}s ..".format(timeout)
    time.sleep(timeout)

print "# Eovendo Automate #"

workers = []
for i in range(worker_amount): # create n threads 
  worker = threading.Thread(target = automate)
  worker.daemon = True
  worker.start()
  workers.append(worker)
  
for worker in workers:
  worker.join()

# write to events.txt when the script successfully executed. 
with open(os.path.join(dir_path, 'logs/events.txt'), 'a') as outfile:
  date = time.strftime("%H:%M:%S - %d/%m/%y \n")
  outfile.write("Ran {0}".format(date))

