# Math Book search engine application

## Prerequisites

- Node v22
- pnpm
- Python >= 3.11.5

## How to run

```
cd client
pnpm install
pnpm build

cd ../server
.venv\Scripts\activate
python -m pip install -r requirements.txt

flask --app app.py run
```