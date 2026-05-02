# Saphron

Small electron client for browsing Saphron files.
In theory vanilla JS in a normal browser should be enough for Saphron files, but the same origin policy would require preloading the entire database up front which would require both a compile step and harm load times.
While the original intention is that this project is just a browser without the same-origin policy limitations, but node does have some useful stuff that we may as well use while its available. 

Project just loads up a blank electron window at the moment.
