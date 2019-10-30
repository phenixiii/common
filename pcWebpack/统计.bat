svn log -v --xml -r {2019-07-11}:{2019-10-30} > svn.log
java -jar statsvn.jar svn.log ./ -charset gbk -output-dir ./report