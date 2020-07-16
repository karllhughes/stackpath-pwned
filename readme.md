# Checking for Pwned Passwords on StackPath

This Node Express app demonstrates calling the [Pwned password API](https://haveibeenpwned.com/API/v3) on the edge (using [StackPath](https://www.stackpath.com/)) rather than using a traditional server-side Node app.

## Running locally
- Request and pay for a [Pwned password API Key](https://haveibeenpwned.com/API/Key) (it's just a few bucks).
- Build the Docker image: `docker build -t <YOUR_USERNAME>/stackpath-pwned .`
- Run the container with your Pwned Password API Key: 

```bash
docker run --rm -p 8000:80 -e PWNED_API_KEY=... \
  -d <YOUR_USERNAME>/stackpath-pwned
```
