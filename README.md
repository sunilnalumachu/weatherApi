# WeatherApi

weather API service used to get the weather information for the given zipCode.
## Installation

Use the package manager node to install packages.

pre-requirement steps

```bash
brew install node
sls install -g serverless

aws configure (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html#cliv2-mac-install-gui)
```

once you install the above, Go to project directory weatherApi and install packages
 

```bash
node install
```

In stagevars folder update the profile with your AWS profile and deploy using, below command.
 

```bash
sls deploy --stage=dev

currently, I added the dev environment, you can create your own environment.

once you run the above command it will create the stack. and you can see the urls.
```

## License
[SUNIL NALUMACHU]