function hello() {
  var e = document.getElementsByClassName("card");
  for (var i = 0; i < e.length; i++) {
    e[i].addEventListener("touchstart", function () {
      console.log("Danish chawal");
      dragStart();
    });
  }

  // document.getElementById("card1").addEventListener("touchstart", function () {
  //   console.log("Danish chawal");
  // });

  // document.getElementById('list1').hasChildNodes.
  // addEventListener("touchstart", function () {
  //   console.log("Danish chawal");
  // });
}

function allowDrop(ev) {
  ev.preventDefault(); // default is not to allow drop
}
var dragged;
function dragStart(ev) {
  // The 'text/plain' is referring the Data Type (DOMString)
  // of the Object being dragged.
  // ev.target.id is the id of the Object being dragged
  ev.dataTransfer.setData("text/plain", ev.target.id);
  dragged = this;
  console.log("Drag start = " + ev.target.className);
}

function drop(ev) {
  ev.preventDefault(); // default is not to allow drop
  let sourceId = ev.dataTransfer.getData("text/plain");

  let sourceIdEl = document.getElementById(sourceId);
  console.log("Source:", sourceIdEl.id);
  let sourceIdParentEl = sourceIdEl.parentElement;

  // ev.target.id here is the id of target Object of the drop
  let targetEl = document.getElementById(ev.target.id);
  console.log("Drop it- target id = " + targetEl.id);
  let targetParentEl = targetEl.parentElement;

  let str = sourceIdEl.id.toString();
  let str1 = str.concat(",");
  let str2 = str1.concat(targetEl.id.toString());
  console.log("Change status string = ", str2);

  let tokenInfo = localStorage.getItem("TokenInfo");

  jQuery.ajax({
    url:
      "http://localhost:52497/api/ProjectTasks/ChangeTaskStatus/" +
      str2.toString(),
    str2,
    method: "POST",
    headers: {
      Authorization: "Bearer " + tokenInfo,
    },
    success: (result) => {
      if (result.isOk == false) alert(result.message);
    },
    async: true,
  });

  // Compare List names to see if we are going between lists
  // or within the same list
  console.log(targetParentEl.id + " " + sourceIdParentEl.id);
  if (targetParentEl.id !== sourceIdParentEl.id) {
    // If the source and destination have the same
    // className (card), then we risk dropping a Card in to a Card
    // That may be a cool feature, but not for us!
    if (targetEl.className === sourceIdEl.className) {
      // Append to parent Object (list), not to a
      // Card in the list
      // This is in case you drag and drop a Card on top
      // of a Card in a different list
      //targetParentEl.insertBefore(sourceIdEl);
      //targetParentEl.appendChild(sourceIdEl);
    } else {
      // Append to the list
      targetEl.appendChild(sourceIdEl);
    }
  } else {
    // Same list. Swap the text of the two cards
    // Just like swapping the values in two variables

    // Temporary holder of the destination Object
    // let holder=targetEl;
    // console.log(targetEl);
    // console.log(sourceIdEl);
    // // The text of the destination Object.
    // // We are really just moving the text, not the Card
    // let holderText=holder.textContent;
    // // Replace the destination Objects text with the sources text
    // targetEl.textContent=sourceIdEl.textContent;

    // // Replace the sources text with the original destinations
    // sourceIdEl.textContent=holderText;
    // holderText='';

    console.log("Drop within this list");

    // let holder = targetEl;
    // targetEl = sourceIdEl;
    // sourceIdEl = holder;

    targetParentEl.insertBefore(sourceIdEl, targetEl);

    holder = " ";
  }
}
