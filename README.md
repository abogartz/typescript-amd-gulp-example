# Typescript AMD Gulp Example
This is a simple demonstration of how to set up Typescript to use RequireJS and Gulp for painless bundling of minified code. It allows you to work using small files and external libraries, without the need for shims and the usual complexity of RequireJS configurations.

#Why did I do this?
I was dealing with a particularly large Typescript project and noticed that my compile times were getting longer and longer. I started to research various other methods of compiling and bundling Typescript, but each one had its own bottlenecks and frustrations. Much of this is due to the particular set of tooling I use, but the workflow outlined here is platform agonistic and should work everywhere.

###**Isn't Browserify with Watchify better than AMD?**
I really like Browserify. I was getting insanely fast compile times using Browserify and a plugin called "[tsify](https://www.npmjs.com/package/tsify)". However, as of this writing, there were some annoying bugs with Browserify.

 - Sourcemaps work, but there are written with a source path of
   ```/source``` instead of the actual path. This makes debugging
   tricky. This isn't a deal breaker, but still annoying.
   
 - When there's an error in Typescript, there's no immediate feedback.  
   Browserify would simply fail. Then I'd have to start and stop the watcher, which is certainly not faster than using AMD.

#Tools required.
* [NodeJS](https://nodejs.org/)
* [Typescript](http://www.typescriptlang.org/)
* [Bower](http://bower.io)
* [Gulp](http://gulpjs.com/)
* [Typescript Definition Manager](https://github.com/DefinitelyTyped/tsd)

#How does it work?
So here's where I landed. One of the main gripes about using RequireJS is the need for shims and keeping an updated config file for `r.js`. However, in Typescript this isn't an issue. You can simply load `require.js` and have Typescript use a declaration file and everything just works. If you use the Typescript Definition Manager, it's even easier. And bundling the code can be done using Gulp. This method requires no configuration file at all and bundles the code in just a few seconds. The only downside to this approach is the need for using `require.js` in your final code and adding its file size, but `require.js` isn't actually that big and if it saves you time that could be spent working, it's well worth it. I'm assuming you know how to write and compile Typescript, but for this to work, you have to set up your IDE to compile the Typescript files using the `--module amd` flag. As an example, do recompile the class "A" included in this repo, run `tsc A.ts --module amd` and you should end up with A.js. If you run `tsc --removeComments --sourcemap A.ts --module amd`  it will generate source maps which work with Phpstorm.

##What about adding in a bunch of vendor files to my index.html file?

The whole point of this process is to avoid having to edit your html file every time you add a new external library. This problem can be solved by bundling all of your vendor files into a single `vendor.js` file. So after you use Bower to load in a library, run `gulp compileVendorJS` to recompile `vendor.js`. Since vendor.js contains require.js, in index.html, we're just loading in vendor.js using the following tag.

    <script src="vendor.js" data-main="main"></script>

The next challenge is to bundle all of this code so that the browser will only need to make a single  HTTP request. This could actually get tricky if you need to separate these out for a multipage site, but for a single page application this will work fine. We need to make the bundled AMD code self-initiate, which can be accomplished with the following Gulp task.

    gulp.task('bundleAMD', function () {
        return gulp.src("html/js/**/*.js")
            .pipe($.amdOptimize('main'))
            .pipe($.concat('amd-bundle.js'))
            **.pipe($.insert.append('require(["main"]);'))**
            .pipe(gulp.dest('./'))
    });
Appending this line at the end causes the app to start. 

##Ok, so what do I do?
Here are the steps you need to follow for this workflow.

 1. Make sure you have all the tools installed.
 2. Clone the repo to any folder and open a terminal window in the root of the project.
 3. Run `npm install`. This will install all of the dependencies.
 4. For any external libraries, install a definition file using TSD. For example, I installed jQuery by running `tsd install jquery && tsd rebundle`
 5. Run `bower install`. This will download requirejs and jquery and place them in a folder called `bower_components`
 6. If you're using Phpstorm, set up a Typescript file watcher and set the arguments field to `--sourcemap $FilePath$ --removeComments --module amd`
 7. To bundle all of your code into a single app.min.js file, run `gulp build`

##Does this solve all my problems?

Of course not. I'm sure Browserify or Webpack will improve very soon and this will all become outdated, but for now, this provides all the features I need in a workflow.
* Fast compile times
* Debugging via Phpstorm
* Gulp task for building final minified file
* Reliable file watchers and instant feedback on compile errors

 

