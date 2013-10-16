# The DocPad Configuration File

cheerio = require('cheerio')

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
			url: "http://www.felipefialho.com"

			# The default title of our website
			title: "Luiz Felipe Tartarotti Fialho"

			# The default author of our website
			author: "Luiz Felipe Tartarotti Fialho"

			# The default title of our website
			email: "luizfelipe.tf.13@gmail.com"

			# The website description (for SEO)
			description: """
				Site pessoal focado em Desenvolvedores Front-End, com dicas do mercado web, tutoriais e projetos na qual participei.
				"""

			# The website description (for SEO) - English
			description_en: """
				Personal Website with focused in Web Development, Front-End Enginner and personal projects.
				"""
 
			# The website's styles
			styles: [ 
				'/assets/css/style.css'
			]

			# The website's scripts
			scriptsTop: [
				'/assets/js/modernizr-2.6.2.min.js'
			]

			scripts: [ 
				'/assets/js/scripts.min.js'
			]

			# Write After 
			writeAfter: (opts,next) -> 
   
		# -----------------------------   
		# Active sections on the website
		# to deactivate comment out with '#'
		# you can also change order here and it will reflect on page
		sections: [
		  'blog'
		  'projetos'
		  'portfolio'
		]
		sectionsEn: [ 
		  'projects'
		  'portfolio'
		]

		# Labels which you can translate to other languages
		labels:
		  blog: "Blog"
		  projetos: "Projetos"
		  portfolio: "Portfolio"

		labelsEn:
		  projects: "Projects"
		  portfolio: "Portfolio"
		
		# Blog posts
		posts: [
		  name: 'Tutorial - Tabela Responsiva'
		  description: 'Em layouts responsivos, um dos componentes que sempre me incomodava eram as tabelas. Acredito que isso também ocorra com outros desenvolvedores....'
		  date: '14/10/2013'
		  year: '2013'
		  path: 'tutorial-tabela-responsiva'
		,  
		  name: 'Tutorial - Botão de Progresso'
		  description: 'Vou mostrar mais um tutorial simples... o desenvolvimento de um botão de progresso, que pode fornecer um feedback importante para o usuário.'
		  date: '02/10/2013'
		  year: '2013'
		  path: 'tutorial-botao-de-progresso'
		,  
		  name: 'Tutorial - Caixa de compartilhar em Puro CSS'
		  description: 'Nunca escrevi um tutorial em CSS por aqui, e começo mostrando como desenvolvi uma caixa de compartilhamento que pode ser bastante útil.'
		  date: '17/09/2013'
		  year: '2013'
		  path: 'tutorial-caixa-de-compartilhar-em-puro-css'
		,  
		  name: 'O grupo Grunt Brasil no Facebook'
		  description: 'Estar em um grupo para discutir assuntos de interesse mútuo é sempre muito legal e contribui MUITO para o desenvolvimento, por essa razão o grupo Grunt Brasil no Facebook foi criado.'
		  date: '12/08/2013'
		  year: '2013'
		  path: 'o-grupo-grunt-brasil-no-facebook'
		,  
		  name: 'Um conto sobre componentização e quebra de paradigmas'
		  description: 'Melhorar processos é parte essencial do nosso trabalho, mas em algum momento percebemos que só melhorar pode não ser o suficiente, as vezes é preciso quebrar paradigmas.'
		  date: '29/07/2013'
		  year: '2013'
		  path: 'um-conto-sobre-componentizacao-e-quebra-de-paradigmas'
		,  
		  name: 'Dica: Tire férias'
		  description: 'Os amigos que me acompanham devem ter observado que sumi de repente. E tenho um motivo bem nobre para isso: Estava de férias.'
		  date: '25/07/2013'
		  year: '2013'
		  path: 'dica-tire-ferias'
		,  
		  name: 'Sobre organização de componentes com pré-processadores'
		  description: 'No último post dei uma passada pelo Grunt e mostrei como ele pode ajudar a otimizar suas tarefas. Se você usa pré-processadores a organização dos componentes é essencial.'
		  date: '18/06/2013'
		  year: '2013'
		  path: 'sobre-organizacao-de-componentes-com-pre-processadores'
		,  
		  name: 'Otimize suas tarefas com o Grunt!'
		  description: 'Pense nas atividades que você faz (ou deveria fazer) no momento que vai colocar o projeto em produção. Provavelmente você minifica e concatena o CSS e o javascript. Talvez também minifique o HTML e otimiza as imagens...'
		  date: '04/06/2013'
		  year: '2013'
		  path: 'grunt-voce-deveria-estar-usando'
		,  
		  name: 'Primeiros passos com o Docpad'
		  description: 'No último post dei uma breve explicação sobre geradores estáticos. Algumas pessoas me pediram para fazer um tutorial básico do Docpad.'
		  date: '21/05/2013'
		  year: '2013'
		  path: 'primeiros-passos-com-o-docpad'
		,  
		  name: 'Geradores estáticos - Breve explicação'
		  description: 'Quando escutamos falar em geradores estáticos pela primeira vez normalmente não compreendemos qual vantagem eles poderiam ter em relação a sistemas como o Wordpress.'
		  date: '06/05/2013'
		  year: '2013'
		  path: 'geradores-estaticos-breve-explicacao'
		,  
		  name: 'O que um bom desenvolvedor Front-End precisa saber?'
		  description: 'Não tive formação como programador, sempre fui focado no HTML e CSS, apesar de claro, saber fazer integração e trabalhar no ambiente Back-End, além de me virar com JQuery.'
		  date: '29/04/2013'
		  year: '2013'
		  path: 'o-que-um-bom-desenvolvedor-front-end-precisa-saber'
		,  
		  name: 'Desenvolvedores Front-End que você deveria acompanhar'
		  description: 'Em 2009, quando iniciei na carreira de desenvolvedor, a profissão não tinha nem nome, era o "menino do HTML" ou "o rapaz que corta o layout".'
		  date: '26/04/2013'
		  year: '2013'
		  path: 'desenvolvedores-front-end-que-voce-deveria-acompanhar'
		]

		# Projetos list 
		projetos: [
		  # Table Responsive
		  name: "Table Responsive - Action"
		  thumb: "/assets/img/projetos/table-action.jpg"
		  participation: "Exemplo de 'Tabela Responsiva' para modelo com ações"
		  participationEn: "Other example of 'Table Responsive'. This example, is indicated for tables that require actions."
		  link: "http://codepen.io/LFeh/pen/beEoG"   
		,
		  # Table Action
		  name: "Table Responsive"
		  thumb: "/assets/img/projetos/table-responsive.jpg"
		  participation: "Exemplo de 'Tabela Responsiva'"
		  participationEn: "Example of 'Table Responsive' for better adjust in small sizes."
		  link: "http://codepen.io/LFeh/pen/hsreD"   
		,
		  # Progress
		  name: "Button Progress"
		  thumb: "/assets/img/projetos/button-progress.jpg"
		  participation: "'Botão de Progresso' usando CSS Animate"
		  participationEn: "Button Progress in CSS Animate"
		  link: "http://codepen.io/LFeh/pen/KviDw"   
		,
		  # Social Media CSS3
		  name: "Pure CSS3 - Social Media"
		  thumb: "/assets/img/projetos/social-media-css3.jpg"
		  participation: "Caixa de redes sociais com animações em CSS3"
		  participationEn: "Elegant box of 'Social Networks' animated using only CSS"
		  link: "http://codepen.io/LFeh/details/IvmJD"   
		,
		  # Grunt base
		  name: "Grunt Base"
		  thumb: "/assets/img/projetos/grunt-base.jpg"
		  participation: "Projeto com configurações básica para rodar o Grunt."
		  participationEn: "My Grunt Boilerplate"
		  link: "https://github.com/LFeh/Grunt-Base"   
		,
		  # Nav in CSS3
		  name: "Pure CSS3 - Navigation"
		  thumb: "/assets/img/projetos/nav-css3.jpg"
		  participation: "Sub-Navegação usando apenas CSS."
		  participationEn: "Navigation in pure CSS3, contains submenu and delay using only CSS."
		  link: "https://github.com/LFeh/NavPureCSS3"   
		  demo: "http://codepen.io/LFeh/pen/BLpcG"    
		,
		  # Cartman
		  name: "Pure CSS3 - Eric Cartman"
		  thumb: "/assets/img/projetos/cartman-css3.jpg"
		  participation: "Protótipo de Eric Cartman totalmente desenvolvido em CSS3. Fiz para estudos, mas curti o resultado final."
		  participationEn: "Eric Cartman in Pure CSS3 (with animation)."
		  link: "http://codepen.io/LFeh/pen/qzDCJ"   
		  demo: "https://developer.mozilla.org/pt-BR/demos/detail/pure-css3-eric-cartman"    
		,     
		  # Website
		  name: "LFeh Website"
		  thumb: "/assets/img/projetos/blog.jpg"
		  participation: "O site que está navegando nesse instante :p. Código aberto no Github."
		  participationEn: "This Website."
		  link: "https://github.com/LFeh/Website"  
		] 
		
		# Portfolio list 
		portfolio: [
		  # Trend-i
		  name: "Trend-i"
		  idName: "trendi"
		  thumb: "/assets/img/portfolio/site-trendi-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-trendi.jpg"
		  participation: "Desenvolvimento do HTML, CSS e Javascript."
		  participationEn: "Development of HTML, CSS and Javascript."
		  link: "http://www.trendi.com.br/"
		,  
		  # Max In Time
		  name: "Max in Time"
		  idName: "max-in-time"
		  thumb: "/assets/img/portfolio/site-max-in-time-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-max-in-time.jpg"
		  participation: "Desenvolvimento do HTML, CSS e Javascript."
		  participationEn: "Development of HTML, CSS and Javascript."
		  link: "http://www.maxintime.net.br/"
		,  
		  # BTG
		  name: "BTG Pactual"
		  idName: "btg"
		  thumb: "/assets/img/portfolio/site-btg-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-btg.jpg"
		  participation: "Desenvolvimento do HTML, CSS e Javascript."
		  participationEn: "Development of HTML, CSS and Javascript."
		  link: "https://www.btgpactual.com/home/home.aspx"
		,  
		  # Prime Jardim Europa
		  name: "Prime Jardim Europa"
		  idName: "prime-jardim"
		  thumb: "/assets/img/portfolio/site-norcon-rossi-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-prime-jardim.jpg"
		  participation: "Desenvolvimento do HTML, CSS e Javascript."
		  participationEn: "Development of HTML, CSS and Javascript."
		  link: "http://www.primejardimeuropa.com.br/"
		,  
		  # Carrefour - Escolha Premiada
		  name: "Escolha Premiada"
		  idName: "carrefour-escolha"
		  thumb: "/assets/img/portfolio/site-carrefour-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-escolha-premiada.jpg"
		  participation: "Desenvolvimento do HTML, CSS e Javascript."
		  participationEn: "Development of HTML, CSS and Javascript."
		  link: "http://www.escolhacartaocarrefour.com.br/"
		,  
		  # Decathlon - Clube
		  name: "Clube Decathlon"
		  idName: "decathlon-clube"
		  thumb: "/assets/img/portfolio/site-decathlon-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-decathlon-clube.jpg"
		  participation: "Desenvolvimento do HTML e CSS."
		  participationEn: "Development of HTML and CSS"
		,  
		  # Nutra e Viva
		  name: "Nutra e Viva"
		  idName: "nutra-viva"
		  thumb: "/assets/img/portfolio/site-nutra-viva-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-nutra-viva.jpg"
		  participation: "Desenvolvimento do HTML e CSS."
		  participationEn: "Development of HTML and CSS"
		  link: "http://www.nutraeviva.com.br/Site/"
		,  
		  # Fundação Estudar
		  name: "Fundação Estudar"
		  idName: "fundacao-estudar"
		  thumb: "/assets/img/portfolio/site-fundacao-estudar-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-fundacao-estudar.jpg"
		  participation: "Desenvolvimento do HTML e CSS. Participação no Javascript."
		  participationEn: "Development of HTML, CSS and participation in Javascript."
		  link: "http://www.estudar.org.br/"
		,  
		  # Decathlon - Esportes
		  name: "Decathlon - Esportes"
		  idName: "decathlon-esportes"
		  thumb: "/assets/img/portfolio/site-decathlon-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-decathlon-esportes.jpg"
		  participation: "Desenvolvimento do HTML e CSS."
		  participationEn: "Development of HTML and CSS"
		,  
		  # Decathlon - Montanha
		  name: "Decathlon - Montanha"
		  idName: "decathlon-montanha"
		  thumb: "/assets/img/portfolio/site-decathlon-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-decathlon-montanha.jpg"
		  participation: "Desenvolvimento do HTML e CSS."
		  participationEn: "Development of HTML and CSS"
		,   
		  # Carrefour - Compra Premiada
		  name: "Compra Premiada"
		  idName: "carrefour-compra"
		  thumb: "/assets/img/portfolio/site-carrefour-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-carrefour-compra.jpg"
		  participation: "Desenvolvimento do HTML e CSS."
		  participationEn: "Development of HTML and CSS"
		  link: "http://www.carrefoursolucoes.com.br/50mil/"
		,  
		  # Decathlon - Camping
		  name: "Decathlon - Camping"
		  idName: "decathlon-camping"
		  thumb: "/assets/img/portfolio/site-decathlon-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-decathlon-camping.jpg"
		  participation: "Desenvolvimento do HTML e CSS."
		  participationEn: "Development of HTML and CSS"
		,  
		  # Prontocomprei
		  name: "Prontocomprei"
		  idName: "prontocomprei"
		  thumb: "/assets/img/portfolio/site-pronto-comprei-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-pronto-comprei.jpg"
		  participation: "Desenvolvimento do HTML e CSS."
		  participationEn: "Development of HTML and CSS"
		,  
		  # Sensation
		  name: "Skol Sensation"
		  idName: "sensation"
		  thumb: "/assets/img/portfolio/site-skol-sensation-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-skol-sensation.jpg"
		  participation: "Desenvolvimento do HTML e CSS. Participação no Javascript."
		  participationEn: "Development of HTML, CSS and participation in Javascript."
		,  
		  # Santander
		  name: "Santander"
		  idName: "santander"
		  thumb: "/assets/img/portfolio/site-santander-thumb.jpg"
		  imgModal: "/assets/img/portfolio/site-santander.jpg"
		  participation: "Desenvolvimento do HTML e CSS. Participação no Javascript."
		  participationEn: "Development of HTML, CSS and participation in Javascript."
	    ]

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

		# Get the prepared site/document description
		getPreparedDescriptionEn: ->
			# if we have a document description, then we should use that, otherwise use the site's description
			@document.description_en or @site.description_en

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

		# Get the prepared post layout	
		getLayoutName: (post) ->
			post.layout.replace(/\..*/, '')

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

		# Write
		writeAfter: (opts,next) ->
			# Prepare
			balUtil = require('bal-util')
			docpad = @docpad
			config = docpad.getConfig()
			sitemap = []
			sitemapPath = config.outPath+'/sitemap.txt'
			siteUrl = config.templateData.site.url
 
			# Get all the html files
			docpad.getCollection('html').forEach (document) ->
				if document.get('sitemap') isnt false and document.get('write') isnt false and document.get('ignored') isnt true and document.get('body')
					sitemap.push siteUrl+document.get('url')
 
			# Write the sitemap file
			balUtil.writeFile(sitemapPath, sitemap.sort().join('\n'), next)			
}

# Export our DocPad Configuration
module.exports = docpadConfig