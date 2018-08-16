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
a: area of node
r: radius of node 
```
Three additional properties are created by D3-fuse (or overwritten):

```
count: the number of nodes that have merged into the current node
parent: an object containing the parent node of a node that has merged into another
children: an array of objects containing the nodes that have been merged into this node
```


