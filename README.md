#What is it for ?

CooUse is a minimalistic and (soon) exhaustive basic stylesheet. It gives you a clean an structured visual aspect 
*based on typography rules* for all HTML5 elements.

Every elements are already designed to arrange themselves properly and to be easily readable. All you have to add is
your own fancy stuffs to make your website pretty 

#What's the concept ?

It all starts with the text (cause that's what matters most of the time).

A slightly larger than usual test-size (20px instead of 16px) with a slightly bigger line-height (32px) gives 
a smooth reading experience for most people.

The text will structure your page with 32px tall lines. Therefore, using this distance as a basic unit will give your
user the sensation your page is balanced and clean... In one word architectured.

This stylesheet makes sure that every element uses this unit for its margin, padding.... Your page will be automatically 
structured around a 32x32 grid.

[Demo Page](http://tumulte.me/css/test.html)

[Demo Responsive](https://cdn.rawgit.com/Tumulte/CooUse/master/test_twocols_css.html)

## Color scheme generator

In addition, you'll have a LESS built-in color scheme generator that'll generate a pretty 6 tones scheme out of your main color.

No javascript or manipulations required : it gives you LESS variables you can directly use in your LESS stylesheets.

Available options : 
* light variations
*  saturation variations
*  opposite colors
*  analogous colors

##Clean forms

The form elements had a bit extra work cause forms are too critical (and tedious) to be left ugly.
Here you got a bold and clear design withh full html5 attribute support

##Cross browser

Thanks to normalize.css and font-faces, your website should look exactly the same, no matter to browser

##Customizable

You can change the base unit with only one variable. Same with the color or the text size.


##Accessibility ready 

The mesurement unit is EM to allow text magnifiers to work properly. Plus, there's classes to hide elements without messing up 
screen readers


##Extra classes for sommon problems

Bullet less lists, text-align, float....  There's things we need all the time, don't duplicate, keep your code small, those classes
are for you




#INSTALL

    git clone https://github.com/Tumulte/CooUse.git


    ./update.sh 



#TODO

* order the main stylesheet
* Accessibility checkup
* Cross-browser extensive checkup
* Other OS updating scripts



