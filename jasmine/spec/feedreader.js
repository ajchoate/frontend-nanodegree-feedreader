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

        // Loop through each feed in allFeeds array to check for URL
        it('has URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);
            })
        });

        // Loop through each feed in allFeeds to check for a name
        it('has name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe(0);
            })
        });
    });

    // Used forum post from Udayan (https://discussions.udacity.com/t/menu-visibility-test/187928/6) with
    // suggestions to use toContain() vs toBe() to avoid failure in the event additional classes are added.
    describe('The menu', function() {
        var menu = $('body');

        // Test to check that the menu element is hidden
        it('is hidden', function() {
            // Check that class is applied to the body of HTML file
            expect(menu.hasClass('menu-hidden')).toBeTruthy();
        });

        // Test that the menu element toggles between visible and
        // hidden when the hamburger icon button is clicked
        it('unhides/hides when clicked', function() {
            var hamburgerIcon = $('.menu-icon-link');

            // Check that the menu-hidden class is removed when menu icon is first clicked
            hamburgerIcon.click();
            expect(menu.hasClass('menu-hidden')).toBeFalsy();

            // Check that the menu-hidden class is re-applied when menu icon is clicked again
            hamburgerIcon.click();
            expect(menu.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        // Test loadFeed function asynchronously using callback
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // Test that the .feed container contains at least one .entry
        // element once the loadFeed function completes its work
        it('loadFeed completes work and returns entry', function(done) {
            var feedEntries = $('.feed .entry');
            expect(feedEntries.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
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

        // Test that when a new loadFeed is called, the content actually changes.
        it('new feed loaded', function(done) {
            expect(newFeed).not.toEqual(oldFeed);
            done();
        });
    });
}());