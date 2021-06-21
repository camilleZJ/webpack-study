async function getComponent() {
  //   return import(/*webpackChunkName:"lodash"*/ "lodash").then(({ default: _ }) => {
  //     var element = document.createElement("div");
  //     element.innerHTML = _.join(["Dell", "", "Lee"], "-");
  //     return element;
  //   });

  var { default: _ } = await import(/*webpackPreload: true*/ "lodash");
  var element = document.createElement("div");
  element.innerHTML = _.join(["Dell", "", "Lee"], "-");
  return element;
}

// document.addEventListener("click", () => {
//   getComponent().then(element => {
//     document.body.appendChild(element);
//   });
// });

import _ from "lodash";
function component() {
  var element = document.createElement("div");
  var button = document.createElement("button");
  var br = document.createElement("br");
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  button.innerHTML = "Click me and look at the console!";
  element.appendChild(button);
  element.appendChild(br);

  button.onclick = e =>
    // import(/*webpackChunkName: "print", webpackPreload: true */ "./print").then(module => {
    import(/*webpackChunkName: "print", webpackPrefetch: true */ "./print").then(module => {
      var print = module.default;

      print();
    });

  return element;
}

document.body.append(component());
