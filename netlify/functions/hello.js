const fetch = require("node-fetch");

const API_ENDPOINT = 'BIG_COMMERCE_ORDER_API';
const TEST_API_ENDPOINT = 'https://reqres.in/api/users'

const RUDDER_ENDPOINT = 'https://https://tommyjohnwear-dataplane.rudderstack.com/v1/track'
const TEST_RUDDER_ENDPOINT = 'https://webhook.site/#!/728e5848-c2d5-4f9a-a97e-cc9b91fdbf15'

exports.handler = async function (event, context) {
  let response
  try {
    response = await fetch(TEST_API_ENDPOINT)
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}
