known bugs to fix: 

            1 - when a user enters a github username that doesn't exist, then that user's profile is loaded, the 
            app crashes because it's looking for a nonexistant user. 
            discovered on 2/22/2021
            
            2 - upon refresh of a page, app gets stuck on an eternal loading screen. Might be because state isn't being
            updated?
            discovered on 2/22/2021
            
            3 - if there is a profile with no user, developers page will not load because it gets stuck searching
            for an ID that does not exist.
            discovered on 2/22/2021

fixed bugs:

            1 - when loading a user's profile, the app crashes if the user has an education section filled out.
            ProfileEducation.js was expecting an array called "experience" rather than an object called "education" 
            as a prop.
            discovered on 2.19/2021
            fixed on 2/22/2021
