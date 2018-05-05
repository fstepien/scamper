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
    confirm("Are you sure you want to clear this idea?")
      ? ideaTarget.remove()
      : "";
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
    tree ? drawTree() : "";
  };

  //clear All ideas from all sections
  const clearAllIdeas = function() {
    if (confirm("Are you sure you want to CLEAR ALL?")) {
      $(".section__ideas").each((i, section) => {
        while (section.firstChild) {
          section.removeChild(section.firstChild);
        }
      });
      localStorage.clear();
    }
  };

  //   Event Listeners
  // Load ideas from local storage
  loadIdeas();
  //add idea to UI and local storage
  $("form").on("submit", addIdea);
  // remove idea from UI and local storage
  $("ul").on("click", "button", removeIdea);
  //remove all ideas and clear tree diagram
  $(".remove-all").on("click", function() {
    clearAllIdeas();
    d3.select("svg").remove();
    $(".section").css("display", "none");
    $(".tree-diagram").css("display", "none");
  });
  //load example data
  $(".explore-example").on("click", function() {
    if (
      confirm(
        "Are you sure you want to load sample data and CLEAR ALL previous ideas?"
      )
    ) {
      fetch("js/data.json")
        .then(res => res.json())
        .then(data => {
          console.log(data);
          localStorage.clear();
          localStorage.setItem("ideas", JSON.stringify(data));
          $(".section").css("display", "block");
          $(".tree-diagram").css("display", "block");
          loadIdeas();
          drawTree();
          treeTrue();
        });
    }
  });
  //draw tree and allow for tree updates on new idea add
  $(".draw-tree").on("click", function() {
    nextSection = $(this).attr("href");
    $(nextSection).css("display", "flex");
    drawTree();
    treeTrue();
  });
  // on internal link display section and smooth scroll to it
  $("a")
    .on("click", function(e) {
      const currentSection = $(this).data().section;
      //   if linking out of a section which has an idea in the input box trigger a submit (added after watching users interact with app)
      if (currentSection) {
        if ($(`input[id=${currentSection}]`).val() !== "") {
          $(`input[id=${currentSection}]`).submit();
        }
      }
      const nextSection = $(this).attr("href");
      if (/^#section/.test(nextSection)) {
        $(nextSection).css("display", "flex");
      }
    })
    .smoothScroll({
      speed: 900
    });
});
