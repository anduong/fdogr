# Dog Recognition Web

Dogr is a simple web app to upload a dog image and recognize the dog breed. This simply uses `starlette` to start the server to talk to the trained model.

## Usage

### Build
```console
docker build -t dogr
```

### Run
```console
docker run --rm -it -p 5000:5000 dogr
```

Go to http://localhost:5000/

## Built With
- Python3
- Starlette

## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [An Duong](https://github.com/anduong) has waived all copyright and related or neighboring rights to this work.