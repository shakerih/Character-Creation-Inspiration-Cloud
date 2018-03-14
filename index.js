
var treeData = [
    {
        "name": "Character",
        "parent": "null",
        "children": [
            {
                "name": "Personality",
                "parent": "Character",
                "children": [{"name":"Enter value"}]

            },
            {
                "name": "Appearance",
                "parent": "Character",
                "children": [{"name":"Enter value"}]

            },
            {
                "name": "Mechanics",
                "parent": "Character",
                "children": [{"name":"Enter value"}]

            },
            {
                "name": "Story",
                "parent": "Character",
                "children": [{"name":"Enter value"}]

            }
        ]
    }
];

var p_input, a_input, m_input, s_input, all_input;


// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
width = 1000 - margin.right - margin.left,
height = 500 - margin.top - margin.bottom;

var i = 0,
duration = 750,
root;

var tree = d3.layout.tree()
.size([height, width]);

var diagonal = d3.svg.diagonal()
.projection(function(d) { return [d.x, d.y]; });

var svg = d3.select("body").append("svg")
.attr("width", 100+"%")
.attr("height", height - margin.top - margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;

update(root);

d3.select(self.frameElement).style("height", "500px");


function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 100;  });

    // Update the nodes…
    var node = svg.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
    .on("click", click);

    nodeEnter.append("circle")
    .attr("r", 1e-6)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });


    nodeEnter.append("text")
    .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
    .text(function(d) { return d.name; })
    .style("fill-opacity", 1e-6);

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    nodeUpdate.select("circle")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
    .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
    .remove();

    nodeExit.select("circle")
    .attr("r", 1e-6);

    nodeExit.select("text")
    .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
    .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", function(d) {
        var o = {x: source.x0, y: source.y0};
        return diagonal({source: o, target: o});
    });

    // Transition links to their new position.
    link.transition()
    .duration(duration)
    .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
    .duration(duration)
    .attr("d", function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal({source: o, target: o});
    })
    .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

// Toggle children on click.
function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}

document.getElementById("pbutton").onclick = function () {
    //Adding a new node (as a child) to selected Node (code snippet)
    var arr = [];
    var str = "https://api.datamuse.com/words?rel_jjb=" +document.getElementById("ptext").value+"&topics=soul";
    $.getJSON(str, function(data) {
        var newNode = {
            "name": document.getElementById("ptext").value,
            "children": [
                {"name": data[0].word},
                {"name": data[1].word},
                {"name": data[2].word}
        ]}

        console.log(newNode);
        //Update tree
        if(treeData[0].children[0].children[0].name === "Enter value"){
            treeData[0].children[0].children=[];
        }
        treeData[0].children[0].children.push(newNode);
        update(parent);

    });

    // set search input from Personality
    set_Search_Input ();
};



document.getElementById("abutton").onclick = function () {
    //Adding a new node (as a child) to selected Node (code snippet)
    var arr = [];
    var str = "https://api.datamuse.com/words?rel_jjb=" +document.getElementById("atext").value+"&topics=visuals";
    $.getJSON(str, function(data) {
        var newNode = {
            "name": document.getElementById("atext").value,
            "children": [
                {"name": data[0].word},
                {"name": data[1].word},
                {"name": data[2].word}
        ]}

        console.log(newNode);
        //Update tree
        if(treeData[0].children[1].children[0].name === "Enter value"){
            treeData[0].children[1].children=[];
        }
        treeData[0].children[1].children.push(newNode);
        update(parent);
    });

    // set search input from visuals
    set_Search_Input ();
};


document.getElementById("mbutton").onclick = function () {
    //Adding a new node (as a child) to selected Node (code snippet)
    var arr = [];
    var str = "https://api.datamuse.com/words?rel_jjb=" +document.getElementById("mtext").value+"&topics=mechanics";
    $.getJSON(str, function(data) {
        var newNode = {
            "name": document.getElementById("mtext").value,
            "children": [
                {"name": data[0].word},
                {"name": data[1].word},
                {"name": data[2].word}
        ]}

        console.log(newNode);
        //Update tree
        if(treeData[0].children[2].children[0].name === "Enter value"){
            treeData[0].children[2].children=[];
        }
        treeData[0].children[2].children.push(newNode);
        update(parent);

    });

    // set search input from mechanics
    set_Search_Input ();
};


document.getElementById("sbutton").onclick = function () {
    //Adding a new node (as a child) to selected Node (code snippet)
    var arr = [];
    var str = "https://api.datamuse.com/words?rel_jjb=" +document.getElementById("stext").value+"&topics=event";
    $.getJSON(str, function(data) {
        var newNode = {
            "name": document.getElementById("stext").value,
            "children": [
                {"name": data[0].word},
                {"name": data[1].word},
                {"name": data[2].word}
        ]}

        console.log(newNode);
        //Update tree
        if(treeData[0].children[3].children[0].name === "Enter value"){
            treeData[0].children[3].children=[];
        }
        treeData[0].children[3].children.push(newNode);
        update(parent);

    });

    // set search input from story
    set_Search_Input ();
};


// set search input from Personality, Appearance, Mechanics & Story
function set_Search_Input () {
    p_input = document.getElementById("ptext").value;
    a_input = document.getElementById("atext").value;
    m_input = document.getElementById("mtext").value;
    s_input = document.getElementById("stext").value;

    all_input = p_input + " " + a_input + " " + m_input + " " + s_input;
    // remove extra space
    all_input = all_input.replace(/^\s+|\s+$/g, "").trim();
    // set input
    document.getElementById("gsc-i-id1").value = all_input;
}

// var keyword = "bunny";
//
// $(document).ready(function(){
//
//     $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
//     {
//         tags: keyword,
//         tagmode: "any",
//         format: "json"
//     },
//     function(data) {
//         var rnd = Math.floor(Math.random() * data.items.length);
//
//         var image_src = data.items[0]['media']['m'].replace("_m", "_b");
//
//         $('body').css('background-image', "url('" + image_src + "')");
//
//     });
//
// });
