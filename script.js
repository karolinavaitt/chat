console.log("funguju!");
const msgElm = document.querySelector("#userMsg").value;
const nameElm = document.querySelector("#userName").value;
const formElm = document.querySelector("#form");

const show = (event) => {
  event.preventDefault();

  fetch("https://czechichat.deno.dev/api/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: msgElm,
      name: nameElm,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        msgElm = "";
      }
    });
};

const MessageItem = (props) => {
  const { name, message, date } = props;

  const element = document.createElement("li");
  element.innerHTML = `
  <p>${name}, ${date} </p>
  <p>${message}</p>
  `;
  return element;
};

const ShowMessage = () => {
  const ulElm = document.querySelector("#messages");

  fetch("https://czechichat.deno.dev/api/list-messages", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const zobrazZpravy = data.messages.map((item) =>
        MessageItem({
          name: item.name,
          message: item.message,
          date: item.date,
        })
      );
      ulElm.innerHTML = "";
      ulElm.append(...zobrazZpravy);
    });
};

formElm.addEventListener("submit", show);
ShowMessage();
setInterval(ShowMessage(), 3000);
