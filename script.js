// DOM elements
const fetchDataFetchBtn = document.getElementById("fetch-data-fetch");
const fetchDataXhrBtn = document.getElementById("fetch-data-xhr");
const postForm = document.getElementById("post-form");
const putForm = document.getElementById("put-form");
const output = document.getElementById("output");

// Helper:Errors or display data
function displayMessage(message, isError = false) {
  output.innerHTML = `<p style="color: ${isError ? "red" : "green"};">${message}</p>`;
}

// Task 1: Using fetch()
fetchDataFetchBtn.addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .then((data) => {
      displayMessage(`Title: ${data.title}<br>Body: ${data.body}`);
    })
    .catch((error) => {
      displayMessage(`Error: ${error.message}`, true);
    });
});

// Task 2:Using XMLHttpRequest
fetchDataXhrBtn.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/2");
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayMessage(`Title: ${data.title}<br>Body: ${data.body}`);
    } else {
      displayMessage("Error: Failed to fetch data with XHR", true);
    }
  };
  xhr.onerror = () => displayMessage("Network error occurred", true);
  xhr.send();
});

// Task 3: Using POST
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("post-title").value;
  const body = document.getElementById("post-body").value;

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to create post");
      return response.json();
    })
    .then((data) => {
      displayMessage(`Post created! ID: ${data.id}`);
    })
    .catch((error) => {
      displayMessage(`Error: ${error.message}`, true);
    });
});

// Task 4: Using PUT
putForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = document.getElementById("post-id").value;
  const title = document.getElementById("update-title").value;
  const body = document.getElementById("update-body").value;

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `https://jsonplaceholder.typicode.com/posts/${id}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayMessage(`Post updated! Title: ${data.title}, Body: ${data.body}`);
    } else {
      displayMessage("Error: Failed to update post", true);
    }
  };
  xhr.onerror = () => displayMessage("Network error occurred", true);
  xhr.send(JSON.stringify({ title, body }));
});
