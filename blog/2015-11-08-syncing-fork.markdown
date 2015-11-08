##How do I sync my fork with the riaguild2015?

Some problems you might run into is written in the end of the post so make sure you read that part of the post before trying it out.

###This is how you do it
cd to your forked project in the terminal. The first thing you need to do is to set up a remote for your fork. Follow [these instructions](https://help.github.com/articles/configuring-a-remote-for-a-fork/)

Then continue with the instructions [here](https://help.github.com/articles/syncing-a-fork/). 

###Some problems you might run into
Maybe you'll get an error saying that you have [no master branch](http://stackoverflow.com/questions/3623755/why-does-my-git-branch-have-no-master) to merge to. Fear not, just do a 

    git checkout -b master
    
if you want to use a master branch

or

    git checkout gh-pages

if you want to use the gh-pages all the time. Which you might as well do.


The instructions will tell you to run
    
    git merge upstream/master

but you should use 

    git merge upstream/gh-pages

since David is using the gh-pages branch and doesn't have a master branch in the project.

##Word of caution
We're many people working on the project which means there'll be a lot of pull request which results in the repo changing a lot. Remember to sync your fork before making a pull request. I forgot and it ended up in a merge conflict since people had made new pull requests between the time me forking the repo and me creating a pull request to the repo.
    