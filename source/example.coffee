{h} = require 'preact'
GitCard = require './preact-repo-card.coffee'
module.exports = class Example
	render: ->
		h 'div',
			style:
				height: 'auto'
			# h 'div',
			# 	style:
			# 		width: 320
			# 		height: 130
			# 		margin: '10px'
			# 	h GitCard,
			# 		user: "CreateJS"
			# 		repo: "SoundJS"
			h 'div',
				style:
					width: 320
					height: 130
					margin: '10px'
				h GitCard,
					user: "arxii"
					repo: "shader-box"
			h 'div',
				style:
					width: 320
					height: 130
					margin: '10px'
				h GitCard,
					user: "arxii"
					repo: "preact-slide"
			h 'div',
				style:
					width: 320
					height: 130
					margin: '10px'
				h GitCard,
					user: "developit"
					repo: "preact"
			# h 'div',
			# 	style:
			# 		width: 320
			# 		height: 130
			# 		margin: '10px'
			# 	h GitCard,
			# 		user: "octref"
			# 		repo: "polacode"
			# h 'div',
			# 	style:
			# 		width: 320
			# 		height: 130
			# 		margin: '10px'
			# 	h GitCard,
			# 		user: "arxii"
			# 		repo: "preact-slide"

