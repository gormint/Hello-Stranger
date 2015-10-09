## Hello Stranger


![landing page](http://i.imgur.com/sACtFO9.png)


**Event based, anonymised social networking**

Our app intends to champion anonymity in an event tracking/check-in style application. Fostering communication between strangers, fluid grouping based on similar interests, as well as valuable insights for event producers.

### MVP User Story Flow
We are designing 'Phone-First' as this app will be heavily based on geotagging.
![movil flow](http://i.imgur.com/hofOxTh.png)
After a user logs in they are presented with their recent **event history**. Each event will have a chatroom associated with it. 
Eg: **'The Request Line Event**.
![screenshot single chat ramdom silly names](http://i.imgur.com/XNDcpSb.png)

A user can only enter the chatroom if it's in their even history, and an event can only appear in their history if they have successfuly checked-in via a geo-tag at the event whilst it was running. This ensures that the only anonymised people in a particular chatroom, definitely went to the event it's discussing. 

Names in the chatroom will be randomly generated strings, eg: _RedDonkey_ or _BlueDoorFrame_.
We used SillyName project, a "random and most importantly silly name generator for node" [https://github.com/thedeveloper/sillyname].
At any point the user can log that they're at an event by clicking on the logo/new event button in the header (TBD).

This will bring up a map of their current location and a list of events in the area (pulled from the Lineup API).
![screenshot list events close to user](http://i.imgur.com/7hjAU33.png)
When they are within a certain GPS area around the event (say 10 meters) they can mark themselves as an atendee, and get access to the room.
![screenshot map event route](http://i.imgur.com/fIJKaAn.png)

In the room users can discuss the event, they can do this whilst the event is running, or afterwards (say the day or weekend after). 
The room will never close, and users will get notifications which they can turn on or off for future discussion (say somebody posts months later "this comedian is performing again at x" or "Hey all I thought you might be interested in a similar talk: [Details]".

### Additional Features to MVP

Users within each chat can post pictures. To ensure anonymity remains high on our agenda we will use Cloudinary's facial recognition and face_blur methods between upload and post.

Users can hashtag their chat messages, which will make them appear on an events show page/provide insight to event organisers.

## Technologies we are using ##
Server side:
* Node.js
* MongoDB
* Express.js

Client side:
* AJAX
* PureCSS
* HTML5
* jQuery Library

Additional technologies:
* Socket.io (web sockets)
* Passport.js (security)
* Mustache.js (templating)
* Lineup API (Events information)
* Google Maps API
* Sillynames

### Thinking Further Ahead

Users can downvote a particular user if they are abusive or predatory, eventually resulting in a ban. This adds an element of self-policing to the rooms.

The app suggests events based not only on geo location, but on previous events/what similar users have said they're going to attend or have attended. 

The app will allow personal communication between two users if they have been to the same events multiple times. "Hey, you and this person seem to like the same stuff, alot! Why don't you connect?" THIS IS ENTIRELY UP TO THE USER. They can choose to block a user if they want. Privacy is the main component of this app. 

Events can be created by users. This proposes a challenge in policing/validation/abuse: People could create multiple Event Documents for one event, or produce fake event documents in order to hijack an event. 

During the development of the project there were many more ideas that came out to improve the application, and that we were writing down in our Jira dashboard for a future development.

### Credits
"Hello stranger" is a team project built by
Yao Yuan, James White and Paco Contreras during the General Assembly WDI 15 Course, London, October 2015.
