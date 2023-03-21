var client;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', renderText);
}

async function renderText() {
  
  let createIssBtn = document.querySelector('.create-issue');
  createIssBtn.addEventListener('fwClick', createIssue);
}

async function createIssue() {

  try {
    const data = await client.data.get("ticket");
    console.log(data);
    let body = {
      "title": data.ticket.subject,
      "description": data.ticket.description_text
    };
    const createTicketResponse = client.request.invokeTemplate("createIssue", {
      context: {}, 
      body: JSON.stringify(body)
    });

    console.log("response from github", createTicketResponse);
  } catch (error) {
    // failure operation
    console.log(error);
  }

  
}

