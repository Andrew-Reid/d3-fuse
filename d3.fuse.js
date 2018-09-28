/*v0.0.2*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-quadtree')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-quadtree'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3)); }(this, (function (exports,d3Quadtree) { 'use strict';
	
var c = function(f) { return (typeof f == "function") ? f : (function() { return f; }) }
	
var fuse = function(n) {
  var nodes = n || [], padding = 0, pi = Math.PI;
  var x = function(d) { return d.x; }, 
    y = function(d) { return d.y; }, 
	r = function(d) { return d.r; },
	a = function(d) { return r(d) * r(d) * Math.PI; }

  function fuse() { initializeNodes(), step(); return nodes; }

  function cluster() {
    var tree = d3Quadtree.quadtree(nodes, function(d) { return d.layout.x; }, function(d) { return d.layout.y; }).visitAfter(prepare);
    var n0;  		// Current Node, n1 = comparison node.
    var count = 0;  // Number of merges for a given cycle
    for (var i = 0; i < nodes.length; ++i) n0 = nodes[i], tree.visit(apply);
	
	function apply(qn, x0, y0, x1, y1) {
      var n1 = qn.data;
      var r = qn.r + n0.layout.r;
      if (n1 && n1.index > n0.index && n1.layout.a && n0.layout.a) {    
          var x = n0.layout.x - n1.layout.x || 1e-6;
          var y = n0.layout.y - n1.layout.y || 1e-6;
          var l = Math.sqrt(x * x + y * y);
          if (l < r + padding) {							// If merge required
            l = (r - l) / l;
			count++;
			// Merge logic				
			var a,b;
			if(n1.layout.a > n0.layout.a) a = n1, b = n0;  	// Node1 absorbs Node0
			else a = n0, b = n1; 			 				// Node0 absorbs Node1
			// Merge nodes:
			a.layout.x = (a.layout.x * a.layout.a + b.layout.x * b.layout.a)/(a.layout.a + b.layout.a);
			a.layout.y = (a.layout.y * a.layout.a + b.layout.y * b.layout.a)/(b.layout.a + a.layout.a);
			a.layout.count += b.layout.count;
			a.layout.a += b.layout.a;
			a.layout.r = Math.sqrt(a.layout.a/pi);
			b.layout.r = b.layout.a = 0;
			a.layout.children.push(b), b.layout.parent = a;
        }
        return;
      }
     return x0 > n0.layout.x + r || x1 < n0.layout.x - r || y0 > n0.layout.y + r || y1 < n0.layout.y - r;
    }
	return count;
  }

  function prepare(n) {
    if (n.data) return n.r = n.data.layout.r;
    for (var i = n.r = 0; i < 4; ++i) {	
      if (n[i] && n[i].r > n.r) {  
        n.r = n[i].r;
      }
    }
  }

  function step() { if(cluster()) step(); }	

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
	  node.layout =  { x:x(node), y:y(node), a: a(node), r: r(node), count: 1, children: [], parent: {} } 
    }
  }
  
  fuse.nodes = function(_) { return arguments.length ? (nodes = _, fuse) : nodes; }
  fuse.padding = function(_) { return arguments.length ? (padding = _, fuse) : padding; }
  fuse.radius = function(_) { return arguments.length ? (r = c(_), fuse) : r; }
  fuse.area = function(_) { return arguments.length ? (a = c(_), fuse) : a;  }
  fuse.x = function(_) { x = c(_); return fuse;  }
  fuse.y = function(_) { y = c(_); return fuse;  } 
  fuse.defuse = function() { nodes.forEach(function(n) { delete n.layout; }); return fuse; }  
  fuse.step = function() { initializeNodes(); cluster(); return fuse; }
  fuse.fuse = function() { fuse(); return fuse; }
  return fuse;
};

exports.fuse = fuse;
Object.defineProperty(exports, '__esModule', { value: true });
})));
