/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has URL', function() {
            // Loop through each feed in allFeeds array to check for URL
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe(0);
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function() {
            // Loop through each feed in allFeeds to check for a name
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe(0);
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    // Used forum post from Udayan (https://discussions.udacity.com/t/menu-visibility-test/187928/6) with
    // suggestions to use toContain() vs toBe() to avoid failure in the event additional classes are added.
    describe('The menu', function() {
        var menu = document.body;

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden', function() {
            // Check that class is applied to the body of HTML file
            expect(menu.className).toContain('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('unhides/hides when clicked', function() {
            var hamburgerIcon = $('.menu-icon-link');

            // Check that the menu-hidden class is removed when menu icon is first clicked
            hamburgerIcon.click();
            expect(menu.className).not.toContain('menu-hidden');

            // Check that the menu-hidden class is re-applied when menu icon is clicked again
            hamburgerIcon.click();
            expect(menu.className).toContain('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var feed = $('.feed');

        // Test loadFeed function asynchronously using callback
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('loadFeed completes work and returns entry', function(done) {
            expect(feed[0].children.length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feed = $('.feed');
        var oldFeed, newFeed;

        // Test loadFeed function asynchronously using callback
        // Used reviewer feedback described in forum 
        // (https://discussions.udacity.com/t/am-stuck-with-last-spec-please-help/225982)
        // to help understand how to call loadFeed twice for comparison.
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = feed.html();
                loadFeed(1, function() {
                    newFeed = feed.html();
                    done();
                });
            });

        });

        it('new feed loaded', function(done) {
            expect(newFeed).not.toEqual(oldFeed);
            done();
        });
    });
}());