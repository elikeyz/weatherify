# Weatherify
This is an offline capable weather application built with React. It allows you to see the weather condition in any location in the world with seamless ease.

It is typically shown in two different modes, depending on the time of day of the user or of the location the user is viewing, day mode or night mode.

![Daytime Mode](https://user-images.githubusercontent.com/38543445/99909776-bf657980-2cea-11eb-9f84-dda5483c89f5.png)
![Night Mode](https://user-images.githubusercontent.com/38543445/99909782-cab8a500-2cea-11eb-8247-6e380ccdf640.png)

When you navigate to the application, you initially see a screen showing you the 15 most populated cities in the world according to [The World Population Review](https://worldpopulationreview.com/world-cities) at November 2020. You also see locations you have previously added to your favorites all with their current temperatures.

![Landing Page](https://user-images.githubusercontent.com/38543445/99909909-73ff9b00-2ceb-11eb-8acc-6e8d5e760754.png)

Also on the Landing Page, you will get a popup asking for your permission to get your location.

![Location Permission](https://user-images.githubusercontent.com/38543445/99909941-9ee9ef00-2ceb-11eb-9799-586cc59e3857.png)

If the permission is granted, you will be taken to the weather details page immediately to view the weather details of your current location.

![Weather Details](https://user-images.githubusercontent.com/38543445/99909972-ce006080-2ceb-11eb-9dae-611412b00982.png)

The Weather Details page shows you the current weather condition of any location you search for on the search form at the top-right corner of the screen. There you can add/remove the location to/from your favorites and you can also open the notes modal to view your notes.

![View Notes](https://user-images.githubusercontent.com/38543445/99910026-26cff900-2cec-11eb-8214-08c86fe90a87.png)

Here, you can view the notes you have previously taken down and you can click the Add Note button to open a form to add a new note.

![Add Note](https://user-images.githubusercontent.com/38543445/99910082-64cd1d00-2cec-11eb-8caf-44ff343f80a3.png)

After adding a note, you can also edit or delete the note.

![Edit Note](https://user-images.githubusercontent.com/38543445/99910136-af4e9980-2cec-11eb-9087-be0bd3ce395e.png)

The application has offline capability with the exception of the Search Functionality. All other fetched resources are cached in the local storage.

## Technologies Used
- React
- Font Awesome (Icons)
- Weatherstack API (Weather data)
- React Router (Page routing)
- Axios (Asynchronous HTTP requests)

## Installation
To install the application,
- Clone this repository
- Run `yarn install` to install the dependencies
- Create a free WeatherStack account to get the API key.
- Create a `.env` file and store the API key as an environmental variable.
```
REACT_APP_API_KEY=xxxxxxxxxxxx
```
- Run `npm start` to run the application in development mode.
- Run `npm run build` to create a production build.

## Live Application
The application is currently hosted at https://weatherify1.netlify.app.

## Possible Future Improvements
- Getting Weather Forecast data for at least the next 5 days for any location searched.
- Adding more dynamic backgrounds for time of day and weather conditions. For example, showing a rainy sky background on a rainy weather.