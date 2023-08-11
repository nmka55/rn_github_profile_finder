
#  GitHub Username search

  

![HeaderImage](front.gif 'HeaderImage')

  
 [Based on my own boiletplate code](https://github.com/nmka55/rn_drawertabnav_boilerplate)

 
***App features:***

  

> - Search github username, return exact matching user profile and list of other users with matching usernames

> - See profile name, handle, follower/following count and their bio

> - Tap on search result to see full info - bio, company etc

> - View on GitHub (jump to web browser)


***To run app:***

 - Clone app and run `yarn install`
 - `cd ios` and run `pod install`
 - Generate Github Personal Access Token (PAT), copy and paste PAT in `src/constants/values` under `githubPAT`
 - run `yarn ios` for iOS Simulator or `yarn android` for Android Emulator
