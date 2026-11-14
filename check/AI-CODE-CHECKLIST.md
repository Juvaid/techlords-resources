# AI-written code: 10 checks before launch

From @techlordsbywlm × @curiousyash.ai ("AI ne code likha, 3 galtiyan jo har baar hoti hain"). AI can write the code; it can't take responsibility for it. These ten checks cover the three mistakes we see every time: trusting the browser, keys inside the code, and data with no door.

## Don't trust the browser (1–4)

1. **Price, total and discount come from the server.** Take only the product and quantity from the browser; look the price up in your database and recompute the total.
2. **Role and user ID come from the login session.** Never from a field, a header or a JSON body the browser sends.
3. **Every page and every API checks access.** Ask "may this user see or change this record?" on the server, for every request.
4. **Change the ID and try.** Open `/user/101`, then `/user/102`. If you see someone else's data, you have an access-control bug (OWASP Top 10, A01: Broken Access Control).

## Keep keys out of the code (5–7)

5. **Keys live in environment variables.** Put them in `.env`, add `.env` to `.gitignore`, and keep not one key in the code.
6. **Scan before you push.** Use GitHub secret scanning and push protection, or a tool such as gitleaks or GitGuardian, so a key is caught before it is public.
7. **A leaked key gets rotated now.** Deleting the file or the commit is not enough; the key stays in the history and keeps working until you revoke it. See [KEYS](https://techlord.wordlordmedia.com/keys/).

## Put a door on the data (8–10)

8. **Admin pages check the role on the server.** Hiding the admin button is not a lock.
9. **Login and OTP have a rate limit.** Cap attempts per account and per IP.
10. **Errors and logs stay quiet.** No stack traces or keys in error pages; no passwords or OTPs in logs.

## Sources

- GitGuardian, *State of Secrets Sprawl 2025*: 23.8 million new hardcoded secrets were added to public GitHub repositories in 2024.
- OWASP Top 10: [A01 Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/).
- OWASP [Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html): validate on the server; client-side checks can be bypassed.

Checks lower the risk; they are not a guarantee. Test with your own stack, and have someone review anything that handles money or personal data.
