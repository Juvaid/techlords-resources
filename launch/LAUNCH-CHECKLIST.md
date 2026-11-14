# Launch checklist: 10 checks before real users

From @techlordsbywlm ("Launch se pehle 10 check"). "AI ne bola ready" means the code runs on your laptop, logged in as you. These ten checks are what a customer, a bot and a bad day will test for you. Do them the day before launch, not the morning of.

## The customer (1–4)

- [ ] **1. Incognito, no login.** Open the site in a private window and do the full journey as a guest: land, sign up, use the main feature. Whatever a guest can't do, a customer can't do.
- [ ] **2. A real phone on mobile data.** Not your laptop, not office wifi. Check the layout, the keyboard on forms, slow loading, and buttons you can actually tap.
- [ ] **3. One full order with payment.** Product → cart → pay → confirmation page → confirmation email. Use the payment provider's test mode first, then one small real payment, and refund it.
- [ ] **4. Password reset and every system email.** Does the email arrive? In the inbox or in spam? Does the link work on a phone?

## Data and abuse (5–7)

- [ ] **5. User A can't see user B.** Make two accounts. Logged in as B, open A's order, profile or file links (change the ID in the URL). The server must check the owner, not just the login.
- [ ] **6. No secret key in the browser.** Open View source and your built JS files, and search for `key`, `secret`, `sk-`. Secret API keys belong on the server only. Rotate any key you find.
- [ ] **7. Limits on signup, login and OTP.** Cap attempts per IP and per phone number or email. Add a bot check on public forms. Every OTP SMS costs money; set a budget alert with your SMS provider.

## When it breaks (8–10)

- [ ] **8. Daily backup, and one test restore.** Restore last night's backup into a separate database and open it. A backup you have never restored is a hope, not a backup.
- [ ] **9. Error alerts reach you first.** Errors and downtime send you an email, message or page before a customer tells you. Trigger one test error and check it arrives.
- [ ] **10. A rollback plan.** Know how to put the previous version back in one step, and who does it. Database changes that can't be rolled back get a backup first.

## The night before

- [ ] All ten are ticked, on the production site, not only on staging.
- [ ] Someone other than the builder did checks 1–3.
- [ ] I know who gets the alerts on launch day, and they are awake.

## Important limits

This list covers the common launch-day failures of small apps built quickly, often with AI. It is not a security audit or a legal review. If you take payments, store personal data or work in a regulated field, get the relevant review before launch.
