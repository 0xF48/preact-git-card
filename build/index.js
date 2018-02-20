(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PreactRepoCard"] = factory();
	else
		root["PreactRepoCard"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return h; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rerender", function() { return rerender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/**
 * JSX/hyperscript reviver.
 * @see http://jasonformat.com/wtf-is-jsx
 * Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *
 * Note: this is exported as both `h()` and `createElement()` for compatibility reasons.
 *
 * Creates a VNode (virtual DOM element). A tree of VNodes can be used as a lightweight representation
 * of the structure of a DOM tree. This structure can be realized by recursively comparing it against
 * the current _actual_ DOM structure, and applying only the differences.
 *
 * `h()`/`createElement()` accepts an element name, a list of attributes/props,
 * and optionally children to append to the element.
 *
 * @example The following DOM tree
 *
 * `<div id="foo" name="bar">Hello!</div>`
 *
 * can be constructed using this function as:
 *
 * `h('div', { id: 'foo', name : 'bar' }, 'Hello!');`
 *
 * @param {string} nodeName	An element name. Ex: `div`, `a`, `span`, etc.
 * @param {Object} attributes	Any attributes/props to set on the created element.
 * @param rest			Additional arguments are taken to be children to append. Can be infinitely nested Arrays.
 *
 * @public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/**
 *  Copy all properties from `props` onto `obj`.
 *  @param {Object} obj		Object onto which properties should be copied.
 *  @param {Object} props	Object from which to copy properties.
 *  @returns obj
 *  @private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/**
 * Call a function asynchronously, as soon as possible. Makes
 * use of HTML Promise to schedule the callback if available,
 * otherwise falling back to `setTimeout` (mainly for IE<11).
 *
 * @param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

/**
 * Clones the given VNode, optionally adding attributes/props and replacing its children.
 * @param {VNode} vnode		The virutal DOM element to clone
 * @param {Object} props	Attributes/props to add when cloning
 * @param {VNode} rest		Any additional arguments will be used as replacement children.
 */
function cloneElement(vnode, props) {
  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/**
 * Check if two nodes are equivalent.
 *
 * @param {Node} node			DOM Node to compare
 * @param {VNode} vnode			Virtual DOM node to compare
 * @param {boolean} [hyrdating=false]	If true, ignores component constructors when comparing.
 * @private
 */
function isSameNodeType(node, vnode, hydrating) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    return node.splitText !== undefined;
  }
  if (typeof vnode.nodeName === 'string') {
    return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  }
  return hydrating || node._componentConstructor === vnode.nodeName;
}

/**
 * Check if an Element has a given nodeName, case-insensitively.
 *
 * @param {Element} node	A DOM Element to inspect the name of.
 * @param {String} nodeName	Unnormalized name to compare against.
 */
function isNamedNode(node, nodeName) {
  return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 *
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
  var props = extend({}, vnode.attributes);
  props.children = vnode.children;

  var defaultProps = vnode.nodeName.defaultProps;
  if (defaultProps !== undefined) {
    for (var i in defaultProps) {
      if (props[i] === undefined) {
        props[i] = defaultProps[i];
      }
    }
  }

  return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};


/* harmony default export */ __webpack_exports__["default"] = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Btn, Commit, Component, Contributor, DIM, Fork, Graph, I_CHART, I_CHECK, I_CLOCK, I_CLOSE, I_COMMIT, I_ERROR, I_EYE, I_GITHUB, I_LABEL, I_MENU, I_PEOPLE, I_PULL, I_SPLIT, I_STAR, Issue, LangBar, PUBLIC_, PreactRepoCard, Release, RepoContent, SingleStat, Slide, User, avatar, d3, fecha, fetchGithubRepoV3, fetchGithubRepoV4, h, rand, shuffle,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

__webpack_require__(2);

({h, Component} = __webpack_require__(0));

Slide = __webpack_require__(7);

I_CHART = __webpack_require__(8);

I_MENU = __webpack_require__(9);

I_GITHUB = __webpack_require__(10);

I_SPLIT = __webpack_require__(11);

I_EYE = __webpack_require__(12);

I_STAR = __webpack_require__(13);

I_LABEL = __webpack_require__(14);

I_PEOPLE = __webpack_require__(15);

I_ERROR = __webpack_require__(16);

I_PULL = __webpack_require__(17);

I_CHECK = __webpack_require__(18);

I_CLOSE = __webpack_require__(19);

I_COMMIT = __webpack_require__(20);

I_CLOCK = __webpack_require__(21);

// please dont use this, thnx.
PUBLIC_ = ['aa183017db17617630dab01be33595701e4ffdbc'];

d3 = __webpack_require__(22);

DIM = 40;

fecha = __webpack_require__(30);

avatar = function(id) {
  return 'https://avatars2.githubusercontent.com/u/' + id + '?s=26&v=4';
};

rand = function() {
  return Math.random();
};

shuffle = function(arr) {
  var i, ind, j, k, len, map, ref;
  ind = (function() {
    var results = [];
    for (var k = 0, ref = arr.length; 0 <= ref ? k < ref : k > ref; 0 <= ref ? k++ : k--){ results.push(k); }
    return results;
  }).apply(this).map(rand);
  map = {};
  for (j = k = 0, len = ind.length; k < len; j = ++k) {
    i = ind[j];
    map[j] = i;
  }
  return arr.sort(function(a, b) {
    if (map[a] > map[b]) {
      return -1;
    } else if (map[a] < map[b]) {
      return 1;
    }
    return 0;
  });
};

fetchGithubRepoV3 = function(user, repo) {
  return new Promise(async function(resolve, reject) {
    var data, k, lang, len, lines, med, opt, pre, ref, ref1, res, stat;
    pre = 'https://api.github.com/repos/' + user + '/' + repo;
    opt = {
      headers: {
        'Authorization': 'bearer ' + PUBLIC_[0]
      }
    };
    res = (await Promise.all([fetch(pre + '/stats/participation', opt), fetch(pre + '/contributors', opt), fetch(pre + '/languages', opt)]));
    data = (await Promise.all(res.map(function(res) {
      return res.json();
    })));
    repo = {
      stats: data[0],
      contributors: data[1],
      language_stats: data[2],
      language_lines_total: 0
    };
    repo.stats.max = 0;
    repo.stats.avg = 0;
    repo.stats.med = 0;
    repo.stats.total = 0;
    med = [];
    ref = repo.stats.all;
    for (k = 0, len = ref.length; k < len; k++) {
      stat = ref[k];
      if (stat !== 0) {
        med.push(stat);
        repo.stats.avg += stat;
        repo.stats.total++;
      }
      if (stat > repo.stats.max) {
        repo.stats.max = stat;
      }
    }
    med.sort();
    repo.stats.med = med[Math.round(med.length / 2)];
    repo.stats.avg = repo.stats.avg / repo.stats.total;
    ref1 = repo.language_stats;
    for (lang in ref1) {
      lines = ref1[lang];
      repo.language_lines_total += lines;
    }
    return resolve(repo);
  });
};

fetchGithubRepoV4 = function(user, repo, branch) {
  var gql;
  gql = `{ repository(owner: "${user}", name: "${repo}") { isArchived diskUsage isLocked isFork homepageUrl url name owner{ login url avatarUrl(size:26) } ref(qualifiedName: "${branch}") { id name target{ ... on Commit{ id history(first: 10) { totalCount edges{ node{ committedDate url oid message author{ avatarUrl(size:26) email user { avatarUrl(size:26) name login url } } status { state contexts{ state description targetUrl } } } } } } } } labels(first:10){ edges{ node{ name } } } pullRequests(first:10,states:OPEN){ totalCount edges{ node{ createdAt merged author{ login } } } } releases(first:10){ totalCount edges{ node{ isPrerelease isDraft publishedAt tag{ name } url author{ login url avatarUrl(size:26) } } } } forks(first: 10) { totalCount edges { node { pushedAt name url owner { avatarUrl(size:26) login url } } } } hasIssuesEnabled primaryLanguage { name color } languages(first: 10) { totalCount edges { node { color name } } } licenseInfo { name url } pushedAt stargazers(first: 30) { totalCount edges { node { name websiteUrl login url avatarUrl(size:26) email isHireable } } } issues(last: 30, states: OPEN){ totalCount edges { node { title url number publishedAt labels(first: 5) { edges { node { name } } } } } } } }`;
  return new Promise(function(resolve, reject) {
    return fetch('https://api.github.com/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'authorization': 'bearer ' + PUBLIC_[0],
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query: gql
      })
    }).then(async function(res) {
      var commit, ctx, data, issue, k, l, len, len1, len2, m, ref, ref1, ref2;
      data = (await res.json());
      data = data.data.repository;
      data.issues_count = data.issues.totalCount;
      data.issues = data.issues.edges.map(function(n) {
        return n.node;
      });
      ref = data.issues;
      for (k = 0, len = ref.length; k < len; k++) {
        issue = ref[k];
        issue.labels = issue.labels.edges.map(function(n) {
          return n.node.name;
        });
      }
      data.forks_count = data.forks.totalCount;
      data.forks = data.forks.edges.map(function(n) {
        return n.node;
      });
      data.stargazers_count = data.stargazers.totalCount;
      data.stargazers = data.stargazers.edges.map(function(n) {
        return n.node;
      });
      data.languages_count = data.languages.totalCount;
      data.languages = data.languages.edges.map(function(n) {
        return n.node;
      });
      data.commits_count = data.ref.target.history.totalCount;
      data.commits = data.ref.target.history.edges.map(function(n) {
        return n.node;
      });
      ref1 = data.commits;
      for (l = 0, len1 = ref1.length; l < len1; l++) {
        commit = ref1[l];
        if (commit.status && commit.status.contexts.length) {
          ref2 = commit.status.contexts;
          for (m = 0, len2 = ref2.length; m < len2; m++) {
            ctx = ref2[m];
            ctx.description_h = h('div', {
              className: '-prc-overlay-data'
            }, ctx.description);
          }
        }
      }
      delete data.ref;
      data.releases_count = data.releases.totalCount;
      data.releases = data.releases.edges.map(function(n) {
        return n.node;
      });
      data.labels_count = data.labels.totalCount;
      data.labels = data.labels.edges.map(function(n) {
        return n.node;
      });
      // data.issues_count = data.issues.totalCount
      // data.issues = data.issues.edges.map (n)->
      // 	n.node

      // data.stargazers_count = data.stargazers.totalCount
      // data.stargazers = data.stargazers.edges.map (n)->
      // 	n.node
      data.pullRequests_count = data.pullRequests.totalCount;
      data.pullRequests = data.pullRequests.edges.map(function(n) {
        return n.node;
      });
      return resolve(data);
    }).catch(function(err) {
      return reject(err);
    });
  });
};

Graph = class Graph extends Component {
  constructor(props) {
    super();
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.state = {
      data: props.stats.all,
      empty: Array(52).fill(0),
      path: null,
      show: false,
      start_path: null
    };
    this.line = d3.line().x((d, i) => {
      return this.scaleX(i);
    }).y((d, i) => {
      return this.scaleY(d);
    }).curve(d3.curveMonotoneX);
  }

  scaleX(x) {
    return this._el.clientWidth / 52 * x;
  }

  scaleY(y) {
    return (DIM - 7) - ((DIM - 7) / this.props.stats.max * y);
  }

  onMouseEnter() {
    boundMethodCheck(this, Graph);
    return this.setState({
      hover: true
    });
  }

  onMouseLeave() {
    boundMethodCheck(this, Graph);
    return this.setState({
      hover: false
    });
  }

  componentDidMount() {
    return this.setState({
      show: true,
      path: this.line(this.state.data),
      start_path: this.line(this.state.empty)
    });
  }

  render() {
    return h(Slide, {
      // dim: DIM
      center: true,
      className: '-prc-stats',
      onClick: this.props.showCommits,
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    }, h('div', {
      className: '-prc-stats-scale-max'
    }, this.props.stats.max), h('div', {
      className: '-prc-stats-scale-min'
    }, 0), h('div', {
      className: '-prc-stats-scale-date'
    }, fecha.format(new Date(Date.now() - 31449600000), 'mediumDate') + ' -  Today'), h('svg', {
      // className: '-prc-stats-svg'
      ref: (el) => {
        return this._el = el;
      },
      stroke: "#7E7E7E",
      style: {
        'opacity': this.state.hover && 1 || 0.6,
        'margin-left': 13
      },
      "stroke-width": 2,
      fill: "none",
      height: "100%",
      // viewBox:"0 0 #{DIM*2} "+@_el
      width: "90%",
      xmlns: "http://www.w3.org/2000/svg"
    }, h('path', {
      id: this.props.name,
      d: this.state.path
    }), h('animate', {
      'xlink:href': '#' + this.props.name,
      attributeName: 'd',
      attributeType: 'XML',
      from: this.state.start_path,
      to: this.state.path,
      // fill: 'freeze'
      dur: '0.5s',
      keyTimes: '0;1',
      keySplines: "0.25, 0.35, 0, 1",
      calcMode: "spline"
    })));
  }

};

// repeatCount:"indefinite"
Contributor = class Contributor extends Component {
  constructor() {
    super(...arguments);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  onMouseEnter() {
    var base;
    boundMethodCheck(this, Contributor);
    return typeof (base = this.props).onHover === "function" ? base.onHover(this.props) : void 0;
  }

  render(props) {
    return h(Slide, {
      dim: DIM,
      className: '-prc-contributor',
      onMouseEnter: this.onMouseEnter
    }, h('a', {
      className: '-prc-user-link',
      href: this.props.url,
      target: '_blank'
    }, h('img', {
      src: this.props.avatarUrl
    })), h('a', {
      href: this.props.url,
      className: '-prc-user-contrib'
    }, this.props.contributions === 30 && '>30' || this.props.contributions || '-'));
  }

};

User = class User extends Component {
  constructor() {
    super(...arguments);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    var base;
    boundMethodCheck(this, User);
    return typeof (base = this.props).onHover === "function" ? base.onHover(this.props) : void 0;
  }

  onMouseLeave() {
    boundMethodCheck(this, User);
  }

  render(props) {
    return h(Slide, {
      width: DIM,
      height: DIM,
      center: true,
      onMouseEnter: this.onMouseEnter
    }, h('a', {
      className: '-prc-user-link',
      href: this.props.url,
      target: '_blank'
    }, h('img', {
      src: this.props.avatarUrl
    })));
  }

};

SingleStat = class SingleStat extends Component {
  constructor() {
    super();
  }

  render() {
    return h(Slide, {
      auto: true,
      onClick: this.props.onClick,
      className: '-prc-btn -prc-stat',
      center: true
    }, h('img', {
      src: this.props.icon
    }), h('span', {
      className: '-prc-stat-value'
    }, this.props.value));
  }

};

Btn = class Btn extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  render() {
    return h(Slide, {
      ratio: 1,
      vert: true,
      slide: true,
      pos: (this.state.hover || this.props.active) && .05 || 0,
      className: '-prc-btn ' + (this.props.active && 'active'),
      onMouseEnter: () => {
        return this.setState({
          hover: true
        });
      },
      onMouseLeave: () => {
        return this.setState({
          hover: false
        });
      }
    }, h(Slide, {
      center: true
    }, this.props.children), h(Slide, {
      center: true,
      style: {
        background: '#7E7E7E'
      }
    }));
  }

};

LangBar = class LangBar extends Component {
  render() {
    return h(Slide, {
      height: 3
    }, this.props.languages.map((lang) => {
      // console.log lang.color
      return h(Slide, {
        beta: this.props.language_stats[lang.name] / this.props.language_lines_total * 100,
        style: {
          background: lang.color
        }
      });
    }));
  }

};

Issue = class Issue extends Component {
  constructor(props) {
    super();
    this.state = {
      hover: false,
      published_string: fecha.format(new Date(props.publishedAt), 'mediumDate')
    };
  }

  render() {
    return h('div', {
      onMouseEnter: () => {
        return this.props.onHover(this.props);
      },
      className: '-prc-release -prc-issue'
    }, h('a', {
      href: this.props.url,
      className: '-prc-release-name'
    }, '#' + this.props.number), h('div', {
      className: '-prc-release-date'
    }, this.state.published_string), this.props.labels.map(function(label) {
      return h('span', {
        className: '-prc-issue-label'
      }, label);
    }));
  }

};

Release = class Release extends Component {
  constructor(props) {
    var published_date;
    super();
    published_date = new Date(props.publishedAt);
    this.state = {
      published_date: published_date,
      published_string: fecha.format(published_date, 'mediumDate')
    };
  }

  render() {
    return h('div', {
      className: '-prc-release'
    }, h('a', {
      href: this.props.url,
      className: '-prc-release-name ' + (this.props.isPreRelease && '-prc-release-pre ' || '') + (this.props.recent && '-prc-release-recent' || '') + (this.props.isDraft && ' -prc-release-draft ' || '')
    }, this.props.tag.name), h('div', {
      className: '-prc-release-date'
    }, this.state.published_string));
  }

};

Fork = class Fork extends Component {
  constructor(props) {
    var published_date;
    super();
    published_date = new Date(props.pushedAt);
    this.state = {
      published_string: 'pushed on ' + fecha.format(published_date, 'mediumDate')
    };
  }

  render() {
    return h('div', {
      className: '-prc-release'
    }, h('div', {
      className: '-prc-release-name'
    }, h(User, this.props.owner), h('span', {}, this.props.owner.login + '/' + this.props.name)), h('div', {
      className: '-prc-release-date'
    }, this.state.published_string));
  }

};

Commit = class Commit {
  constructor(props) {
    this.state = {
      date: fecha.format(new Date(props.committedDate), 'mediumDate')
    };
  }

  render() {
    var status;
    if (!this.props.status) {
      status = null;
    } else if (this.props.status.state === 'SUCCESS') {
      status = h('img', {
        onClick: () => {
          return this.props.showCommitStatus(this.props);
        },
        className: '-prc-commit-status',
        src: I_CHECK
      });
    } else if (this.props.status.state === 'FAILURE') {
      status = h('img', {
        className: '-prc-commit-status',
        src: I_CLOSE
      });
    }
    // console.log @props
    return h(Slide, {
      className: '-prc-commit',
      height: DIM,
      width: '100%',
      vert: true
    }, h(Slide, {
      className: '-prc-commit-body'
    }, status, h('img', {
      src: I_COMMIT
    }), h('a', {
      href: this.props.url,
      className: '-prc-commit-id'
    }, this.props.oid.substr(0, 7)), h('span', {
      className: '-prc-commit-by'
    }, 'by'), h('a', {
      href: this.props.author.user && this.props.author.user.url || 'mail:' + this.props.author.email
    }, h('img', {
      className: '-prc-commit-author',
      src: this.props.author.avatarUrl
    }))), h(Slide, {
      className: '-prc-commit-date'
    }, h('img', {
      src: I_CLOCK
    }), h('div', {}, this.state.date)));
  }

};

RepoContent = class RepoContent extends Component {
  constructor() {
    super();
    this.showContent = this.showContent.bind(this);
    this.hideBottom = this.hideBottom.bind(this);
    this.showReleases = this.showReleases.bind(this);
    this.showIssues = this.showIssues.bind(this);
    this.showCommits = this.showCommits.bind(this);
    this.showStargazers = this.showStargazers.bind(this);
    this.showForks = this.showForks.bind(this);
    this.showContributors = this.showContributors.bind(this);
    this.showCommitStatus = this.showCommitStatus.bind(this);
    this.onUserHover = this.onUserHover.bind(this);
    this.onIssueHover = this.onIssueHover.bind(this);
    this.state = {
      show_right: false,
      right_bar: null,
      overlay_text: null
    };
  }

  showContent() {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      show_right: false
    });
  }

  hideBottom() {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      show_bottom: false
    });
  }

  showReleases() {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      show_right: !this.state.show_right,
      right_bar: 'releases',
      overlay_text: null
    });
  }

  showIssues() {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      show_right: !this.state.show_right,
      right_bar: 'issues',
      overlay_text: null
    });
  }

  showCommits() {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      show_right: !this.state.show_right,
      right_bar: 'commits',
      overlay_text: null
    });
  }

  showStargazers() {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      show_right: !this.state.show_right,
      right_bar: 'stargazers',
      overlay_text: null
    });
  }

  showForks() {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      show_right: !this.state.show_right,
      right_bar: 'forks',
      overlay_text: null
    });
  }

  showContributors() {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      show_right: !this.state.show_right,
      right_bar: 'contributors',
      overlay_text: null
    });
  }

  showCommitStatus(commit) {
    var bottom_slide_data;
    boundMethodCheck(this, RepoContent);
    // dat = null
    bottom_slide_data = h('div', {
      className: '-prc-cstatus'
    }, commit.status.contexts.map((ctx) => {
      var url;
      url = new URL(ctx.targetUrl);
      return h('div', {
        onMouseEnter: () => {
          return this.setState({
            bottom_overlay_data: ctx.description_h
          });
        },
        className: '-prc-cstatus-status'
      }, h('img', {
        src: ctx.state === 'SUCCESS' && I_CHECK || I_CLOSE
      }), h('a', {
        href: ctx.targetUrl
      }, url.hostname));
    }));
    return this.setState({
      show_bottom: true,
      bottom_overlay_data: null,
      bottom_slide_data: bottom_slide_data
    });
  }

  onUserHover(user) {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      overlay_text: '/' + user.login
    });
  }

  onIssueHover(issue) {
    boundMethodCheck(this, RepoContent);
    return this.setState({
      overlay_text: issue.title.substr(0, 50) + '...'
    });
  }

  render() {
    var content, header, right_bar, right_beta;
    header = h(Slide, {
      className: '-prc-header',
      dim: DIM
    }, h(Slide, {
      ratio: 2.5,
      className: '-prc-btn -prc-btn-lang',
      onClick: this.showLanguages
    }, h('div', {
      className: '-prc-lang-circle',
      style: {
        background: this.props.primaryLanguage.color
      }
    }), h('span', {
      className: '-prc-lang-count'
    }, this.props.primaryLanguage.name)), h(Slide, {
      className: '-prc-header-name'
    }, h(User, this.props.owner), h('a', {
      href: this.props.owner.url
    }, this.props.owner.login), h('span', {
      className: '-prc-seperator'
    }, '/'), h('a', {
      className: '-prc-header-name-repo',
      href: this.props.url
    }, this.props.name)));
    if (this.state.right_bar === 'releases') {
      right_bar = this.props.releases.map(function(release, i) {
        if (i === 0) {
          release.recent = true;
        }
        return h(Release, release);
      });
      right_beta = 30;
    } else if (this.state.right_bar === 'stargazers') {
      right_bar = this.props.stargazers.map((user) => {
        user.onHover = this.onUserHover;
        return h(User, user);
      });
      right_beta = 50;
    } else if (this.state.right_bar === 'forks') {
      right_bar = this.props.forks.map((fork) => {
        fork.onHover = this.onForkHover;
        return h(Fork, fork);
      });
      right_beta = 50;
    } else if (this.state.right_bar === 'contributors') {
      right_bar = this.props.contributors.map((user) => {
        user.onHover = this.onUserHover;
        user.avatarUrl = avatar(user.id);
        return h(Contributor, user);
      });
      right_beta = 50;
    } else if (this.state.right_bar === 'issues') {
      right_bar = this.props.issues.map((issue) => {
        issue.onHover = this.onIssueHover;
        return h(Issue, issue);
      });
      right_beta = 50;
    } else if (this.state.right_bar === 'commits') {
      right_bar = this.props.commits.map((commit) => {
        commit.showCommitStatus = this.showCommitStatus;
        return h(Commit, commit);
      });
      right_beta = 50;
    }
    if (this.props.commits[0]) {
      this.props.commits[0].showCommitStatus = (commit) => {
        return this.showCommitStatus(commit);
      };
    }
    content = h(Slide, {
      vert: false,
      beta: 100,
      className: '-prc-content',
      slide: true,
      pos: this.state.show_right && 1 || 0
    }, h(Slide, {
      vert: true
    }, h('div', {
      className: '-prc-overlay -prc-otrigger ' + (!this.state.show_right && '-prc-hidden' || ''),
      onClick: this.showContent
    }, h('div', {
      className: '-prc-overlay-title-wrap'
    }, h('a', {
      className: '-prc-overlay-title',
      href: this.props.url + '/' + this.state.right_bar
    }, this.state.right_bar), this.state.overlay_text && h('span', {
      className: '-prc-overlay-title-alt'
    }, this.state.overlay_text))), h(LangBar, this.props), h(Slide, {
      dim: DIM
    }, h(SingleStat, {
      icon: I_SPLIT,
      onClick: this.showForks,
      value: this.props.forks_count
    }), h(SingleStat, {
      onClick: this.showStargazers,
      icon: I_STAR,
      value: this.props.stargazers_count
    }), h(SingleStat, {
      onClick: this.showIssues,
      icon: I_ERROR,
      value: this.props.issues_count
    }), h(SingleStat, {
      onClick: this.showContributors,
      icon: I_PEOPLE,
      value: this.props.contributors && this.props.contributors.length || '-'
    }), h(SingleStat, {
      onClick: this.showReleases,
      icon: I_LABEL,
      value: this.props.releases[0] && this.props.releases[0].tag.name || 'no release'
    }), this.props.license && h(SingleStat, {
      onClick: this.showReleases,
      icon: I_COURT,
      value: this.props.license.spdx_id
    })), h(Slide, {
      className: 'stats'
    }, h(Graph, Object.assign({
      showCommits: this.showCommits
    }, this.props)), this.props.commits[0] && h(Commit, this.props.commits[0]))), h(Slide, {
      className: '-prc-releases',
      scroll: true,
      beta: right_beta,
      width: this.state.right_bar === 'stargazers' && DIM * 3 || null,
      vert: true
    }, right_bar));
    return h(Slide, {
      vert: true,
      slide: true,
      pos: this.state.show_bottom && 1 || 0
    }, h(Slide, {
      beta: 100,
      vert: true
    }, header, content, h('div', {
      onClick: this.hideBottom,
      className: '-prc-overlay -prc-otrigger ' + (!this.state.show_bottom && '-prc-hidden' || '')
    }, this.state.bottom_overlay_data)), h(Slide, {
      className: '-prc-bottom',
      vert: true,
      beta: 100,
      offset: -DIM
    }, this.state.bottom_slide_data));
  }

};

PreactRepoCard = class PreactRepoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: null
    };
    Promise.all([fetchGithubRepoV3(props.user, props.repo, props.branch || 'master'), fetchGithubRepoV4(props.user, props.repo, props.branch || 'master')]).then((data) => {
      data = Object.assign(data[1], data[0]);
      console.log(data);
      return this.setState({
        repo: data
      });
    });
  }

  render() {
    return h(Slide, {
      className: '-prc-wrapper'
    }, h('div', {
      className: '-prc-overlay ' + (this.state.repo && '-prc-hidden' || '')
    }, h('img', {
      className: '-prc-git-api-logo',
      src: I_GITHUB
    }), h('img', {
      className: '-prc-center-logo',
      src: I_CHART
    })), this.state.repo && h(RepoContent, this.state.repo));
  }

};

module.exports = PreactRepoCard;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(5)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./preact-repo-card.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./preact-repo-card.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(false);
// imports


// module
exports.push([module.i, "@keyframes flickerAnimation {\n  0% {\n    opacity: 0.1;\n  }\n  50% {\n    opacity: 0.05;\n  }\n  100% {\n    opacity: 0.1;\n  }\n}\n.-prc-releases {\n  border-left: 1px solid #f1f1f1;\n  box-sizing: content-box;\n  flex-flow: wrap;\n}\n.-prc-releases .-prc-release {\n  padding: 10px;\n  width: 100%;\n}\n.-prc-releases .-prc-release-pre {\n  color: #FD9D5F;\n}\n.-prc-releases .-prc-release-draft {\n  color: #FC545C;\n}\n.-prc-releases .-prc-release-recent {\n  color: #1AAD03;\n}\n.-prc-release-date {\n  font-size: 11px !important;\n}\n.-prc-release-name {\n  font-weight: 600 !important;\n  line-height: 14px !important;\n  font-size: 16px !important;\n}\n.-prc-seperator {\n  color: #A8A8A8;\n  font-weight: 500;\n  margin: 0px 4px;\n}\n.-prc-header {\n  justify-content: flex-start;\n}\n.-prc-header * {\n  display: flex;\n  align-items: center;\n  line-height: 22px;\n}\n.-prc-header .-prc-header-name {\n  padding: 0px 12px;\n  font-size: 18;\n}\n.-prc-header .-prc-header-name-repo {\n  font-weight: 600;\n}\n.-prc-overlay {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 10;\n  background: #f8f8f8e3;\n  display: flex;\n  transition: opacity 0.4s ease;\n  align-items: center;\n  justify-content: center;\n}\n.-prc-overlay .img {\n  all: unset;\n}\n.-prc-overlay .-prc-git-api-logo {\n  animation: flickerAnimation 1s infinite;\n  opacity: 0.05;\n  width: 20px;\n  height: 20px;\n  position: absolute;\n  left: 10px;\n  top: 10px;\n}\n.-prc-overlay .-prc-center-logo {\n  animation: flickerAnimation 1s infinite;\n  opacity: 0.05;\n  width: 30px;\n  height: 30px;\n}\n.-prc-otrigger {\n  pointer-events: all;\n  cursor: pointer;\n}\n.-prc-wrapper {\n  font-size: 13px;\n  line-height: 15px;\n  border-radius: 2px;\n  box-sizing: border-box;\n  box-shadow: 0px 0px 2px #cccccc;\n  background: #F8F8F8;\n  color: #7E7E7E;\n}\n.-prc-wrapper a {\n  all: unset;\n  cursor: pointer;\n  display: inline-block;\n  font-weight: 500;\n  color: #545454;\n  transition: border-color 0.4s ease, color 0.4s ease;\n  border-bottom: 1px solid rgba(0, 0, 0, 0);\n  padding-bottom: 0px;\n}\n.-prc-wrapper a:hover {\n  color: black;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n}\n.-prc-wrapper .-prc-overlay-title-wrap {\n  display: flex;\n  flex-direction: column;\n  position: absolute;\n  margin: 10px;\n  right: 0px;\n  top: 0px;\n}\n.-prc-wrapper .-prc-overlay-title {\n  font-weight: 600;\n  color: #545454;\n  font-size: 20px;\n  line-height: 20px;\n}\n.-prc-wrapper .-prc-overlay-title-alt {\n  font-size: 13px;\n  font-weight: 400;\n  align-self: flex-end;\n  /* opacity: 0.6; */\n  max-width: 100px;\n  line-height: 13px;\n}\n.-prc-overlay-data {\n  position: absolute;\n  left: 5px;\n  bottom: 0px;\n  width: 100%;\n}\n.-prc-btn {\n  cursor: pointer;\n  color: #7E7E7E;\n}\n.-prc-btn img {\n  fill: #7E7E7E;\n}\n.-prc-btn-lang {\n  padding: 0px 8px;\n  justify-content: flex-start;\n  align-items: center;\n}\n.-prc-stat {\n  max-height: 50px;\n  flex-grow: 1;\n  line-height: 17px;\n  flex-flow: column;\n  opacity: 0.7;\n  transition: opacity 0.3s ease;\n}\n.-prc-stat:hover {\n  opacity: 1;\n}\n.-prc-stats {\n  cursor: pointer;\n}\n.-prc-stats svg {\n  transition: opacity 0.4s ease;\n}\n.-prc-bottom {\n  padding: 10px;\n}\n.-prc-cstatus img {\n  width: 11px;\n  margin: 0px 10px;\n}\n.-prc-issue-label {\n  font-size: 11px;\n  margin-right: 3px;\n  margin-bottom: 3px;\n  background: #ff6f00;\n  border-radius: 2px;\n  font-weight: 600;\n  display: inline-block;\n  color: white;\n  padding: 2px 6px;\n}\n.-prc-update {\n  justify-content: center;\n}\n.-prc-update-date {\n  padding: 0px 13px;\n  color: #7E7E7E;\n}\n.-prc-stats-scale-max {\n  position: absolute;\n  opacity: 0.6;\n  left: 5;\n  top: 0;\n  font-size: 11;\n}\n.-prc-stats-scale-min {\n  position: absolute;\n  opacity: 0.6;\n  font-size: 11;\n  left: 5;\n  bottom: 5;\n}\n.-prc-stats-scale-date {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: baseline;\n  line-height: 12px;\n  left: 0;\n  bottom: 0;\n  opacity: 0.6;\n  font-size: 11;\n  width: 100%;\n}\n.-prc-user-link {\n  all: unset !important;\n  cursor: pointer;\n}\n.-prc-user-link img {\n  all: unset;\n  cursor: pointer;\n  width: 26px;\n  background: #FFFFFF;\n  height: 26px;\n  border-radius: 2px;\n  box-shadow: 2px 2px 4px #efefef;\n}\n.-prc-lang-circle {\n  width: 10px;\n  height: 10px;\n  flex-shrink: 0;\n  border-radius: 50%;\n  margin: 0px 4px;\n}\n.-prc-hidden {\n  pointer-events: none;\n  opacity: 0;\n}\n.-prc-contributor {\n  padding: 10px;\n  align-items: center;\n}\n.-prc-contributor .-prc-user-contrib {\n  margin-left: 10px;\n  color: #656565;\n  font-weight: 600;\n}\n.-prc-commit {\n  padding: 0px 5px;\n  margin-bottom: 10px;\n}\n.-prc-commit .-prc-commit-date {\n  align-items: center;\n}\n.-prc-commit .-prc-commit-date img {\n  opacity: 0.7;\n}\n.-prc-commit .-prc-commit-body {\n  display: flex;\n  align-items: center;\n}\n.-prc-commit * {\n  margin: 0px 3px;\n}\n.-prc-commit .-prc-commit-id {\n  font-weight: 600;\n  margin: 0px 3px;\n}\n.-prc-commit .-prc-commit-status {\n  cursor: pointer;\n  width: 16px;\n  height: 16px;\n  background: #efefef;\n  padding: 2px;\n  border-radius: 2px;\n  margin: 1px;\n}\n.-prc-commit .-prc-commit-status:hover {\n  background: #E5E5E5;\n}\n.-prc-commit .-prc-commit-by {\n  opacity: 0.6;\n}\n.-prc-commit .-prc-commit-author {\n  width: 16px;\n  height: 16px;\n  border-radius: 50%;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(6);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Slide"] = factory();
	else
		root["Slide"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Component, DEFAULT_PROPS, EVENT_REGEX, Slide, h,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

__webpack_require__(1);

({h, Component} = __webpack_require__(6));

DEFAULT_PROPS = {
  vert: null, //css flex direction column
  beta: 100, //beta variable
  slide: false, //slides through children, if disabled will return a simplified wrapper
  pos: 0, //position of the slide
  auto: false, //auto dim based on content
  dim: 0, //dim is width/height but relative to split direction, so u dont have to ;)
  animate: false, //transitions
  ease: '0.4s cubic-bezier(0.25, 0.35, 0, 1)', //slide easing
  width: 0, //slide width manual override
  height: 0, //slide height manual override
  ratio: 0, //ratio dim helper
  center: false, //css flex center
  hide: true,
  inverse: false, //css flex direction inverse
  scroll: false, //css scroll overflow
  className: null,
  iclassName: null,
  offset: 0,
  x: null,
  y: null,
  align: false,
  outerChildren: null
};

EVENT_REGEX = new RegExp('^on[A-Z]');

/*
@Slide class
universal slide layout component.
*/
Slide = class Slide extends Component {
  constructor(props) {
    super(props);
    /*
    @componentDidMount method
    Mounting is double effort because calculating certain properties such as slide position is only possible after the component is mounted  If anyone knows a more performant way to ensure initial state integrity with a react based approach let me know.
    */
    this.componentDidMount = this.componentDidMount.bind(this);
    /*
    @componentWillUpdate method
    */
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    /*
    @componentWillUnmount method
    */
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    // @checkProps(props)
    this.isVisible = this.isVisible.bind(this);
    /*
    @getChildContext method
    */
    this.getChildContext = this.getChildContext.bind(this);
    /*
    @updateVisibility method
    update the visibility of slides that are not in the scrolled view
    */
    this.updateVisibility = this.updateVisibility.bind(this);
    /*
    @` method
    when slide animation is complete, this function is triggered.
    */
    this.onSlideDone = this.onSlideDone.bind(this);
    /*
    @onSlideStart method
    right before a slide animation starts, this function is triggered.
    */
    this.onSlideStart = this.onSlideStart.bind(this);
    /*
    @getBeta method
    get beta dimention variable for the slide, either in pixels or percentages.
    */
    this.getBeta = this.getBeta.bind(this);
    /*
    @getOuterHW method
    get outer height and width.
    */
    this.getOuterHW = this.getOuterHW.bind(this);
    //resize event
    this.resizeEvent = this.resizeEvent.bind(this);
    //ref to inner div
    this.inner_ref = this.inner_ref.bind(this);
    //ref to outer div
    this.outer_ref = this.outer_ref.bind(this);
    /*
    @renderSlide method
    render component as a slideable, when props.slide is enabled, an extra div is rendered for panning/sliding.
    */
    this.renderSlide = this.renderSlide.bind(this);
    /*
    @renderStatic method
    render component as a static and not slidable, this gets rendered when props.slide is not set. Just a static div with the same CSS.
    */
    this.renderStatic = this.renderStatic.bind(this);
    /*
    @render method
    */
    this.render = this.render.bind(this);
    this.state = {
      offset: 0,
      x: 0, //x pos of _inner
      y: 0, //y pos of _inner
      dim: 0 //width/height of _outer
    };
    this.outer_rect = {
      width: 0, //width of _outer
      height: 0 //height of _outer
    };
    this.visibility_map = new Map();
  }

  /*
  @componentWillMount method
  */
  componentWillMount() {
    this.passProps(this.props); //do stuff with props 
    return this.legacyProps(this.props); //legacy props support
  }

  componentDidMount() {
    boundMethodCheck(this, Slide);
    // console.log @_outer.parentElement.getBoundingClientRect()
    if (this.context.dim !== 0) {
      addEventListener('resize', this.resizeEvent);
    }
    if (this.context.dim !== 0 || this.props.slide) {
      return this.forceUpdate();
    }
  }

  componentWillUpdate() {
    boundMethodCheck(this, Slide);
    return this.calculateBounds();
  }

  /*
  @componentDidUpdate method
  */
  componentDidUpdate(p_props) {
    return this.checkSlideUpdate(p_props);
  }

  componentWillUnmount() {
    boundMethodCheck(this, Slide);
    return removeEventListener('resize', this.resizeEvent);
  }

  /*
  @componentWillReceiveProps method
  */
  componentWillReceiveProps(props) {
    this.passProps(props);
    return this.legacyProps(props);
  }

  isVisible(child) {
    boundMethodCheck(this, Slide);
    if (this.visibility_map.get(child._outer) === false && this.props.hide) {
      return false;
    }
    return true;
  }

  getChildContext() {
    boundMethodCheck(this, Slide);
    return {
      outer_width: this.outer_rect.width,
      outer_height: this.outer_rect.height,
      vert: this.props.vert || this.props.vert || false,
      count: this.props.children.length,
      isVisible: this.isVisible,
      dim: this.props.vert ? this.outer_rect.width : this.outer_rect.height,
      slide: this.props.slide,
      _i_slide: true
    };
  }

  /*
  @calculateBounds method
  calculate and store position and size.
  */
  calculateBounds() {
    return this.outer_rect = this._outer.getBoundingClientRect();
  }

  /*
  @legacyProps method
  support for different option keys
  */
  legacyProps(props) {
    if (!props.beta) {
      return props.beta = 100;
    }
  }

  // if props.size?
  // 	props.dim = props.size
  /*
  @inViewBounds method
  check to see if a line that starts at p with length d is overlapping a line starting at op with length od
  */
  inViewBounds(el_pos, el_size, parent_pos, parent_size) {
    return Math.round(el_pos + el_size) > Math.round(parent_pos) && Math.round(el_pos) < Math.round(parent_pos + parent_size);
  }

  updateVisibility(x, y, force_hide) {
    var child, i, j, len, rect, ref;
    boundMethodCheck(this, Slide);
    this.calculateBounds();
    ref = this._inner.children;
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      child = ref[i];
      rect = child.getBoundingClientRect();
      if ((!this.props.vert && this.inViewBounds(rect.x + x, rect.width, this.outer_rect.x, this.props.width || this.outer_rect.width)) || (this.props.vert && this.inViewBounds(rect.y + y, rect.height, this.outer_rect.y, this.props.height || this.outer_rect.height))) {
        this.visibility_map.set(child, true);
      } else if (force_hide) {
        this.visibility_map.set(child, false);
      }
    }
  }

  onSlideDone() {
    boundMethodCheck(this, Slide);
    if (!this._inner) {
      return;
    }
    if (this.props.hide) {
      this.visibility_map = new Map;
      this.updateVisibility(0, 0, true);
    }
    return this.setState({
      in_transition: false
    }, () => {
      var base;
      return typeof (base = this.props).onSlideDone === "function" ? base.onSlideDone(this.props.pos) : void 0;
    });
  }

  onSlideStart(x, y) {
    boundMethodCheck(this, Slide);
    if (this.props.hide) {
      return this.updateVisibility(x, y, false);
    }
  }

  /*
  @checkSlideUpdate method
  check if slide needs update, and update it if nessesary.
  */
  checkSlideUpdate(p_props) {
    var pos;
    if (!this._inner) {
      return false;
    }
    if (this.props.y !== null || this.props.x !== null) {
      pos = {
        x: this.props.x,
        y: this.props.y
      };
    } else {
      pos = this.getIndexXY(this.props.pos);
    }
    if (this.props.x !== p_props.x || this.props.y !== p_props.y || this.props.pos !== p_props.pos || this.props.offset !== p_props.offset) {
      return this.toXY(pos);
    }
    if (this.state.x !== pos.x || this.state.y !== pos.y || this.props.height !== p_props.height || this.props.width !== p_props.width || this.props.auto !== p_props.auto) {
      return this.setXY(pos);
    }
  }

  /*
  @getTransition method
  CSS transition easing/duration.
  */
  getTransition() {
    return 'transform ' + this.props.ease;
  }

  /*
  @toXY method
  CSS translate inner div to pos <x,y>
  */
  toXY(pos) {
    this.onSlideStart(this.state.x - pos.x, this.state.y - pos.y);
    return this.setState({
      in_transition: true,
      transition: this.getTransition(),
      transform: 'matrix(1, 0, 0, 1, ' + (-pos.x) + ', ' + (-pos.y) + ')',
      x: pos.x,
      y: pos.y
    });
  }

  /*
  @setXY method
  same as toXY but instant.
  */
  setXY(pos) {
    this.onSlideStart(this.state.x - pos.x, this.state.y - pos.y);
    return this.setState({
      in_transition: false,
      transition: '',
      transform: 'matrix(1, 0.00001, 0, 1, ' + (-pos.x) + ', ' + (-pos.y) + ')',
      x: pos.x,
      y: pos.y
    }, () => {
      return setTimeout(this.onSlideDone, 0);
    });
  }

  /*
  @passProps method
  Extract events from props and pass them down to underlying div if nessesary.
  */
  passProps(props) {
    var prop, prop_name, results;
    this.pass_props = {};
    results = [];
    for (prop_name in props) {
      prop = props[prop_name];
      if (EVENT_REGEX.test(prop_name)) {
        results.push(this.pass_props[prop_name] = prop);
      } else {
        results.push(void 0);
      }
    }
    return results;
  }

  roundDim(d) {
    var rd;
    rd = Math.round(d) - d;
    if (rd > -0.5 && rd < 0) {
      d = Math.round(d + 0.5);
    } else {
      d = Math.round(d);
    }
    return d;
  }

  getChildHeight(c) {
    var b;
    b = (c.attributes && c.attributes.beta) || 100;
    return (c.attributes && c.attributes.height) || (this.outer_rect.height / 100 * b);
  }

  getChildWidth(c) {
    var b;
    b = (c.attributes && c.attributes.beta) || 100;
    return (c.attributes && c.attributes.width) || (this.outer_rect.width / 100 * b);
  }

  /*
  @getIndexXY method
  Get the index x and y position of where we want to slide/pan
  */
  getIndexXY(index) {
    var _cc, cc, cc_rect, lc, max, o_h, o_w, x, y;
    if (index == null) {
      throw new Error('index position is undefined');
    }
    if (index >= this.props.children.length) {
      throw new Error('index position out of bounds');
    }
    x = 0;
    y = 0;
    cc = this._inner.children[Math.floor(index)];
    _cc = this.props.children[Math.floor(index)];
    cc_rect = cc.getBoundingClientRect();
    this.calculateBounds();
    o_h = this.outer_rect.height || this.props.height;
    o_w = this.outer_rect.width || this.props.width;
    if (this.props.vert) {
      if (cc.offsetTop > this.state.y) {
        if (cc.clientHeight >= o_h || this.props.align) {
          y = cc.offsetTop;
        } else {
          if (cc.offsetTop + cc.clientHeight <= this.state.y + o_h) {
            y = this.state.y;
          } else {
            y = cc.offsetTop - o_h + cc.clientHeight;
          }
        }
      } else {
        y = cc.offsetTop;
      }
      if ((index % 1) !== 0) {
        y += (Math.round((index % 1) * this.getChildHeight(_cc))) * (this.props.inverse && -1 || 1);
      }
    } else {
      if (cc.offsetLeft > this.state.x) {
        if (cc.clientWidth >= o_w || this.props.align) {
          x = cc.offsetLeft;
        } else {
          if (cc.offsetLeft + cc.clientWidth <= this.state.x + o_w) {
            x = this.state.x;
          } else {
            x = cc.offsetLeft - o_w + cc.clientWidth;
          }
        }
      } else {
        x = cc.offsetLeft;
      }
      if ((index % 1) !== 0) {
        x += Math.round((index % 1) * this.getChildWidth(_cc)) * (this.props.inverse && -1 || 1);
      }
    }
    lc = this._inner.children[this._inner.children.length - 1];
    if (this.props.vert) {
      max = lc.offsetTop - o_h + lc.clientHeight;
      if (y > max && max > 0) {
        y = max;
      }
    } else {
      max = lc.offsetLeft - o_w + lc.clientWidth;
      if (x > max && max > 0) {
        x = max;
      }
    }
    return {
      x: Math.round(x) || 0,
      y: Math.round(y) || 0
    };
  }

  getBeta() {
    var d, offs, sign;
    boundMethodCheck(this, Slide);
    if (!this.props.beta || this.props.beta < 0) {
      throw new Error('beta is ( <= 0 | null ) ');
    }
    if (!this.is_root && this.context.outer_width && !this.context.vert && this.context.slide) {
      d = this.context.outer_width / 100 * this.props.beta + this.props.offset;
      this.state.dim = this.roundDim(d);
      return this.state.dim + 'px';
    } else if (!this.is_root && this.context.outer_height && this.context.vert && this.context.slide) {
      d = this.context.outer_height / 100 * this.props.beta + this.props.offset;
      this.state.dim = this.roundDim(d);
      return this.state.dim + 'px';
    }
    // base case scenario, this is legacy fallback for relative betas using css % 
    // CSS % use subpixel calculations for positions, this creates artifact borders with many nested slides, therfore this method is instantly overwritten on the first rerender as soon as the parents are mounted and we can descend down and calculate the positions with rounded off pixels.
    if (this.props.offset) {
      sign = this.props.offset < 0 && '-' || '+';
      offs = Math.abs(this.props.offset);
    }
    // round beta hack attempt to avoid subpixel rounding artifacts. mildly tested and seems to work??
    if (this.context.count === 2 && (this.context.outer_width / 2 % Math.floor(this.context.outer_width / 2) === 0.5) && this._outer && this._outer.nextElementSibling) {
      if (offs) {
        return 'calc(' + this.props.beta + '% ' + sign + ' ' + (offs + 0.5) + 'px)';
      } else {
        return 'calc(' + this.props.beta + '% + 0.5px)';
      }
    } else {
      if (offs) {
        return 'calc(' + this.props.beta + '% ' + sign + ' ' + offs + 'px)';
      } else {
        return this.props.beta + '%';
      }
    }
  }

  getOuterHW() {
    var dim, height, ph, pw, vert, width;
    boundMethodCheck(this, Slide);
    // square slides copy the context width/height based on split direction, great for square divs...will resize automatically!
    if (this.props.ratio) {
      dim = {};
      if (this.context.vert) {
        dim.height = this.context.dim * this.props.ratio;
        dim.width = '100%';
      } else {
        //dim.height = '100%' CSS is weird...
        dim.width = this.context.dim * this.props.ratio;
      }
      return dim;
    }
    // w/h passed down from props override
    if (this.context.vert) {
      width = this.props.width || null;
      height = this.props.dim || this.props.height || null;
    } else {
      width = this.props.dim || this.props.width || null;
      height = this.props.height || null;
    }
    if (this.props.vert == null) {
      vert = this.context.vert;
    } else {
      vert = this.props.vert;
    }
    if (vert && this.props.auto) {
      ph = 'auto';
    } else if (height) {
      ph = height + 'px';
    }
    if (!vert && this.props.auto) {
      pw = 'auto';
    } else if (width) {
      pw = width + 'px';
    }
    
    // insert calculated beta if width or height is still null
    if (this.context.vert) {
      pw = pw || '100%';
      ph = ph || this.getBeta();
    } else {
      pw = pw || this.getBeta();
      ph = ph || '100%'; //CSS is weird...
    }
    return {
      height: ph,
      width: pw
    };
  }

  resizeEvent() {
    boundMethodCheck(this, Slide);
    return this.forceUpdate();
  }

  inner_ref(e) {
    boundMethodCheck(this, Slide);
    return this._inner = e;
  }

  outer_ref(e) {
    boundMethodCheck(this, Slide);
    return this._outer = e;
  }

  renderSlide() {
    var c_name, class_auto, class_center, class_fixed, class_reverse, class_vert, hidden, inner_c_name, inner_props, slide_props;
    boundMethodCheck(this, Slide);
    inner_c_name = this.props.iclassName && (" " + this.props.iclassName) || '';
    c_name = this.props.className && (" " + this.props.className) || '';
    class_center = this.props.center && ' -i-s-center' || '';
    class_vert = this.props.vert && ' -i-s-vertical' || '';
    class_fixed = ((this.props.ratio || this.props.dim || this.props.width || this.props.height) && ' -i-s-fixed') || '';
    class_reverse = this.props.inverse && ' -i-s-reverse' || '';
    // class_scroll = @props.scroll && ' -i-s-scroll' || ''
    class_auto = this.props.auto && ' -i-s-auto' || '';
    inner_props = {
      ref: this.inner_ref,
      style: {
        transform: this.state.transform
      },
      className: "-i-s-inner" + class_vert + inner_c_name + class_center + class_reverse + class_auto
    };
    if (this.state.transition) {
      inner_props.style.transition = this.state.transition;
    }
    if (this.props.innerStyle) {
      inner_props.style = Object.assign(inner_props.style, this.props.innerStyle);
    }
    inner_props.onTransitionEnd = this.onSlideDone;
    slide_props = this.pass_props;
    slide_props.ref = this.outer_ref;
    slide_props.className = "-i-s-outer" + c_name + class_fixed;
    if (this.context._i_slide || this.props.height || this.props.width) {
      slide_props.style = this.getOuterHW();
    }
    if (this.props.outerStyle || this.props.style) {
      slide_props.style = Object.assign(slide_props.style, this.props.outerStyle || this.props.style);
    }
    hidden = this.context.isVisible && !this.context.isVisible(this) || false;
    if (hidden) {
      slide_props.style.visibility = 'hidden';
    }
    return h('div', slide_props, !hidden && h('div', inner_props, this.props.children), !hidden && this.props.outerChildren);
  }

  renderStatic() {
    var c_name, class_center, class_fixed, class_reverse, class_scroll, class_vert, hidden, outer_props;
    boundMethodCheck(this, Slide);
    // inner_c_name = @props.iclassName && (" "+@props.iclassName) || ''
    c_name = this.props.className && (" " + this.props.className) || '';
    class_center = this.props.center && ' -i-s-center' || '';
    class_vert = this.props.vert && ' -i-s-vertical' || '';
    class_fixed = ((this.props.ratio || this.props.dim || this.props.width || this.props.height) && ' -i-s-fixed') || '';
    class_reverse = this.props.inverse && ' -i-s-reverse' || '';
    class_scroll = this.props.scroll && ' -i-s-scroll' || '';
    outer_props = this.pass_props || {};
    hidden = this.context.isVisible && !this.context.isVisible(this) || false;
    if (this.context._i_slide || this.props.height || this.props.width) {
      outer_props.style = this.getOuterHW();
      if (hidden) {
        outer_props.style.visibility = 'hidden';
      }
    }
    outer_props.className = "-i-s-static" + c_name + class_fixed + class_vert + class_center + class_reverse + class_scroll;
    outer_props.id = this.props.id;
    outer_props.ref = this.outer_ref;
    if (this.props.outerStyle || this.props.style) {
      outer_props.style = Object.assign(outer_props.style || {}, this.props.outerStyle || this.props.style);
    }
    if (this.context.isVisible && !this.context.isVisible(this)) {
      return h('div', outer_props);
    } else {
      return h('div', outer_props, this.props.children, this.props.outerChildren);
    }
  }

  render() {
    boundMethodCheck(this, Slide);
    if (this.props.slide) {
      return this.renderSlide();
    } else {
      return this.renderStatic();
    }
  }

};

Slide.defaultProps = DEFAULT_PROPS;

module.exports = Slide;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./preact-slide.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/cjs.js!./preact-slide.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(false);
// imports


// module
exports.push([module.i, ".-i-s-fixed {\n  transform: none !important;\n  flex-shrink: 0;\n}\n.-i-s-center {\n  align-items: center;\n  display: flex;\n  align-content: center;\n  justify-content: center;\n}\n.-i-s-static {\n  box-sizing: border-box;\n  position: relative;\n  flex-direction: row;\n  display: flex;\n  overflow: hidden;\n}\n.-i-s-static.-i-s-reverse {\n  flex-direction: row-reverse;\n}\n.-i-s-outer {\n  position: relative;\n  overflow: hidden;\n}\n.-i-s-inner {\n  height: 100%;\n  display: flex;\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n}\n.-i-s-inner > .-i-s-in {\n  transition: transform 0.3s cubic-bezier(0, 0.93, 0.27, 1);\n  transform: scale(1) rotateY(0deg) !important;\n}\n.-i-s-inner > .-i-s-in_pre.-i-s-right {\n  transform-origin: 0% 50%;\n  transform: scale(1) rotateY(10deg);\n}\n.-i-s-inner > .-i-s-in_pre.-i-s-left {\n  transform-origin: 100% 50%;\n  transform: scale(1) rotateY(-10deg);\n}\n.-i-s-inner.-i-s-reverse {\n  flex-direction: row-reverse;\n}\n.-i-s-inner > .-i-s-outer {\n  flex-shrink: 0;\n}\n.-i-s-inner > .-i-s-static {\n  flex-shrink: 0;\n}\n.-i-s-horizontal {\n  flex-direction: row;\n}\n.-i-s-vertical {\n  flex-direction: column;\n}\n.-i-s-vertical.-i-s-inner {\n  height: 100%;\n}\n.-i-s-vertical > .-i-s-in_pre.-i-s-right {\n  transform-origin: 50% 0%;\n  transform: scale(1) rotateX(-60deg);\n}\n.-i-s-vertical > .-i-s-in_pre.-i-s-left {\n  transform-origin: 50% 100%;\n  transform: scale(1) rotateX(60deg);\n}\n.-i-s-vertical.-i-s-reverse {\n  flex-direction: column-reverse;\n}\n.-i-s-scroll {\n  overflow-x: scroll;\n  -webkit-overflow-scrolling: touch;\n  overflow-y: hidden;\n}\n.-i-s-scroll.-i-s-vertical {\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __webpack_require__(0);

/***/ })
/******/ ]);
});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0zLjUgMTguNDlsNi02LjAxIDQgNEwyMiA2LjkybC0xLjQxLTEuNDEtNy4wOSA3Ljk3LTQtNEwyIDE2Ljk5eiIvPgogICAgPHBhdGggZD0iTTAgMGgyNHYyNEgweiIgZmlsbD0ibm9uZSIvPgo8L3N2Zz4="

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0zIDE4aDE4di0ySDN2MnptMC01aDE4di0ySDN2MnptMC03djJoMThWNkgzeiIvPgo8L3N2Zz4="

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtbGFiZWxsZWRieT0iZ2l0aHViLWljb24iIHJvbGU9ImltZyIgdmlld0JveD0iMCAwIDE2IDE2Ij48dGl0bGU+R2l0SHViIGljb248L3RpdGxlPjxwYXRoIGQ9Ik04IDBDMy41OCAwIDAgMy41OCAwIDhjMCAzLjU0IDIuMjkgNi41MyA1LjQ3IDcuNTkuNC4wNy41NS0uMTcuNTUtLjM4IDAtLjE5LS4wMS0uODItLjAxLTEuNDktMi4wMS4zNy0yLjUzLS40OS0yLjY5LS45NC0uMDktLjIzLS40OC0uOTQtLjgyLTEuMTMtLjI4LS4xNS0uNjgtLjUyLS4wMS0uNTMuNjMtLjAxIDEuMDguNTggMS4yMy44Mi43MiAxLjIxIDEuODcuODcgMi4zMy42Ni4wNy0uNTIuMjgtLjg3LjUxLTEuMDctMS43OC0uMi0zLjY0LS44OS0zLjY0LTMuOTUgMC0uODcuMzEtMS41OS44Mi0yLjE1LS4wOC0uMi0uMzYtMS4wMi4wOC0yLjEyIDAgMCAuNjctLjIxIDIuMi44Mi42NC0uMTggMS4zMi0uMjcgMi0uMjcuNjggMCAxLjM2LjA5IDIgLjI3IDEuNTMtMS4wNCAyLjItLjgyIDIuMi0uODIuNDQgMS4xLjE2IDEuOTIuMDggMi4xMi41MS41Ni44MiAxLjI3LjgyIDIuMTUgMCAzLjA3LTEuODcgMy43NS0zLjY1IDMuOTUuMjkuMjUuNTQuNzMuNTQgMS40OCAwIDEuMDctLjAxIDEuOTMtLjAxIDIuMiAwIC4yMS4xNS40Ni41NS4zOEE4LjAxMyA4LjAxMyAwIDAgMCAxNiA4YzAtNC40Mi0zLjU4LTgtOC04eiIvPjwvc3ZnPg=="

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xNCA0bDIuMjkgMi4yOS0yLjg4IDIuODggMS40MiAxLjQyIDIuODgtMi44OEwyMCAxMFY0em0tNCAwSDR2NmwyLjI5LTIuMjkgNC43MSA0LjdWMjBoMnYtOC40MWwtNS4yOS01LjN6Ii8+Cjwvc3ZnPg=="

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiA0LjVDNyA0LjUgMi43MyA3LjYxIDEgMTJjMS43MyA0LjM5IDYgNy41IDExIDcuNXM5LjI3LTMuMTEgMTEtNy41Yy0xLjczLTQuMzktNi03LjUtMTEtNy41ek0xMiAxN2MtMi43NiAwLTUtMi4yNC01LTVzMi4yNC01IDUtNSA1IDIuMjQgNSA1LTIuMjQgNS01IDV6bTAtOGMtMS42NiAwLTMgMS4zNC0zIDNzMS4zNCAzIDMgMyAzLTEuMzQgMy0zLTEuMzQtMy0zLTN6Ii8+Cjwvc3ZnPg=="

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xMiAxNy4yN0wxOC4xOCAyMWwtMS42NC03LjAzTDIyIDkuMjRsLTcuMTktLjYxTDEyIDIgOS4xOSA4LjYzIDIgOS4yNGw1LjQ2IDQuNzNMNS44MiAyMXoiLz4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KPC9zdmc+"

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0yMS40MSAxMS41OGwtOS05QzEyLjA1IDIuMjIgMTEuNTUgMiAxMSAySDRjLTEuMSAwLTIgLjktMiAydjdjMCAuNTUuMjIgMS4wNS41OSAxLjQybDkgOWMuMzYuMzYuODYuNTggMS40MS41OC41NSAwIDEuMDUtLjIyIDEuNDEtLjU5bDctN2MuMzctLjM2LjU5LS44Ni41OS0xLjQxIDAtLjU1LS4yMy0xLjA2LS41OS0xLjQyek01LjUgN0M0LjY3IDcgNCA2LjMzIDQgNS41UzQuNjcgNCA1LjUgNCA3IDQuNjcgNyA1LjUgNi4zMyA3IDUuNSA3eiIvPgo8L3N2Zz4="

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xNiAxMWMxLjY2IDAgMi45OS0xLjM0IDIuOTktM1MxNy42NiA1IDE2IDVjLTEuNjYgMC0zIDEuMzQtMyAzczEuMzQgMyAzIDN6bS04IDBjMS42NiAwIDIuOTktMS4zNCAyLjk5LTNTOS42NiA1IDggNUM2LjM0IDUgNSA2LjM0IDUgOHMxLjM0IDMgMyAzem0wIDJjLTIuMzMgMC03IDEuMTctNyAzLjVWMTloMTR2LTIuNWMwLTIuMzMtNC42Ny0zLjUtNy0zLjV6bTggMGMtLjI5IDAtLjYyLjAyLS45Ny4wNSAxLjE2Ljg0IDEuOTcgMS45NyAxLjk3IDMuNDVWMTloNnYtMi41YzAtMi4zMy00LjY3LTMuNS03LTMuNXoiLz4KPC9zdmc+"

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMFYweiIgZmlsbD0ibm9uZSIvPgogICAgPHBhdGggZD0iTTExIDE1aDJ2MmgtMnptMC04aDJ2NmgtMnptLjk5LTVDNi40NyAyIDIgNi40OCAyIDEyczQuNDcgMTAgOS45OSAxMEMxNy41MiAyMiAyMiAxNy41MiAyMiAxMlMxNy41MiAyIDExLjk5IDJ6TTEyIDIwYy00LjQyIDAtOC0zLjU4LTgtOHMzLjU4LTggOC04IDggMy41OCA4IDgtMy41OCA4LTggOHoiLz4KPC9zdmc+"

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgY2xhc3M9Im9jdGljb24gb2N0aWNvbi1naXQtYnJhbmNoIiBoZWlnaHQ9IjE2IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMCAxNiIgd2lkdGg9IjEwIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMCA1YzAtMS4xMS0uODktMi0yLTJhMS45OTMgMS45OTMgMCAwIDAtMSAzLjcydi4zYy0uMDIuNTItLjIzLjk4LS42MyAxLjM4LS40LjQtLjg2LjYxLTEuMzguNjMtLjgzLjAyLTEuNDguMTYtMiAuNDVWNC43MmExLjk5MyAxLjk5MyAwIDAgMC0xLTMuNzJDLjg4IDEgMCAxLjg5IDAgM2EyIDIgMCAwIDAgMSAxLjcydjYuNTZjLS41OS4zNS0xIC45OS0xIDEuNzIgMCAxLjExLjg5IDIgMiAyIDEuMTEgMCAyLS44OSAyLTIgMC0uNTMtLjItMS0uNTMtMS4zNi4wOS0uMDYuNDgtLjQxLjU5LS40Ny4yNS0uMTEuNTYtLjE3Ljk0LS4xNyAxLjA1LS4wNSAxLjk1LS40NSAyLjc1LTEuMjVTOC45NSA3Ljc3IDkgNi43M2gtLjAyQzkuNTkgNi4zNyAxMCA1LjczIDEwIDV6TTIgMS44Yy42NiAwIDEuMi41NSAxLjIgMS4yIDAgLjY1LS41NSAxLjItMS4yIDEuMkMxLjM1IDQuMi44IDMuNjUuOCAzYzAtLjY1LjU1LTEuMiAxLjItMS4yem0wIDEyLjQxYy0uNjYgMC0xLjItLjU1LTEuMi0xLjIgMC0uNjUuNTUtMS4yIDEuMi0xLjIuNjUgMCAxLjIuNTUgMS4yIDEuMiAwIC42NS0uNTUgMS4yLTEuMiAxLjJ6bTYtOGMtLjY2IDAtMS4yLS41NS0xLjItMS4yIDAtLjY1LjU1LTEuMiAxLjItMS4yLjY1IDAgMS4yLjU1IDEuMiAxLjIgMCAuNjUtLjU1IDEuMi0xLjIgMS4yeiI+PC9wYXRoPjwvc3ZnPg=="

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMjM4MTM2IiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik05IDE2LjE3TDQuODMgMTJsLTEuNDIgMS40MUw5IDE5IDIxIDdsLTEuNDEtMS40MXoiLz4KPC9zdmc+"

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjQTIwMzBCIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0xOSA2LjQxTDE3LjU5IDUgMTIgMTAuNTkgNi40MSA1IDUgNi40MSAxMC41OSAxMiA1IDE3LjU5IDYuNDEgMTkgMTIgMTMuNDEgMTcuNTkgMTkgMTkgMTcuNTkgMTMuNDEgMTJ6Ii8+CiAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+Cjwvc3ZnPg=="

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBpZD0iaWNvbi1jb21taXQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9ICcxNnB4JyBoZWlnaHQ9JzE2cHgnIHZpZXdCb3g9IjAgMCAxNyAxNyIgY2xhc3M9Imljb24iPjxzdHlsZT4uc3Qwe2ZpbGw6bm9uZTtzdHJva2U6IzlkOWQ5ZDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTB9PC9zdHlsZT48Y2lyY2xlIGNsYXNzPSJzdDAiIGN4PSI4LjUxIiBjeT0iOC41IiByPSIzLjUiPjwvY2lyY2xlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0xNi41IDguNWgtNC40OW0tNyAwSC41Ij48L3BhdGg+PC9zdmc+"

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0U3RTdFIiBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8ZGVmcz4KICAgICAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDBWMHoiIGlkPSJhIi8+CiAgICA8L2RlZnM+CiAgICA8Y2xpcFBhdGggaWQ9ImIiPgogICAgICAgIDx1c2Ugb3ZlcmZsb3c9InZpc2libGUiIHhsaW5rOmhyZWY9IiNhIi8+CiAgICA8L2NsaXBQYXRoPgogICAgPHBhdGggY2xpcC1wYXRoPSJ1cmwoI2IpIiBkPSJNMjEgMTAuMTJoLTYuNzhsMi43NC0yLjgyYy0yLjczLTIuNy03LjE1LTIuOC05Ljg4LS4xLTIuNzMgMi43MS0yLjczIDcuMDggMCA5Ljc5IDIuNzMgMi43MSA3LjE1IDIuNzEgOS44OCAwQzE4LjMyIDE1LjY1IDE5IDE0LjA4IDE5IDEyLjFoMmMwIDEuOTgtLjg4IDQuNTUtMi42NCA2LjI5LTMuNTEgMy40OC05LjIxIDMuNDgtMTIuNzIgMC0zLjUtMy40Ny0zLjUzLTkuMTEtLjAyLTEyLjU4IDMuNTEtMy40NyA5LjE0LTMuNDcgMTIuNjUgMEwyMSAzdjcuMTJ6TTEyLjUgOHY0LjI1bDMuNSAyLjA4LS43MiAxLjIxTDExIDEzVjhoMS41eiIvPgo8L3N2Zz4="

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_shape_src_line__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "line", function() { return __WEBPACK_IMPORTED_MODULE_0_d3_shape_src_line__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3_shape_src_curve_monotone__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "curveMonotoneX", function() { return __WEBPACK_IMPORTED_MODULE_1_d3_shape_src_curve_monotone__["a"]; });


// export {default as scaleLinear} from "d3-scale/src/linear";

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3_path__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constant__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__curve_linear__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__point__ = __webpack_require__(28);





/* harmony default export */ __webpack_exports__["a"] = (function() {
  var x = __WEBPACK_IMPORTED_MODULE_3__point__["a" /* x */],
      y = __WEBPACK_IMPORTED_MODULE_3__point__["b" /* y */],
      defined = Object(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(true),
      context = null,
      curve = __WEBPACK_IMPORTED_MODULE_2__curve_linear__["a" /* default */],
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = Object(__WEBPACK_IMPORTED_MODULE_0_d3_path__["a" /* path */])());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x(d, i, data), +y(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : Object(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), line) : x;
  };

  line.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : Object(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(+_), line) : y;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : Object(__WEBPACK_IMPORTED_MODULE_1__constant__["a" /* default */])(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_path__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_path__["a"]; });



/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon)) {}

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (path);


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (function(x) {
  return function constant() {
    return x;
  };
});


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (function(context) {
  return new Linear(context);
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = x;
/* harmony export (immutable) */ __webpack_exports__["b"] = y;
function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = monotoneX;
/* unused harmony export monotoneY */
function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
}

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;(function (main) {
  'use strict';

  /**
   * Parse or format dates
   * @class fecha
   */
  var fecha = {};
  var token = /d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g;
  var twoDigits = /\d\d?/;
  var threeDigits = /\d{3}/;
  var fourDigits = /\d{4}/;
  var word = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
  var literal = /\[([^]*?)\]/gm;
  var noop = function () {
  };

  function shorten(arr, sLen) {
    var newArr = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      newArr.push(arr[i].substr(0, sLen));
    }
    return newArr;
  }

  function monthUpdate(arrName) {
    return function (d, v, i18n) {
      var index = i18n[arrName].indexOf(v.charAt(0).toUpperCase() + v.substr(1).toLowerCase());
      if (~index) {
        d.month = index;
      }
    };
  }

  function pad(val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) {
      val = '0' + val;
    }
    return val;
  }

  var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var monthNamesShort = shorten(monthNames, 3);
  var dayNamesShort = shorten(dayNames, 3);
  fecha.i18n = {
    dayNamesShort: dayNamesShort,
    dayNames: dayNames,
    monthNamesShort: monthNamesShort,
    monthNames: monthNames,
    amPm: ['am', 'pm'],
    DoFn: function DoFn(D) {
      return D + ['th', 'st', 'nd', 'rd'][D % 10 > 3 ? 0 : (D - D % 10 !== 10) * D % 10];
    }
  };

  var formatFlags = {
    D: function(dateObj) {
      return dateObj.getDate();
    },
    DD: function(dateObj) {
      return pad(dateObj.getDate());
    },
    Do: function(dateObj, i18n) {
      return i18n.DoFn(dateObj.getDate());
    },
    d: function(dateObj) {
      return dateObj.getDay();
    },
    dd: function(dateObj) {
      return pad(dateObj.getDay());
    },
    ddd: function(dateObj, i18n) {
      return i18n.dayNamesShort[dateObj.getDay()];
    },
    dddd: function(dateObj, i18n) {
      return i18n.dayNames[dateObj.getDay()];
    },
    M: function(dateObj) {
      return dateObj.getMonth() + 1;
    },
    MM: function(dateObj) {
      return pad(dateObj.getMonth() + 1);
    },
    MMM: function(dateObj, i18n) {
      return i18n.monthNamesShort[dateObj.getMonth()];
    },
    MMMM: function(dateObj, i18n) {
      return i18n.monthNames[dateObj.getMonth()];
    },
    YY: function(dateObj) {
      return String(dateObj.getFullYear()).substr(2);
    },
    YYYY: function(dateObj) {
      return dateObj.getFullYear();
    },
    h: function(dateObj) {
      return dateObj.getHours() % 12 || 12;
    },
    hh: function(dateObj) {
      return pad(dateObj.getHours() % 12 || 12);
    },
    H: function(dateObj) {
      return dateObj.getHours();
    },
    HH: function(dateObj) {
      return pad(dateObj.getHours());
    },
    m: function(dateObj) {
      return dateObj.getMinutes();
    },
    mm: function(dateObj) {
      return pad(dateObj.getMinutes());
    },
    s: function(dateObj) {
      return dateObj.getSeconds();
    },
    ss: function(dateObj) {
      return pad(dateObj.getSeconds());
    },
    S: function(dateObj) {
      return Math.round(dateObj.getMilliseconds() / 100);
    },
    SS: function(dateObj) {
      return pad(Math.round(dateObj.getMilliseconds() / 10), 2);
    },
    SSS: function(dateObj) {
      return pad(dateObj.getMilliseconds(), 3);
    },
    a: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0] : i18n.amPm[1];
    },
    A: function(dateObj, i18n) {
      return dateObj.getHours() < 12 ? i18n.amPm[0].toUpperCase() : i18n.amPm[1].toUpperCase();
    },
    ZZ: function(dateObj) {
      var o = dateObj.getTimezoneOffset();
      return (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4);
    }
  };

  var parseFlags = {
    D: [twoDigits, function (d, v) {
      d.day = v;
    }],
    Do: [new RegExp(twoDigits.source + word.source), function (d, v) {
      d.day = parseInt(v, 10);
    }],
    M: [twoDigits, function (d, v) {
      d.month = v - 1;
    }],
    YY: [twoDigits, function (d, v) {
      var da = new Date(), cent = +('' + da.getFullYear()).substr(0, 2);
      d.year = '' + (v > 68 ? cent - 1 : cent) + v;
    }],
    h: [twoDigits, function (d, v) {
      d.hour = v;
    }],
    m: [twoDigits, function (d, v) {
      d.minute = v;
    }],
    s: [twoDigits, function (d, v) {
      d.second = v;
    }],
    YYYY: [fourDigits, function (d, v) {
      d.year = v;
    }],
    S: [/\d/, function (d, v) {
      d.millisecond = v * 100;
    }],
    SS: [/\d{2}/, function (d, v) {
      d.millisecond = v * 10;
    }],
    SSS: [threeDigits, function (d, v) {
      d.millisecond = v;
    }],
    d: [twoDigits, noop],
    ddd: [word, noop],
    MMM: [word, monthUpdate('monthNamesShort')],
    MMMM: [word, monthUpdate('monthNames')],
    a: [word, function (d, v, i18n) {
      var val = v.toLowerCase();
      if (val === i18n.amPm[0]) {
        d.isPm = false;
      } else if (val === i18n.amPm[1]) {
        d.isPm = true;
      }
    }],
    ZZ: [/([\+\-]\d\d:?\d\d|Z)/, function (d, v) {
      if (v === 'Z') v = '+00:00';
      var parts = (v + '').match(/([\+\-]|\d\d)/gi), minutes;

      if (parts) {
        minutes = +(parts[1] * 60) + parseInt(parts[2], 10);
        d.timezoneOffset = parts[0] === '+' ? minutes : -minutes;
      }
    }]
  };
  parseFlags.dd = parseFlags.d;
  parseFlags.dddd = parseFlags.ddd;
  parseFlags.DD = parseFlags.D;
  parseFlags.mm = parseFlags.m;
  parseFlags.hh = parseFlags.H = parseFlags.HH = parseFlags.h;
  parseFlags.MM = parseFlags.M;
  parseFlags.ss = parseFlags.s;
  parseFlags.A = parseFlags.a;


  // Some common format strings
  fecha.masks = {
    default: 'ddd MMM DD YYYY HH:mm:ss',
    shortDate: 'M/D/YY',
    mediumDate: 'MMM D, YYYY',
    longDate: 'MMMM D, YYYY',
    fullDate: 'dddd, MMMM D, YYYY',
    shortTime: 'HH:mm',
    mediumTime: 'HH:mm:ss',
    longTime: 'HH:mm:ss.SSS'
  };

  /***
   * Format a date
   * @method format
   * @param {Date|number} dateObj
   * @param {string} mask Format of the date, i.e. 'mm-dd-yy' or 'shortDate'
   */
  fecha.format = function (dateObj, mask, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n;

    if (typeof dateObj === 'number') {
      dateObj = new Date(dateObj);
    }

    if (Object.prototype.toString.call(dateObj) !== '[object Date]' || isNaN(dateObj.getTime())) {
      throw new Error('Invalid Date in fecha.format');
    }

    mask = fecha.masks[mask] || mask || fecha.masks['default'];

    var literals = [];

    // Make literals inactive by replacing them with ??
    mask = mask.replace(literal, function($0, $1) {
      literals.push($1);
      return '??';
    });
    // Apply formatting rules
    mask = mask.replace(token, function ($0) {
      return $0 in formatFlags ? formatFlags[$0](dateObj, i18n) : $0.slice(1, $0.length - 1);
    });
    // Inline literal values back into the formatted value
    return mask.replace(/\?\?/g, function() {
      return literals.shift();
    });
  };

  /**
   * Parse a date string into an object, changes - into /
   * @method parse
   * @param {string} dateStr Date string
   * @param {string} format Date parse format
   * @returns {Date|boolean}
   */
  fecha.parse = function (dateStr, format, i18nSettings) {
    var i18n = i18nSettings || fecha.i18n;

    if (typeof format !== 'string') {
      throw new Error('Invalid format in fecha.parse');
    }

    format = fecha.masks[format] || format;

    // Avoid regular expression denial of service, fail early for really long strings
    // https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS
    if (dateStr.length > 1000) {
      return false;
    }

    var isValid = true;
    var dateInfo = {};
    format.replace(token, function ($0) {
      if (parseFlags[$0]) {
        var info = parseFlags[$0];
        var index = dateStr.search(info[0]);
        if (!~index) {
          isValid = false;
        } else {
          dateStr.replace(info[0], function (result) {
            info[1](dateInfo, result, i18n);
            dateStr = dateStr.substr(index + result.length);
            return result;
          });
        }
      }

      return parseFlags[$0] ? '' : $0.slice(1, $0.length - 1);
    });

    if (!isValid) {
      return false;
    }

    var today = new Date();
    if (dateInfo.isPm === true && dateInfo.hour != null && +dateInfo.hour !== 12) {
      dateInfo.hour = +dateInfo.hour + 12;
    } else if (dateInfo.isPm === false && +dateInfo.hour === 12) {
      dateInfo.hour = 0;
    }

    var date;
    if (dateInfo.timezoneOffset != null) {
      dateInfo.minute = +(dateInfo.minute || 0) - +dateInfo.timezoneOffset;
      date = new Date(Date.UTC(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0));
    } else {
      date = new Date(dateInfo.year || today.getFullYear(), dateInfo.month || 0, dateInfo.day || 1,
        dateInfo.hour || 0, dateInfo.minute || 0, dateInfo.second || 0, dateInfo.millisecond || 0);
    }
    return date;
  };

  /* istanbul ignore next */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = fecha;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return fecha;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    main.fecha = fecha;
  }
})(this);


/***/ })
/******/ ]);
});