index=./src/index.html
rootIndex=./index.html
html=./src/html
rm ${index}
cp ${html}/skeletonDev.html ${index}
TimeNano=$(date +%s%N)
rm ${html}/scripts.html
echo >> ${html}/scripts.html
# jsFiles=$(find ./js/ -name '*.js')
cd src
js_files=$(find js -name '*.js')
js_files=$(echo $js_files | xargs -n1 | sort | xargs)
# for f in $(find js -name '*.js');
# do
#   echo $f
# done
# echo $js_files
for f in $js_files;
do
  timeStamp=$(date -r $f "+%m-%d-%Y %H:%M:%S")
  echo "<script src='./$f?$timeStamp'></script>" >> html/scripts.html
done
cd ..

sed -i -e '/$head/r src/html/head.html' ${index}
sed -i -e '/$body/r src/html/body.html' ${index}
sed -i -e '/$scripts/r src/html/scripts.html' ${index}
sed -i -e "s/\$name/$(cat src/html/title.txt)/g" ${index}

rm ${index}-e

cp ${index} ${rootIndex}
sed -i -e 's~\./~\./src/~g' ${rootIndex}
# sed -i -e 's~DEV = true~DEV = false~g' ${rootIndex}
rm ${rootIndex}-e
