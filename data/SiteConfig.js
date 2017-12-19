module.exports = {
	siteTitle: "Enact", // Site title.
	siteTitleAlt: "Javascript Framework Docs", // Alternative site title for SEO.
	siteLogo: "/logos/enact.svg", // Logo used for SEO and manifest.
	siteUrl: "https://enact.com", // Domain of your website without pathPrefix.
	pathPrefix: "/", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
	siteDescription: "Documentation and Tutorials for Enact.", // Website description used for RSS feeds/meta description tag.
	siteRss: "/rss.xml", // Path to the RSS file.
	siteFBAppID: "", // FB Application ID for using app insights
	googleAnalyticsID: "", // GA tracking ID.
	disqusShortname: "", // Disqus shortname.
	postDefaultCategoryID: "Tech", // Default category for posts.
	userName: "reactjs", // Username to display in the author segment.
	userTwitter: "reactjs", // Optionally renders "Follow Me" in the UserInfo segment.
	userLocation: "Santa Clara, CA", // User location to display in the author segment.
	userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
	userDescription: "", // User description to display in the author segment.
	// Links to social profiles/projects you want to display in the author segment/navigation bar.
	userLinks: [
		{
			label: "GitHub",
			url: "https://github.com/enjoyjs",
			iconClassName: "fa fa-github"
		},
		{
			label: "Twitter",
			url: "https://twitter.com/enjoyjs",
			iconClassName: "fa fa-twitter"
		},
		{
			label: "Email",
			url: "mailto:enact@lge.com",
			iconClassName: "fa fa-envelope"
		},
	],
	copyright: "Copyright © 2018. LG Electronics", // Copyright string for the footer of the website and RSS feed.
	themeColor: "#1b5271", // Used for setting manifest and progress theme colors.
	backgroundColor: "#e0e0e0", // Used for setting manifest background color.
	// TODO: Move this literally anywhere better.
	toCChapters: ["Chapter 1", "Chapter 2"], // Used to generate the Table Of Contents for lessons
	toDocChapters: ["developer-guide", "developer-tools"] // Used to generate the Table Of Contents for docs
};
