# Google CrUX App

### Steps to configure Backend
1. Make a virtual environment using the command `python3 -m virtualenv env`
2. Activate the virtual environment `. env/bin/activate`
3. Install the dependencies using `pip install -r requirements.txt`. Run it within the backend folder.
4. Set the value of `GOOGLE_API_KEY` in the .env file and then source it using `source .env`
5. Go to the backend code folder `cd backend/crux`
5. Start the development server using `python manage.py runserver`.

To try the endpoint on the `http://localhost:8000/metrics` url, pass any url as a get parameter and use the key as `url`. It will give the metrics as JSON.


### Steps to configure Frontend
1. Go into the frontend folder using `cd frontend`
2. Install the dependencies using `npm install`
3. The url `http://localhost:3000/` should automatically open, if not open it in your browser.
4. Try the app using single or multiple urls.

### Functionalities implemented
- Supports multiple urls. Add as many URLs as you want.
- Error handling for not found URLs. Once you enter an unknown URL or a URL for which there's no data, a pop is displayed in the bottom left of the screen, showing the error message.
- Select the metrices that you'd like to see. Only the metrices in the green are shown in the table below. Click on the chip to select/unselect the metrics.
- Values threater than a particular threshold feature is also implemented.
- Click on the values text in the table column to sort the values. 
- Values for different websites are displayed in different tables.