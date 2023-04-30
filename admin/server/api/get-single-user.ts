const user = {
  "user": "Ruben",
  "pswd": "rubena1985"
}

export default defineCachedEventHandler(async (event) => {
  const query = getQuery(event)
  const baseUrl = 'http://10.120.2.31:8080/bgbilling/executer/json/am.fnet.billing.web/ServiceReference/'
  $fetch(baseUrl, {
    method: 'POST',
    body: {
      "method": "state",
      "params": {
        "title": query.contractNumber
      },
      user
    }
  })
})
