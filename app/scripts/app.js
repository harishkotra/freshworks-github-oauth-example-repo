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
      "body": data.ticket.description_text
    };

    const createTicketResponse = await client.request.invokeTemplate("createIssue", {
      context: { }, 
      body: JSON.stringify(body)
    });
    response = JSON.parse(createTicketResponse.response);
    var ticketObj = { ticketID: data.ticket.id, issueID: response.id, issueNumber: response.number };

    client.interface.trigger("showNotify", {
      type: "success",
      message: "Yay 🎉! A Github issue is successfully created for this ticket"
    /* The "message" should be plain text */
    }).then(function(data) {
    // data - success message
    }).catch(function(error) {
    // error - error object
    });

    console.log("logging", ticketObj);
  } catch (error) {
    console.log(error);
  }
}