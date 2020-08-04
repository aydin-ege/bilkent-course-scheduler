# Bilkent Course Scheduler

Since IEEE scheduler is down, why not create a new one?

Disclaimer: This is a side project and I just slapped together some simple algorithm, an open-source app framework designed specifically for Machine Learning and Data Science and some hacks to make it more interactive so code may be too ugly for your standards.

---
### Installation

You do not need to install this to use it. In a few days, I will upload it to a proper website. If you want to contribute or run it locally, you need to install some libraries.

```sh
$ pip install -r requirements.txt
```
Then download [persistent state hack for Streamlit](https://gist.github.com/tvst/036da038ab3e999a64497f42de966a92). I just copied it to Lib folder and imported it (because I'm lazy) but if you have a better idea, make the changes and send a pull request.

To run it, open a terminal window and type
```sh
$ streamlit run web_server.py
```

