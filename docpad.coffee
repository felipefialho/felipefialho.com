# The DocPad Configuration File
# It is simply a CoffeeScript Object which is parsed by CSON
docpadConfig = {

	# =================================
	# Template Data
	# These are variables that will be accessible via our templates
	# To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ

	templateData:

		# Specify some site properties
		site:
			# The production url of our website
			url: "http://wwww.felipefialho.com"

			# The default title of our website
			title: "Luiz Felipe Tartarotti Fialho"

			# The website description (for SEO)
			description: """
				Blog pessoal, com dicas do mercado Front-End, tutoriais e projetos na qual participei.
				"""

			# The website keywords (for SEO) separated by commas
			keywords: """
				blog, front end, developer, desenvolvedor, tableless, css, html, jquery
				"""

			# The website's styles
			styles: [
				'/css/style.css'
			]

			# The website's scripts
			scriptsTop: [
				'/scripts/plugin/modernizr-2.6.2.min.js'
			]

			scripts: [
				#'/scripts/plugin/jquery/jquery.js'
				#'/scripts/plugin/bootstrap/bootstrap.min.js'
				#'/scripts/plugin/jquery-plugins/jquery.placeholder.min.js'
				'/scripts/all.min.js'

				'/scripts/site/_general.js'
			]

			# Write After
			# Used to minify our assets with grunt
			writeAfter: (opts,next) ->
			    # Prepare
			    balUtil = require('bal-util')
			    docpad = @docpad
			    rootPath = docpad.config.rootPath

			    # Perform the grunt `min` task
			    # https://github.com/gruntjs/grunt/blob/0.3-stable/docs/task_min.md
			    command = ["#{rootPath}/node_modules/.bin/grunt", 'min']

			    # Execute
			    balUtil.spawn(command, {cwd:rootPath,output:true}, next)

			    # Chain
			    @

		# -----------------------------
		# Collection
		    collections:
		        pages: ->
		            @getCollection("html").findAllLive({isPage:true})
		
		# Active sections on the website
		# to deactivate comment out with '#'
		# you can also change order here and it will reflect on page
		sections: [
		  'blog'
		  'projetos'
		]

		# Labels which you can translate to other languages
		labels:
		  blog: "Blog"
		  projetos: "Projetos"
		            
		# -----------------------------
		# Helper Functions

		# Get the prepared site/document title
		# Often we would like to specify particular formatting to our page's title
		# we can apply that formatting here
		getPreparedTitle: ->
			# if we have a document title, then we should use that and suffix the site's title onto it
			if @document.title
				"#{@document.title} | #{@site.title}"
			# if our document does not have it's own title, then we should just use the site's title
			else
				@site.title

		# Get the prepared site/document description
		getPreparedDescription: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description or @site.description

		# Get the prepared site/document keywords
		getPreparedKeywords: ->
			# Merge the document keywords with the site keywords
			@site.keywords.concat(@document.keywords or []).join(', ')


		# Get the prepared relative file
		getRelativeFile: ->
			# if we have a relative file 
			if @document.path
				"#{@document.path}"
			# if our relative file does not have 
			else
				""

	# =================================
	# DocPad Events

	# Here we can define handlers for events that DocPad fires
	# You can find a full listing of events on the DocPad Wiki
	events:

		# Server Extend
		# Used to add our own custom routes to the server before the docpad routes are added
		serverExtend: (opts) ->
			# Extract the server from the options
			{server} = opts
			docpad = @docpad

			# As we are now running in an event,
			# ensure we are using the latest copy of the docpad configuraiton
			# and fetch our urls from it
			latestConfig = docpad.getConfig()
			oldUrls = latestConfig.templateData.site.oldUrls or []
			newUrl = latestConfig.templateData.site.url

			# Redirect any requests accessing one of our sites oldUrls to the new site url
			server.use (req,res,next) ->
				if req.headers.host in oldUrls
					res.redirect(newUrl+req.url, 301)
				else
					next()
}

# Export our DocPad Configuration
module.exports = docpadConfig