![Screenshot-2021-10-09-221531.png](https://i.postimg.cc/nz2Md0zj/Screenshot-2021-10-09-221531.png)]

# InstantStudy is a speech to text summarizing tool that makes studying easier for students!
  
  Tools Used:
  - Python
  - Flask
  - AssemblyAI
   - HTML/CSS/JS
    - EJS
    - Express.JS
  
 
🏝️ Inspiration
 All the people in our team are students. We all struggle with handing in assignments on time, and having to watch videos or prerecorded lectures just make it worse because of how much time they take. We thought that it would be much better if there was a tool that let people summarize the videos or audios and save themselves time! This way, instead of watching a 30 minute long lecture, we could just read a text for 5 minutes. It is a rather simple idea, but no one has done it before and we were all excited to use an app like this to free up our time.

🔖 How it works
 * The user uploads a video file, audio file, or enters a youtube link
* They will wait while the data is being processed
* They will be redirected to a page containing a title, a summary, and the transcription 

✏️ How we built it
1. We used expressjs for the backend
2. Once the files are uploaded, they will be sent to AssemblyAI's API, where the files are trancribed
3. The data recieved from AssemblyAI's API will be passed to an API we made ourselves in flask
4. The flask API uses text data and gives it to a trained ML model, which gives a summary back.
5. From our server in expressjs, a request is sent to get the summary from our ML API in flask
6. The data that is fetched is passed to an ejs file, displaying the summary!

🚨 Challenges we ran into
* We didn't know each other before the hackathon, so it was hard to think of an idea that everyone liked and thought was useful
* Communication was another issue since our team was online. When someone tried to explain a concept to another person, they would often be misunderstood and agreeing things were time consuming
* Trying to figure out what technology stack we would need to use was difficult because our skillsets were different and we needed to take into consideration the time we had and the complexity of the project as well as its components. 

🤩 Accomplishments that we're proud of
 We actually managed to make a platform that does what we set out to do! We are extremely proud of making this website in such short amount of time. In the beginning neither of us had any teams so we started working on the project really late, with only 16 hours left of the hackathon. Being able to even finish the project is very valuable to us!!

📚 What we learned
Every single person in our team learned a lot. We got to introduce new design paradigms to each other as well as new frameworks and APIs. We learned how to utilize assemblyAI's API and how to upload mp4 or mp3 files to a server. Other than that we also learned about how the ML model actually works and gets the summary. Those of us who hadn't used Flask got introduced to its basic functionalites and those who didn't have experience with expressjs learned about it!

💭 What's next for InstantStudy
* We would want to let users upload youtube files by giving us the link
* Authentication and authorization. Users could sign in and have an account
* Each user save the notes and add to them


This project is a submission for MakeUC 2021 hackathon
