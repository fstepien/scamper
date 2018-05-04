SCAMPER
=======

A brainstorming tool to improve a product, service or an idea by asking guided questions on how to Substitute, Combine, Adapt, Modify, Put to other uses, Eliminate, Rearrange. 

Ideas are stored in local storage and visualized by [d3.js library](https://d3js.org/). This library requires a specific data structure, therefore after the initial HTML markup the next step was to create an organizational structure to store input values. 

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
                  }
                ]
          },  ...

        ]
```

![https://scamper.filipstepien.com/assets/localstorage.png]()

The code uses [jQuery Library](https://jquery.com/) and [Smooth Scroll PlugIn](https://plugins.jquery.com/smooth-scroll/)

There are many similarities in writting jQuery and D3, making it simple to apply powerful visualization functions. I recommend the following resources to get started: 
+ [d3Vienno (YouTube)](https://www.youtube.com/user/d3Vienno)
+ [*D3 Tips and Tricks v3.x* by Macolm Maclean (Leanpub)](https://leanpub.com/D3-Tips-and-Tricks)