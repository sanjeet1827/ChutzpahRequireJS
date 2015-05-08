FIXED with 3.0
   - Added Chutzpah.json with right settings for typescript and amd test running
   - Added reference path for non test files so they chutzpah compiles them
   - Swapped out versions of require.js (and d.ts) 
   - Updated version of qunit.d.ts and require.d.ts








------------------------------------------------------------------------------------------------
No tests found when using require.js, jquery, and underscore
description

I have a situation where Chutzpah is completing with no tests executed, even though there are tests present. There is no error message, it just says zero tests found. I have distilled the situation down to the barest elements necessary for reproduction. 

I am using require.js for module management, and have tests in a module which requires both jquery and underscore, which are used for convenience in the real tests. I use a shim for underscore, since it is not an AMD module. 

When both dependencies are present in the test module definition, Chutzpah finds no tests. If I comment out either one of the two dependencies, it does find the tests in the module. I have reference directives in the test module as well, but their presence or absence seems to have no effect. The file structure of the project is completely flat at present, for simplicity's sake, but putting the 3rd party libraries in a sub-folder and adding path directives has had no effect either. 

Attached are the test harness, the test module, and a screenshot showing the file structure.
file attachments

Chutzpah Bug.zip [x]
ChutzpahRequireJS.zip [x]
comments

cammerman wrote Feb 12 at 8:06 AM [x]

Apologies, I just scanned the discussions page and found a thread I missed last night. I think this explains my problems:

http://chutzpah.codeplex.com/discussions/404618

Replacing require.js with the older version doesn't seem to help (though maybe I didn't go back far enough). But taking the tests out of a module, making them all async, and then calling require() inside the tests seems to have made everything discoverable.
mmanela wrote Feb 17 at 12:30 PM [x]

Yea, the new version of require.js makes it a bit inconvenient. Is it cool if I close this issue?
saguiar wrote Feb 22 at 9:11 AM [x]

I had the same issue and followed the same path.

In my case, I wrote the tests with typescript using AMD modules, so I had to replace 'import ...' with requires inside the tests, which I have to say it's a bit uglier.

I was able to run the tests using 'import....' without issues from a QUnit web page directly, since they are run once the imports are resolved, but I didn´t have luck with Chutzpah.

I also needed using my require.JS config file for declared shims, so I needed additional wrapping to make it work with Chutzpah. 

I don´t know the internals at all, but would it be possible to drive the test discovery/running using an already working QUnit HTML file that imports the tests or the like? I suppose that the tests are included asynchronously when using require.JS complicate things a little though.
mmanela wrote Feb 22 at 10:07 AM [x]

Chutzpah already supports running a HTML harness directly. In that case Chutzpah will just run that file and not do anything fancy.
saguiar wrote Feb 22 at 12:51 PM [x]

I tried using the HTML which includes the tests that I run manually, both with chutzpah.console and from VS, but it didn´t seem to find the tests.

The HTML includes the .js which then includes the tests themselves through require.JS, using a require.JS config file for shims. I'm guessing that since the tests are not directly included in the HTML, nor accessible immediately through referenced scripts, Chutzpah might not be able to find them? Or I might be messing up ;).
Example

tests.html:
<script data-main="tests/testsuite" type="text/javascript" src="lib/require.js"></script>          
tests/testsuite.ts:
/// <reference path="../definitions/require.d.ts" />
require(['require', '../require.config'], function(require) {            
    require([
        "tests/unit/test_adapters.js",
        "tests/screens/test_flix.js",
         // etc....
    ]);             
});
tests/unit/test_adapters.ts:
import adapters = module('adapters');
QUnit.module('adapters');
test("adpters is declared", function() {
    ok(adapters !== undefined);
});
I can build an example project and send it if you want. Thanks!
mmanela wrote Feb 23 at 9:44 AM [x]

Yes, please upload a sample project and I will investigate 
mmanela wrote Mar 1 at 7:52 AM [x]

I looked into this here are my results.

If you run the .html directly it works. In the sample you attached it was missing the underscore.js file but when I added it Chutzpah could run the .html fine.

If you run the .js it doesn't for a couple reasons
You must switch define( to require(
You must reference require.js
Chutzpah has no no way to define shims
Overall, Chutzpah needs to have a better solution for using require.js directly from a JS file but it does work fine from HTML.

Let me know what you think.
saguiar wrote Mar 15 at 7:05 AM [x]

I'm attaching a project that shows how I'm trying to use requireJS + qunit with TypeScript. This is the natural way I found to organize the project, but maybe there's a better one. I apologize for the delay in submitting this.

Contradicting my previous finding, Chutzpah does find the test, but it fails to resolve the imported module when the test is executed (maybe it doesn't wait for require JS to finish loading the module before executing the test?). However, the tests.html page works OK. 

For my actual project, I ended up jumping through some hoops and adding helper methods to perform the require explicitly inside the test body, but, besides being a little more cumbersome to use, it doesn't benefit from intellisense & type checking that I gain by using the TS import module syntax. 

I hope the sample can help to find a way to integrate TS with AMD and chutzpah better. 

Thanks for the amazing support!!