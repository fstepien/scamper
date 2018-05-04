$(function() {
  let tree = false;

  const treeTrue = function() {
    tree = true;
  };

  // store in local storage
  const checkLocalStorage = function() {
    let ideas;
    if (localStorage.getItem("ideas") === null) {
      return (ideas = {
        name: "scamper",
        parent: "null",
        children: [
          {
            name: "substitute",
            parent: "scamper",
            children: []
          },
          {
            name: "combine",
            parent: "scamper",
            children: []
          },
          {
            name: "adapt",
            parent: "scamper",
            children: []
          },
          {
            name: "modify",
            parent: "scamper",
            children: []
          },
          {
            name: "put",
            parent: "scamper",
            children: []
          },
          {
            name: "eliminate",
            parent: "scamper",
            children: []
          },
          {
            name: "rearrange",
            parent: "scamper",
            children: []
          }
        ]
      });
    } else {
      return (ideas = JSON.parse(localStorage.getItem("ideas")));
    }
  };

  //  add idea to corresponding UI section and LS
  const addIdea = function(e) {
    e.preventDefault();
    const section = $(this).attr("data-section");
    const $input = $(`input[name=${section}]`);
    const inputValue = $input.val();
    $input.val("");
    const listItem = `<li data-section="${section}">${inputValue}<button><img src="assets/garbage.svg" alt="move to trash icon"></button></li>`;
    $(`ul[data-section="list-${section}"]`).append(listItem);
    storeInLocalStorage(section, inputValue);
    tree ? drawTree() : "";
  };

  const storeInLocalStorage = function(section, idea) {
    let ideas = checkLocalStorage();
    const sectionIndex = ideas.children.findIndex(
      child => child.name === section
    );
    ideas.children[sectionIndex].children.push({ name: idea, parent: section });
    localStorage.setItem("ideas", JSON.stringify(ideas));
  };

  //on page load retrieve local storage and display on page
  const loadIdeas = function() {
    let ideas = checkLocalStorage();
    ideas.children.forEach(section => {
      const sectionName = section.name;
      section.children.forEach(idea => {
        const listItem = `<li data-section="${sectionName}">${
          idea.name
        }<button><img src="assets/garbage.svg" alt="move to trash icon"></button></li>`;
        $(`ul[data-section="list-${sectionName}"]`).append(listItem);
      });
    });
  };

  const removeIdea = function(e) {
    e.stopPropagation();
    ideaTarget = $(this).parent()[0];
    ideaText = ideaTarget.innerHTML.match(/[^<]*/)[0];
    ideaSection = $(this)
      .parent()
      .attr("data-section");
    // remove single idea from ui
    confirm("Are you sure?") ? ideaTarget.remove() : "";
    // find where this idea lives in the data and splice it out
    let ideas = checkLocalStorage();
    const sectionIndex = ideas.children.findIndex(
      section => section.name === ideaSection
    );
    const ideaIndex = ideas.children[sectionIndex].children.findIndex(
      idea => idea.name === ideaText
    );
    ideas.children[sectionIndex].children.splice(ideaIndex, 1);
    // return ideas back to local storage
    localStorage.setItem("ideas", JSON.stringify(ideas));
  };

  //clear All ideas from all sections
  const clearAllIdeas = function() {
    if (confirm("Are you sure?")) {
      $(".section__ideas").each((i, section) => {
        while (section.firstChild) {
          section.removeChild(section.firstChild);
        }
      });
      localStorage.clear();
    }
  };

  //   Event Listeners
  loadIdeas();
  $("form").on("submit", addIdea);
  $("ul").on("click", "button", removeIdea);
  $(".remove-all").on("click", function() {
    clearAllIdeas();
    d3.select("svg").remove();
  });
  $(".draw-tree").on("click", function() {
    drawTree();
    console.log(tree);
    treeTrue();
    console.log(tree);
  });
  $("a")
    .on("click", function(e) {
      nextSection = $(this).attr("href");
      if (/^#section/.test(nextSection)) {
        $(nextSection).css("display", "flex");
      }
    })
    .smoothScroll({
      speed: 900
    });
});

// document.querySelector(".draw-tree").addEventListener("click", drawTree);
// remove after testing
// drawTree();
