##Active links y'all

The first version of the menu in the riaguild was set up with a ul-list with \<Link\>s and \<IndexLink\>s and React was working behind the scene setting the right active class on the a tags in the menu. When we implemented react bootstrap in the project I took the liberty to change the menu to use the menu in bootstrap which resulted in [this pull request.](https://github.com/krawaller/riaguild2015/pull/100/files). MoombaDS then implemented react-router-bootstrap resulting in [this pull request](https://github.com/krawaller/riaguild2015/pull/118/files) which handled the active start for us.

I would have gone with version 1 as far as possible. But since I'm diagnosed with the illness damnbadatdesign as far as possible would have been until I added a css framework. Which would probably be in the second commit or so. 

The reason to why I would have chosen no 1 is because it's the easiest one. It checks what link is active for you and it's built in so the risk of it breaking in the next React version is pretty small. 

I'd say version 2 and 3 is more or less the same except that version 3 is in it's own framework. Since I was upgrading AngularJS at work from version 1.2.something to 1.4.7 last week I have a rather pessimistic view on frameworks right now. Things break! The get outdated and people stop caring for them. It doesn't help if the framework hasn't been updated after every new release. Rant, rant, rant. So I'd say 2 comes before 3. 

Unless! 
- The feature was very special and hard/long to do and the framework contained more functionality I needed
- There's a great community around it that you can see is active 
- It's a school work where learning is the important part.

01000111 01101111 01101111 01100100 00100000 01101110 01101001 01100111 01101000 01110100

#### Comments

[David](http://blog.krawaller.se/riaguild2015/#/member/krawaller): Oh, going to bed was a huge mistake, Elin - your tireddrunkedness was evidently at a perfect [Ballmer Peak level](https://xkcd.com/323/) and you would have written something *truly great* had you continued. Now you'll spend the rest of your life fruitlessly trying to calibrate yourself to find the peak again...
