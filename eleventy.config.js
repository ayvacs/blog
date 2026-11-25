/**
 * Eleventy (@11ty/eleventy v2) configuration file.
 */
module.exports = function (eleventyConfig) {
    // Copy everything in `public/` directly to the root of `dist/` without processing.
    eleventyConfig.addPassthroughCopy({ public: "/" });

    // Custom "post" collection: gathers all content tagged `post` and sorts newest-first.
    eleventyConfig.addCollection("post", (collectionApi) => {
        return collectionApi
            .getFilteredByTag("post")
            .sort((a, b) => b.date - a.date);
    });

    // Formats a date as "YYYY-MM-DD" (e.g. "2026-11-25") for compact post listings.
    eleventyConfig.addFilter("readableDate", (dateString) => {
        const d = new Date(dateString);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    });

    // Formats a date as "Mon D, YYYY" (e.g. "Nov 25, 2026") for article headers.
    eleventyConfig.addFilter("sentenceDate", (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    });

    // Extracts the 4-digit year string (e.g. "2026") for copyright notices.
    eleventyConfig.addFilter("year", (dateString) => {
        return String(new Date(dateString).getFullYear());
    });

    // Directory and URL configuration for Eleventy's build.
    return {
        pathPrefix: "/",                // Output directory inside of dist/ for html files to be generated
        dir: {
            input: "docs",              // Source templates and markdown content
            includes: "../includes",    // Layouts/partials, resolved relative to `input`
            output: "dist",             // Generated static site output
        },
    };
};