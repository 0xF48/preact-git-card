{h,render,Component} = require 'preact'
Slide = require 'preact-slide'
ShaderBoxGradient = require 'shader-box-gradient'
Markdown = require 'preact-markdown'
Markup = require 'preact-markup'
require './site.less'




Example = require './example.coffee'


EXAMPLES = [
	['A Gtihub Repo Card',require('./example.md'),Example,'https://github.com/arxii/preact-repo-card/blob/master/source/example.coffee?ts=4']
]



# ABOUT = require './about.md'

TITLE = 'Preact Repo Card'
HEADER_TEXT = 'Simple github repository cards you can use for your portfolio.'
PROPS = [
	['url','null','Full url to the repository. eg https://github.com/arxii/preact-slide']
	['dark','false','Set to `true` to enable the dark theme!']
]






class Header extends Component
	constructor: ->
		super()
		@state =
			title_snippet_pos_a: 0
			title_snippet_pos_b: 1
			show_bg: true
	

	componentDidMount: ->
		@gradient = ShaderBoxGradient(@_canvas,{seed:[1,2,3],speed:1.0,fade:1.0})
		# @gradient.shader.uniforms.speed.val = 0.5
		@gradient.shader.uniforms.seed.val[0] = 151
		@gradient.shader.uniforms.seed.val[1] = 22
		@gradient.shader.uniforms.seed.val[2] = 0
		# @gradient.shader.uniforms.fade.val = 0
		@gradient.run()
		window.addEventListener 'scroll',@autoHideShowGradient


	autoHideShowGradient: =>
		if window.scrollY > window.innerHeight && @state.show_bg
			@gradient.pause()
			@setState
				show_bg: false
		else if window.scrollY < window.innerHeight && !@state.show_bg
			@setState
				show_bg: true
			,()=>
				@gradient.run()

	
	switchTitleSnippetTextA: =>
		@setState
			title_snippet_pos_a: 1-@state.title_snippet_pos_a
	

	switchTitleSnippetTextB: =>
		@setState
			title_snippet_pos_b: 1-@state.title_snippet_pos_b
		
	
	render: ->
		h 'div',
			className: 'header'
			h 'canvas',
				style:
					visibility: !@state.show_bg && 'hidden' || null
				className: 'canvas'
				ref: (el)=>
					@_canvas = el
			h 'a',
				className: 'gradient-link center'
				href: 'https://github.com/arxii/shader-box-gradient'
				'?'

			h 'div',
				className: 'header-description',
				h 'div',
					className: 'title center'
					h 'a',
						href: "https://github.com/arxii/preact-slide"
						className: 'title-name'
						TITLE

					h Slide,
						className: 'title-snippet'
						vert: true
						center: yes
						'npm i preact preact-repo-card'
					h 'a',
						href: "https://github.com/arxii/preact-slide"
						className: 'center github-link'
						h 'img',
							src: '/site/github.svg'
				# h 'p',
				# 	className:'header-description-sub'
				# 	'Experimental'
				h 'p',
					className:'header-description-text'
					HEADER_TEXT
					h 'div',
						className: 'shields'
						h 'a',
							href:'https://npmjs.com/package/preact-slide'
							h 'img',
								src: 'https://img.shields.io/npm/v/preact-slide.svg?style=for-the-badge'
						h 'a',
							href:'https://github.com/developit/preact'
							h 'img',
								src: 'https://img.shields.io/badge/preact-v8.2.7-blue.svg?style=for-the-badge'
						h 'a',
							href:'https://travis-ci.org/arxii/preact-slide'
							h 'img',
								src: 'https://img.shields.io/travis/arxii/preact-slide.svg?style=for-the-badge'




class Docs 
	render: ->
		h 'div',
			className: 'docs'
			h Header
	
			h 'div',
				className: 'section'
				h 'h1',{},'Props'
				PROPS.map (prop)->
					h 'div',
						className: 'prop'
						h 'div',
							className: 'prop-name'
							prop[0]
						h 'div',
							className: 'prop-default'
							prop[1]
						h Markdown,
							markdown: prop[2]
							markupOpts:
								className: 'prop-text'

			h 'div',
				className: 'examples section'
				h 'h1',
					margin: 10
					'Examples'
				EXAMPLES.map (example)->
					h 'div',
						className: 'example-section'
						h 'a',
							href: example[3]
							target: '_blank'
							className: 'section-title'
							h 'span',
								className: 'section-title-name'
								example[0]
						h Markdown,
							markdown: example[1]
							markupOpts:
								className: 'section-text'
						h example[2]
						example[3] && h 'a',
							href: example[3]
							className: 'section-title-link'
							target: '_blank'
							'</>'

			h 'footer',
				className: 'footer'
				h 'a',
					href: "https://github.com/arxii/preact-slide"
					className: 'footer-text'
					'Source'
				h 'a',
					href: "https://github.com/arxii/preact-slide/blob/master/LICENSE"
					className: 'footer-text'
					'Apache License 2.0'




class Dev extends Component
	constructor: ->
		super()
	render: ->
		h Slide,
			center: yes
			style:
				height: '100vh'
			h Example

@docs_el = null
render(h(Dev),document.body,@docs_el)
# hljs.initHighlightingOnLoad()



