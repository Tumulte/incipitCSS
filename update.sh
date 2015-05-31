#!/bin/bash
function copydata(){
  cp normalize.css/normalize.css ./less
  cp lesshat/build/lesshat.less ./less
  cp html5-test-page/test.html .
  sed -i '/<head>/r head.txt' test.html
  sed -i 's/class="page"/class="container"/' test.html
  sed -i '/<body>/r colors.txt' test.html
  echo "Adding less script and stylesheet to the test page"
}

function update(){
  git submodule init
  git submodule update
  echo 'copying the useful files to the main directory'
  copydata
}


function makecss(){
  echo "make less files into css"
  lessc --clean-css less/incipit.less css/incipit.css
  lessc --clean-css less/normalize.less css/normalize.css

  cp ./demo/all_tags.html ./demo/all_tags_css.html
  sed -i 's/stylesheet\/less/stylesheet/' demo/all_tags_css.html
  sed -i 's/less\//css\//' demo/all_tags_css.html
  sed -i 's/\.less/\.css/' demo/all_tags_css.html
  cp ./demo/responsive_twocols.html ./demo/responsive_twocols_css.html
  sed -i 's/stylesheet\/less/stylesheet/' demo/responsive_twocols_css.html
  sed -i 's/less\//css\//' demo/responsive_twocols_css.html
  sed -i 's/\.less/\.css/' demo/responsive_twocols_css.html

}
while :; do
    case $1 in
        -h|--help)   # Call a "show_help" function to display a synopsis, then exit.
            echo "-h : display this help, -n|--nogit : don't update git repo, -c : make less into css" 
            exit
            ;;
        -n|--nogit)   # Call a "show_help" function to display a synopsis, then exit.
            echo "Skipping update for some reasons"
            exit
            ;;
        -c|--makecss)   # Call a "show_help" function to display a synopsis, then exit.
            makecss
            exit
            ;;
        -d|--copydata)   # Call a "show_help" function to display a synopsis, then exit.
            copydata
            exit
            ;;
        *)               # Default case: If no more options then break out of the loop.
            update
            exit
            ;;
    esac

    shift
done
