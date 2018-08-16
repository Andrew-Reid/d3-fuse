# d3-fuse

D3-fuse clusters circles by overlap. Overlap can be determined merely on radius or an additional padding specifier can be added. D3-fuse uses D3-quadtree in order to search for overlapping nodes, this is the only D3 dependency.

*This is a related project of my initial [cluster attempt](https://github.com/Andrew-Reid/d3-marker-cluster) which uses a modified force layout (I intend to continue that as a force for force layouts).* 

To determine overlap, each node passed to D3-fuse must have the following properties:

```
x: horizontal center of node
y: vertical center of node
```

In addition an area and a radius can be specified in each node's properties, if not, they will be added by D3-fuse. Naturally these should be derived from one another:

```
a: area of node   // default π
r: radius of node // default 1
```
Three additional properties are created by D3-fuse (or overwritten):

```
count: the number of nodes that have merged into the current node
parent: an object containing the parent node of a node that has merged into another
children: an array of objects containing the nodes that have been merged into this node
```

## d3.fuse(*nodes*)

Returns a fuse layout. Can be optionally supplied with an array of nodes.

## fuse.nodes(*nodes*)

If `nodes` is provided will set the nodes for the fuse layout and combine nodes that overlap. If `nodes` is not specified, returns the nodes of the layout.

## fuse.padding(*padding*)

If `padding` is provided applies a padding value to all overlap calculations. The padding value is added to the combined distance of the radii of the two nodes. This distance is compared against the actual distance between two nodes' centers to determine overlap (negative values will allow circles to overlap by the specified padding value without merging, positive values will merge circles that do not touch).





