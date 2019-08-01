function Header() {
  var element = document.getElementById("root");
  var header = document.createElement("div");
  header.innerHTML = "header1";
  header.classList.add("hello");
  element.append(header);
}

export default Header;
