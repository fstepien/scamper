SCAMPER
=======

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


The code uses [jQuery Library](https://jquery.com/) and [Smooth Scroll PlugIn](https://plugins.jquery.com/smooth-scroll/)

There are many similarities in writting jQuery and D3, making it simple to apply powerful visualization functions. I recommend the following resources to get started: 
+ [d3Vienno (YouTube)](https://www.youtube.com/user/d3Vienno)
+ [*D3 Tips and Tricks v3.x* by Macolm Maclean (Leanpub)](https://leanpub.com/D3-Tips-and-Tricks)