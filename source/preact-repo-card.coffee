require './preact-repo-card.less'
{h,Component} = require 'preact'
Slide = require 'preact-slide'

I_CHART = require './i_chart.svg'
I_MENU = require './i_menu.svg'
I_GITHUB = require './i_github.svg'
I_SPLIT = require './i_split.svg'
I_EYE = require './i_eye.svg'
I_STAR = require './i_star.svg'
I_LABEL = require './i_tag.svg'
I_PEOPLE = require './i_ppl.svg'
I_COURT = require './i_court.svg'
I_ERROR = require './i_error.svg'
I_PULL = require './i_pull.svg'
I_CHECK = require './i_check.svg'
I_CLOSE = require './i_close.svg'
I_COMMIT = require './i_commit.svg'
I_CLOCK = require './i_clock.svg'

# please dont use this, thnx.
PUBLIC_ = ['6154eb17ae86d63fadce5dd49a68b289b1acca90','13969e4e189b5c0645c35e951a7afb6420494884']

d3 = require './d3'
DIM = 40
fecha = require 'fecha'


avatar = (id)->
	'https://avatars2.githubusercontent.com/u/'+id+'?s=26&v=4'

rand = ()->
	Math.random()

shuffle = (arr)->
	ind = [0...arr.length].map rand
	map = {}
	map[j] = i for i,j in ind
	arr.sort (a,b)->
		if map[a] > map[b] then return -1
		else if map[a] < map[b] then return 1
		return 0

class Graph extends Component
	constructor: (props)->
		super()
		@state = 
			data: props.stats.all
			empty: Array(52).fill(0)
			path: null
			show: false
			start_path: null
 
		@line = d3.line()
		.x (d,i)=>
			@scaleX(i)
		.y (d,i)=>
			@scaleY(d)
		.curve(d3.curveMonotoneX)


	scaleX: (x)->
		@_el.clientWidth / 52 * x
	scaleY: (y)->
		(DIM-7) - ((DIM-7) / @props.stats.max * y)
		

	componentDidMount: ->
		@setState
			show: true
			path: @line(@state.data)
			start_path: @line(@state.empty)

	render: ->
		h Slide,
			# dim: DIM
			center: yes
			className: '-prc-stats'
		
			
			h 'div',
				className: '-prc-stats-scale-max'
				@props.stats.max
			h 'div',
				className: '-prc-stats-scale-min'
				0
			h 'div',
				className: '-prc-stats-scale-date'
				fecha.format(new Date(Date.now()-31449600000),'mediumDate')+' -  Today'

			h 'svg',
				ref: (el)=>
					@_el = el
				stroke:"#AEAEAE"
				style:
					'margin-left': 13
				"stroke-width":2
				fill:"none"
				height:"100%"
				# viewBox:"0 0 #{DIM*2} "+@_el
				width:"90%"
				xmlns:"http://www.w3.org/2000/svg"
				h 'path',
					id: @props.name
					d: @state.path
				h 'animate',
					'xlink:href':'#'+@props.name
					attributeName: 'd'
					attributeType: 'XML'
					from: @state.start_path
					to: @state.path
					# fill: 'freeze'
					dur: '0.5s'
					keyTimes: '0;1'
					keySplines:"0.25, 0.35, 0, 1"
					calcMode:"spline"
					# repeatCount:"indefinite"
					




fetchGithubRepoV3 = (user,repo)->
	new Promise (resolve,reject)->
		pre = 'https://api.github.com/repos/'+user+'/'+repo

		opt = 
			headers:
				'authorization': 'bearer '+PUBLIC_[0]
		
		res = await Promise.all([
			fetch pre+'/stats/participation',opt
			fetch pre+'/contributors',opt
			fetch pre+'/languages',opt
		])

		data = await Promise.all res.map (res)->
			res.json()

		repo =
			stats: data[0]
			contributors: data[1]
			language_stats: data[2]
			language_lines_total: 0
		repo.stats.max =  0
		repo.stats.avg = 0
		repo.stats.med = 0
		repo.stats.total = 0

		med = []
		
		for stat in repo.stats.all
			if stat != 0
				med.push stat
				repo.stats.avg += stat
				repo.stats.total++
			if stat > repo.stats.max
				repo.stats.max = stat


		med.sort()
		repo.stats.med = med[Math.round(med.length/2)]
		repo.stats.avg = repo.stats.avg / repo.stats.total

		for lang,lines of repo.language_stats
			repo.language_lines_total += lines

		return resolve(repo)



fetchGithubRepoV4 = (user,repo,branch)->
	gql = 
	"
	{
	  repository(owner: \"#{user}\", name: \"#{repo}\") {
	    isArchived
	    diskUsage
	    isLocked
	    isFork
	    homepageUrl
	    url
	    name
	    owner{
	      login
	      url
	      avatarUrl(size:26)
	    }
	    ref(qualifiedName: \"#{branch}\") {
	      id
	      name
	      target{
	       	... on Commit{
	          id
	          history(first: 10) {
	            totalCount
	            edges{
	              node{
	              	committedDate
	              	url
	              	oid
	                message
	                author{
	                  avatarUrl(size:26)
	                  email
	                  user {
	                    avatarUrl(size:26)
	                    name
	                    login
	                    url
	                  }
	                }
	                status {
	                  state
	                  contexts{
	                  	state
	                  	description
	                    targetUrl
	                  }
	                }
	              }
	            }
	          }
	        }
	      }
	    }
	    labels(first:10){
	      edges{
	        node{
	          name
	        }
	      }
	    }
	    pullRequests(first:10,states:OPEN){
	      totalCount
	      edges{
	        node{
	          createdAt
	          merged
	          author{
	            login
	          }
	        }
	      }
	    }
	    releases(first:10){
	      totalCount
	      edges{
	        node{
	          isPrerelease
	          isDraft
	          publishedAt
	          tag{
	          	name
	          }
	          url
	          author{
	            login
	            url
	            avatarUrl(size:26)
	          }
	        }
	      }
	    }
	    forks(first: 10) {
	      totalCount
	      edges {
	        node {
	          pushedAt
	          name
	          url
	          owner {
	            avatarUrl(size:26)
	            login
	            url
	          }
	        }
	      }
	    }
	    hasIssuesEnabled
	    primaryLanguage {
	      name
	      color
	    }
	    languages(first: 10) {
	      totalCount
	      edges {
	        node {
	          
	          color
	          name
	        }
	      }
	    }
	    licenseInfo {
	      name
	      url
	    }
	    pushedAt
	    stargazers(first: 30) {
	      totalCount
	      edges {
	        node {
	          name
	          websiteUrl
	          login
	          url
	          avatarUrl(size:26)
	          email
	          isHireable
	        }
	      }
	    }
	    issues(last: 30, states: OPEN){
	      totalCount
	      edges {
	        node {
	          title
	          url
	         	number
	          publishedAt
	          labels(first: 5) {
	            edges {
	              node {
	                name
	              }
	            }
	          }
	        }
	      }
	    }
	  }
	}
	"

	new Promise (resolve,reject)->
		fetch 'https://api.github.com/graphql',
			method: 'POST'
			mode: 'cors'
			headers: 
				'authorization': 'bearer '+PUBLIC_[0]
				'content-type': 'application/json'
			body: 
				JSON.stringify
					query: gql
		.then (res)->
			data = await res.json()
			data = data.data.repository

			data.issues_count = data.issues.totalCount
			data.issues = data.issues.edges.map (n)->
				n.node

			for issue in data.issues
				issue.labels = issue.labels.edges.map (n)->
					n.node.name

			data.forks_count = data.forks.totalCount
			data.forks = data.forks.edges.map (n)->
				n.node

			data.stargazers_count = data.stargazers.totalCount
			data.stargazers = data.stargazers.edges.map (n)->
				n.node

			data.languages_count = data.languages.totalCount
			data.languages = data.languages.edges.map (n)->
				n.node
			
			data.commits_count = data.ref.target.history.totalCount
			data.commits = data.ref.target.history.edges.map (n)->
				n.node

			delete data.ref
			
			data.releases_count = data.releases.totalCount
			data.releases = data.releases.edges.map (n)->
				n.node
			
			data.labels_count = data.labels.totalCount
			data.labels = data.labels.edges.map (n)->
				n.node

			# data.issues_count = data.issues.totalCount
			# data.issues = data.issues.edges.map (n)->
			# 	n.node

			# data.stargazers_count = data.stargazers.totalCount
			# data.stargazers = data.stargazers.edges.map (n)->
			# 	n.node
			
			data.pullRequests_count = data.pullRequests.totalCount
			data.pullRequests = data.pullRequests.edges.map (n)->
				n.node

			resolve data
		.catch (err)->
			reject(err)







class Contributor extends Component
	onMouseEnter: =>
		@props.onHover?(@props)
	render: (props)->
		h Slide,
			dim: DIM
			className: '-prc-contributor'
			onMouseEnter: @onMouseEnter
			h 'a',
				className: '-prc-user-link'
				href: @props.url
				target: '_blank'
				h 'img',
					src: @props.avatarUrl
			h 'a',
				href: @props.url
				className: '-prc-user-contrib'
				@props.contributions == 30 && '>30' || @props.contributions || '-'


class User extends Component
	onMouseEnter: =>
		@props.onHover?(@props)
	onMouseLeave: =>

	render: (props)->
		h Slide,
			width: DIM
			height: DIM
			center: yes
			onMouseEnter: @onMouseEnter
			h 'a',
				className: '-prc-user-link'
				href: @props.url
				target: '_blank'
				h 'img',
					src: @props.avatarUrl

class SingleStat extends Component
	constructor: ()->
		super()
	render: ->
		h Slide,
			auto: yes
			onClick: @props.onClick
			className: '-prc-btn -prc-stat'
			center: yes
			h 'img',src: @props.icon
			h 'span',
				className: '-prc-stat-value'
				@props.value

class Btn extends Component
	constructor: ()->
		super()
		@state =
			hover: no
	render: ->
		h Slide,
			ratio: 1
			vert: yes
			slide: yes
			pos: (@state.hover || @props.active) && .05 || 0
			className: '-prc-btn '+(@props.active && 'active')
			onMouseEnter: =>
				@setState hover: yes
			onMouseLeave: =>
				@setState hover: no
			h Slide,
				center: true
				@props.children
			h Slide,
				center: true
				style:
					background: '#7E7E7E'


class LangBar extends Component
	render: ->

		h Slide,
			height: 3
			@props.languages.map (lang)=>
				# console.log lang.color
				h Slide,
					beta:  @props.language_stats[lang.name] / @props.language_lines_total * 100
					style:
						background: lang.color

class Issue extends Component
	constructor: (props)->
		super()
		@state=
			hover: false
			published_string: fecha.format(new Date(props.publishedAt),'mediumDate')
	render: ->
		h 'div',	
			onMouseEnter: ()=>
				@props.onHover(@props)
			className: '-prc-release -prc-issue'
			h 'a',
				href: @props.url
				className: '-prc-release-name'
				'#'+@props.number
			h 'div',
				className: '-prc-release-date'
				@state.published_string
			@props.labels.map (label)->
				h 'span',
					className: '-prc-issue-label'
					label


class Release extends Component
	constructor: (props)->
		super()
		published_date = new Date(props.publishedAt)

		@state=
			published_date: published_date
			published_string: fecha.format(published_date,'mediumDate')

	render: ->
		h 'div',
			className: '-prc-release'
			h 'a',
				href: @props.url
				className: '-prc-release-name '+(@props.isPreRelease && '-prc-release-pre ' || '')+(@props.recent && '-prc-release-recent' || '')+(@props.isDraft && ' -prc-release-draft ' || '')
				@props.tag.name
			h 'div',
				className: '-prc-release-date'
				@state.published_string

class Fork extends Component
	constructor: (props)->
		super()
		published_date = new Date(props.pushedAt)
		@state=
			published_string: 'pushed on '+fecha.format(published_date,'mediumDate')

	render: ->
		h 'div',
			className: '-prc-release'
			h 'div',
				className: '-prc-release-name'
				h User,@props.owner
				h 'span',{},@props.owner.login+'/'+@props.name
			h 'div',
				className: '-prc-release-date'
				@state.published_string




class Commit
	constructor: (props)->
		@state=
			date: fecha.format(new Date(props.committedDate),'mediumDate')
	render: ->
		if !@props.status
			status = null
		else if @props.status.state == 'SUCCESS'
			status = h 'img',
				onClick: =>
					@props.showCommitStatus(@props)
				className: '-prc-commit-status'
				src: I_CHECK
		else if @props.status.state == 'FAILURE'
			status = h 'img',
				className: '-prc-commit-status'
				src: I_CLOSE

		# console.log @props
		
		
		h Slide,
			className: '-prc-commit'
			vert: yes
			h Slide,
				className: '-prc-commit-body'
				status
				h 'img',
					src: I_COMMIT
				h 'a',
					href: @props.url
					className: '-prc-commit-id'
						@props.oid.substr(0,7)
				h 'span',
					className: '-prc-commit-by'
					'by'
				h 'a',
					href: @props.author.user && @props.author.user.url || 'mail:'+@props.author.email
					h 'img',
						className: '-prc-commit-author'
						src: @props.author.avatarUrl
			h Slide,
				className: '-prc-commit-date'
				h 'img',
					src: I_CLOCK
				h 'div',{},@state.date


class RepoContent extends Component
	constructor: ->
		super()
		@state = 
			show_right: no
			right_bar: null
			right_bar_alt: null
		
	showContent: =>
		@setState
			show_right: false

	showReleases: =>
		@setState
			show_right: !@state.show_right
			right_bar: 'releases'
			right_bar_alt: null
	showIssues: =>
		@setState
			show_right: !@state.show_right
			right_bar: 'issues'
			right_bar_alt: null
	
	showStargazers: =>
		@setState
			show_right: !@state.show_right
			right_bar: 'stargazers'
			right_bar_alt: null
	
	showForks: =>
		@setState
			show_right: !@state.show_right
			right_bar: 'forks'
			right_bar_alt: null

	showContributors: =>
		@setState
			show_right: !@state.show_right
			right_bar: 'contributors'
			right_bar_alt: null

	showCommitStatus: (commit)=>
		
		bottom_slide_data = h 'div',
			className: '-prc-overlay-cstatus'
			commit.status.contexts.map (ctx)->
				url = new URL(ctx.targetUrl)
				h 'img',
					src: ctx.state == 'SUCCESS' && I_CHECK || I_CLOSE
				h 'a',
					href: ctx.targetUrl
					url.hostname
				h 'div',
					className: '-prc-overlay-cstatus-desc'
					ctx.description
		@setState
			bottom_slide_data: bottom_slide_data

	onUserHover: (user)=>
		@setState
			right_bar_alt: '/'+user.login 
	
	onIssueHover: (issue)=>
		@setState
			right_bar_alt: issue.title.substr(0,50)+'...'

	render: ->
		header = h Slide,
			className: '-prc-header'
			dim: DIM
			# h Btn,
			# 	active: false
			# 	h 'img',src:I_MENU
			h Slide,
				ratio: 2.5
				# center: yes
				className: '-prc-btn -prc-btn-lang'
				onClick: @showLanguages
				h 'div',
					className: '-prc-lang-circle'
					style:
						background: @props.primaryLanguage.color
				h 'span',
					className: '-prc-lang-count'
					@props.primaryLanguage.name
			h Slide,
				className: '-prc-header-name'
				# center: yes
				h User, @props.owner
				h 'a',
					href: @props.owner.url
					@props.owner.login
				h 'span',className: '-prc-seperator','/'
				h 'a',
					className: '-prc-header-name-repo'
					href: @props.url
					@props.name

		if @state.right_bar == 'releases'
			right_bar = @props.releases.map (release,i)->
				if i == 0
					release.recent = true
				h Release,release
			right_beta = 30
		else if @state.right_bar == 'stargazers'
			right_bar = @props.stargazers.map (user)=>
				user.onHover = @onUserHover
				h User, user
			right_beta = 50
		else if @state.right_bar == 'forks'
			right_bar = @props.forks.map (fork)=>
				fork.onHover = @onForkHover
				h Fork, fork
			right_beta = 50
		else if @state.right_bar == 'contributors'
			right_bar = @props.contributors.map (user)=>
				user.onHover = @onUserHover
				user.avatarUrl = avatar(user.id)
				h Contributor, user
			right_beta = 50
		else if @state.right_bar == 'issues'
			right_bar = @props.issues.map (issue)=>
				issue.onHover = @onIssueHover
				h Issue, issue
			right_beta = 50

	
		if @props.commits[0]
			@props.commits[0].showCommitStatus = (commit)=>
				@showCommitStatus(commit)


		content = h Slide,
			vert: no
			beta: 100
			offset: DIM
			className: '-prc-content'
			slide: yes
			pos: @state.show_right && 1 || 0
			h Slide,
				vert: yes
				h 'div',
					className: '-prc-overlay -prc-otrigger '+(!@state.show_right && !@state.bottom_slide_data && '-prc-hidden' || '')
					onClick: @showContent
					@state.overlay_data || h 'div',
						className: '-prc-overlay-title-wrap'
						h 'a',
							className: '-prc-overlay-title'
							href: @props.url+'/'+@state.right_bar
							@state.right_bar
						@state.right_bar_alt && h 'span',
							className: '-prc-overlay-title-alt'
							@state.right_bar_alt
				h LangBar,@props
				h Slide,
					dim: DIM
					h SingleStat,
						icon: I_SPLIT
						onClick: @showForks
						value: @props.forks_count
					h SingleStat,
						onClick: @showStargazers
						icon: I_STAR
						value: @props.stargazers_count
					h SingleStat,
						onClick: @showIssues
						icon: I_ERROR
						value: @props.issues_count
					h SingleStat,
						onClick: @showContributors
						icon: I_PEOPLE
						value: @props.contributors && @props.contributors.length || '-'
					h SingleStat,
						onClick: @showReleases
						icon: I_LABEL
						value: @props.releases[0] && @props.releases[0].tag.name || 'no release'
					@props.license && h SingleStat,
						onClick: @showReleases
						icon: I_COURT
						value: @props.license.spdx_id
				h Slide,
					className: 'stats'
					h Graph,@props	
					@props.commits[0] && h Commit,@props.commits[0]


			h Slide,
				className: '-prc-releases'
				scroll: true
				beta: right_beta
				width: @state.right_bar == 'stargazers' && DIM*3 || null
				vert: yes
				right_bar



		h Slide,
			vert: yes
			slide: yes
			header
			content
			h Slide,
				beta: 50
				vert: yes
				className: '-prc-bottom'
				@state.bottom_slide_data



class PreactRepoCard extends Component
	constructor: (props)->
		super(props)
		@state = 
			repo: null

		Promise.all [
			fetchGithubRepoV3(props.user,props.repo,props.branch || 'master')
			fetchGithubRepoV4(props.user,props.repo,props.branch || 'master')
		]
		.then (data)=>
			data = Object.assign data[1],data[0]
			console.log data
			@setState
				repo: data 

	render: ->
		h Slide,
			className: '-prc-wrapper'
			h 'div',
				className: ('-prc-overlay '+(@state.repo && '-prc-hidden' || ''))
				h 'img',src: I_GITHUB
			@state.repo && h RepoContent,@state.repo



module.exports = PreactRepoCard