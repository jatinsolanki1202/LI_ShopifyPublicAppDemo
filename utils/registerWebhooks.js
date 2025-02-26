const axios = require("axios");

const registerAppUninstalledWebhook = async (shop, accessToken) => {
  try {
    const response = await axios.post(
      `https://${shop}/admin/api/2025-01/graphql.json`,
      {
        query: "mutation webhookSubscriptionCreate($topic: WebhookSubscriptionTopic!, $webhookSubscription: WebhookSubscriptionInput!) { webhookSubscriptionCreate(topic: $topic, webhookSubscription: $webhookSubscription) { webhookSubscription { id topic format endpoint { __typename ... on WebhookHttpEndpoint { callbackUrl } } } userErrors { field message } } }",
        variables: {
          topic: "APP_UNINSTALLED",
          webhookSubscription: {
            callbackUrl: `${process.env.URL}/webhook/app-uninstalled`,
            format: "JSON",
          },
        },
      },
      {
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error registering webhook:", error.response.data);
  }
};

module.exports = { registerAppUninstalledWebhook };
