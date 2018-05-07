SCAMPER
=======

[https://scamper.filipstepien.com](https://scamper.filipstepien.com)

A brainstorming tool to improve a product, service or an idea by asking guided questions on how to Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Rearrange. 

This app stores "ideas" in local storage and applies visualization using the [d3.js library](https://d3js.org/). This library requires a specific data structure, therefore after the initial HTML markup the next step was to create an organizational structure to store input values. 

```
ideas = {
        name: "scamper",
        parent: "null",
        children: [
          {
            name: "substitute",
            parent: "scamper",
            children: [ 
                { name: "idea", 
                  parent: "substitute" 
                  }, ...
                ]
          },  ...

        ]
```

![](https://scamper.filipstepien.com/assets/localstorage.png)

Once the structure was created "ideas" can be pushed into the children array of respective scamper section objects. Removing "ideas" is slightly trickier as it involves looping through first the section then the ideas to find a match. The following code is used to remove from local storage: 

```
  const removeIdea = function(e) {
    
    //first check if LS has any data and bring it up if available.

    let ideas = checkLocalStorage();

    //find the index of the section from which the idea is to be deleted

    const sectionIndex = ideas.children.findIndex(
      section => section.name === ideaSection
    );

    //find the index of the idea to be deleted

    const ideaIndex = ideas.children[sectionIndex].children.findIndex(
      idea => idea.name === ideaText
    );

    //splice out the idea using the index value found

    ideas.children[sectionIndex].children.splice(ideaIndex, 1);

    // return remaining ideas to local storage

    localStorage.setItem("ideas", JSON.stringify(ideas));
  };
```
For users that are new to the app and/or to the scamper brainstorming technique it was important to add an example. Example data can be stored in a json file and loaded using the following d3 method. 

```
d3.json("data.json", data => {
// call d3 visualization
});
```

There is a also a `.transition()` d3 method that will update an existing tree, neither were used in the scamper app. For this application, all data is loaded from local storage into a variable. In the one instance we need to fetch the example data it also needs to be loaded into all of the sections on the page so it is first loaded into local storage. 

```
fetch("js/data.json")
        .then(res => res.json())
        .then(data => {
          localStorage.clear();
          localStorage.setItem("ideas", JSON.stringify(data));
          $(".section").css("display", "block");
          $(".tree-diagram").css("display", "block");
          loadIdeas();
          drawTree();
          treeTrue();
        });
```



There are many similarities in writting jQuery and D3, making it simple to apply powerful visualization functions. I recommend the following resources to get started: 
+ [d3 API reference page](https://github.com/d3/d3/blob/master/API.md)
+ [d3Vienno (YouTube)](https://www.youtube.com/user/d3Vienno)
+ [*D3 Tips and Tricks v3.x* by Macolm Maclean (Leanpub)](https://leanpub.com/D3-Tips-and-Tricks)




### A11y


+ All buttons include aria-labels `aria-label="Submit substitute idea"`
+ All inputs have hidden labels `<label class="visuallyhidden">`
+ Skip Links on first tab and after each input field ` class="skip-link"`
+ Add .focus() on next input using skip links, setTimeout so that function does not return before smooth scroll is run

### jQuery and plugins

The code uses [jQuery Library](https://jquery.com/) as well as [Smooth Scroll PlugIn](https://plugins.jquery.com/smooth-scroll/) and [printThis](https://jasonday.github.io/printThis/) plugins.

Smooth Scroll allows for smooth transition between sections with only the following code: 
```
  .smoothScroll({ speed: 900 });
```
Similary, printThis requires very little code to be written to print a selected element: 
```
$('selector').printThis();
```
### Displaying, scaling and printing d3 / SVG elements

d3 maps out all of the node coordinaes and draws the tree diagram on the canvas. I thought this would be a challenge when creating a responsive website and it would require a LOT of media queries. However, after doing some research research d3 creates the tree diagram as SVG which can be responsively scaled. This took some trial and error, but after getting familiar how each element is rendered the following steps can be taken once: 

1. Display the tree diagram at a the height/width ratio and size that fits the largest screen that needs to be supported. A couple key things that I learned: 
```const tree = d3.layout.tree().size([height, width]);```

+ The width in the following code only takes into concideration the nodes and diagonal paths and text will overflow out of it. So it should be 1/4 - 1/3 of your cavans. 
+ The height and width will set the ratio which is maintained during scaling.
+ Initially, the hight shoud be a little smaller than the canvas so all the ndoes fit nicely on the screen.  

2. Preserve Aspect Ratio then set SVG scaling using the view-box attribute. The first two numbers assign scaling coordinates, the latter two set height/width scale factor. 

``` .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 1300 3000")
    .classed("svg-content-responsive", true)
```

[Shawn Allen's answer in Regards to Responsive d3 / SVG on StackOverflow](https://stackoverflow.com/a/9539361/9160384)

3. Adjust for printing: The intial tree diagram is fairly large on screen, but it is ideal for printing on a letter page size. The large viewBox factors allow for scaling all the way down to mobile, with the ability to print or send a letter size pdf. Thanks to the set height in step one the nodes are nicely distributed. However, an issue arrises if too many ideas are entered into the text field: The ideas start compressing down at 30 nodes, and start overlapping at 50. Therefore, an extra 20px was added to the height starting withthe 31st node. 

```
// calculate the number of nodes 

  const dataNodes = data.children.reduce((totalNodes, nodeInChildren) => {
    return totalNodes + nodeInChildren.children.length;
  }, 0);

  //add 20px for every node above 30 to the set height

  const addHeight = dataNodes > 30 ? (dataNodes - 30) * 20 : 0;

  //add additioinal height to base height

  const canvasHeight = 900 + addHeight;

  //Set new height ratio on new renders

  const tree = d3.layout.tree().size([canvasHeight, 320]);
```

![](https://scamper.filipstepien.com/assets/index.png)

![](https://scamper.filipstepien.com/assets/index.print.png)




