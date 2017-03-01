Apib confluencer
================

A tool for rendering api blueprint files and updating them to confluence

Installation
------------

Create a user specific config for storing the wiki credentials at `~/.apib_confluencer.json` like:
```json
{
    "confluence": {
        "username": "testuser",
        "password": "test-user-pw",
        "baseUrl":  "https://confluence-api-test.atlassian.net/wiki"
    }
}
```

Usage
-----

Create a project config `apib_confluencer.json` in your project root like:
```json
{
    "myapi.apib": {
        "pageId": 12345
    }
}
```

To update the wiki page simply run

```bash
apib-confluencer
```
