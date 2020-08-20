!#/bin/bash
ps aux | grep postcss | awk '{print $2}' | xargs kill -9 > /dev/null 2>&1 && exit 0
