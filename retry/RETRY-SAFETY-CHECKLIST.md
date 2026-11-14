# Retry Safety Checklist

From Tech Lords: “Pay ek baar. Charge do baar.” Educational guidance for payment integrations, not a drop-in payment implementation. Test with your provider's sandbox and documented API version.

## Before you retry

- [ ] Treat a timeout as an unknown result, not proof that payment failed.
- [ ] Create and persist one logical operation ID before making the request.
- [ ] If the endpoint supports idempotency, persist one key for that operation and reuse it with the same request details on retries.
- [ ] A new order or genuinely new payment operation gets a new key. Never reuse a key across customers or unrelated operations.
- [ ] Follow your provider's supported retry conditions, backoff and key-retention window. Stripe API v1 may prune keys after at least 24 hours; an old key is not indefinite deduplication.
- [ ] Reconcile an unclear result using your stored operation, provider status and verified webhook events before asking for another payment.
- [ ] Deduplicate concurrent requests and webhook handling on the server. Disabling a button alone is insufficient.
- [ ] Do not log card details, secrets or full sensitive request bodies. Keep safe operation and provider reference IDs for investigation.

## Five sandbox tests

| Scenario | Expected check |
| --- | --- |
| Provider completes payment, response is lost | Retry within the supported window, with the same key and details, does not create a second payment |
| Two requests arrive together | Both resolve to the same logical payment; handle the provider's concurrency response as documented |
| Retry changes amount or currency | Reject the mismatch; do not silently treat it as the same operation |
| Duplicate or out-of-order webhook | No repeated fulfilment; verify signatures and reconcile state |
| Result is still unclear outside key-retention window | Reconcile or flag for review before a fresh payment; do not assume the old key protects you |

## Ask your coding agent

“Trace the payment timeout path. Show where the logical operation and idempotency key are persisted, which request details are reused, how concurrent retries are handled, and how unknown outcomes are reconciled. Add sandbox tests for the five scenarios above. Do not touch live payments or secrets. Cite the provider documentation for our exact endpoint and API version.”

## Sources

Checked 3 November 2026. Stripe API v1 is the example, not a guarantee about every payment provider.

- [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests)
- [Stripe low-level error handling](https://docs.stripe.com/error-low-level)
- [Stripe webhook handling](https://docs.stripe.com/webhooks)
