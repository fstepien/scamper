$(function() {
  $(".lets-start").on("click", function() {
    $(".section-s").css("display", "flex");
  });

  //  add idea to corresponding section
  const addIdea = function(e) {
    e.preventDefault();
    const section = $(this).attr("data-section");
    const $input = $(`input[name=${section}]`);
    const inputValue = $input.val();
    $input.val("");
    const listItem = `<li>${inputValue}<button><img src="assets/garbage.svg" alt="move to trash icon"></button></li>`;
    $(`ul[data-section="list-${section}"]`).append(listItem);
    storeInLocalStorage(inputValue);
  };
  // store in local storage
  const storeInLocalStorage = function(idea) {
    let ideas;
    if (localStorage.getItem("ideas") === null) {
      ideas = [];
    } else {
      ideas = JSON.parse(localStorage.getItem("ideas"));
    }
    ideas.push(idea);
    localStorage.setItem("ideas", JSON.stringify(ideas));
  };
  //retrieve local storage
  const loadIdeas = function() {
    let ideas;
    if (localStorage.getItem("ideas") === null) {
      ideas = [];
    } else {
      ideas = JSON.parse(localStorage.getItem("ideas"));
    }
    ideas.forEach(idea => {
      const listItem = `<li>${idea}<button><img src="assets/garbage.svg" alt="move to trash icon"></button></li>`;
      //   $(`ul[data-section="list-${section}"]`).append(listItem);
      $(`ul[data-section="list-substitute"]`).append(listItem);
    });
  };

  // remove single idea
  const removeIdea = function(e) {
    e.stopPropagation();
    ideaTarget = $(this).parent();
    confirm("Are you sure?") ? ideaTarget.remove() : "";
    removeFromLocalStorage(ideaTarget);
  };

  const removeFromLocalStorage = function(ideaTarget) {
    console.log(ideaTarget);
    if (localStorage.getItem("ideas") === null) {
      ideas = [];
    } else {
      ideas = JSON.parse(localStorage.getItem("ideas"));
    }
    console.log(ideas);
    // 1 Loop through ideas
    // 2. filter to find key of array and splice out
    // 3. return the rest to LS
    // ideas.forEach(idea => {
    //   ideaTarget.textContent === idea ? task.splice(index, 1) : "";
    // });
    // localStorage.setItem("ideas", JSON.stringify(ideas));
  };

  //clear All ideas from all sections
  const clearAllIdeas = function() {
    if (confirm("Are you sure?")) {
      // $(".section__ideas");
      // HOW TO USE A jQUERY SELECTOR___ FIX ME FIX ME!!!!
      document.querySelectorAll(".section__ideas").forEach(section => {
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
  $(".remove-all").on("click", clearAllIdeas);

  //   smooth scroll code for all links
  $("a").smoothScroll({
    speed: 900
    // offset: -120
  });
});
