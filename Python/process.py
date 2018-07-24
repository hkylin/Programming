import os
import sys
import datetime
import re
import struct
import warnings
import psutil
from pprint import pprint as pp

psutil.cpu_times()

for x in range(3):
    psutil.cpu_percent(interval=1)

for x in range(5):
    (psutil.cpu_percent(interval=1, percpu=True))

p = psutil.pids()
process = []
for pr in p:
    process.append(psutil.Process(pr).name)
process
psutil.test()

for proc in psutil.process_iter(attrs=['pid', 'name']):
    print(proc.info)
psutil.boot_time()
psutil.ABOVE_NORMAL_PRIORITY_CLASS
psutil.cpu_count()
psutil.cpu_freq()
psutil.disk_partitions()
psutil.disk_usage('c:\\').free
format(psutil.disk_usage('c:\\').total)
list(psutil.win_service_iter())
psutil.users()


def find_procs_by_name(name):
    "Return a list of processes matching 'name'."
    ls = []
    for p in psutil.process_iter(attrs=['name']):
        if p.info['name'] == name:
            ls.append(p)
    return ls


find_procs_by_name("notepad.exe")
