echo "Inside index.sh file"
cd a
source a.sh
cd ..
cd b
source b.sh
cd ..
cd a/c
source c.sh
