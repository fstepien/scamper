$(function() {
  //  by default sections are hidden, display: flex on click if linking to section
  // + smooth scroll.
  $("a")
    .on("click", function(e) {
      nextSection = $(this).attr("href");
      console.log(nextSection);
      if (/^#section/.test(nextSection)) {
        $(nextSection).css("display", "flex");
      }
    })
    .smoothScroll({
      speed: 900
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
  const checkLocalStorage = function() {
    let ideas;
    if (localStorage.getItem("ideas") === null) {
      return (ideas = []);
    } else {
      return (ideas = JSON.parse(localStorage.getItem("ideas")));
    }
  };

  const storeInLocalStorage = function(idea) {
    let ideas = checkLocalStorage();
    ideas.push(idea);
    localStorage.setItem("ideas", JSON.stringify(ideas));
  };
  //retrieve local storage
  const loadIdeas = function() {
    let ideas = checkLocalStorage();
    ideas.forEach(idea => {
      const listItem = `<li>${idea}<button><img src="assets/garbage.svg" alt="move to trash icon"></button></li>`;
      //   $(`ul[data-section="list-${section}"]`).append(listItem);
      $(`ul[data-section="list-substitute"]`).append(listItem);
    });
  };

  const removeIdea = function(e) {
    e.stopPropagation();
    ideaTarget = $(this).parent()[0];
    ideaText = ideaTarget.innerHTML.match(/[^<]*/)[0];
    // remove single idea from ui
    confirm("Are you sure?") ? ideaTarget.remove() : "";
    // check local storage, remove specific item by index then reset local storage
    let ideas = checkLocalStorage();
    const index = ideas.findIndex(idea => idea === ideaText);
    ideas.splice(index, 1);
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
  $(".remove-all").on("click", clearAllIdeas);
});
