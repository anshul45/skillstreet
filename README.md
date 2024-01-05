﻿# skillstreet

<h2>I Have created backend for login user to add notes only authorize user can add, fetch all notes, fetch single notes by id , delete notes and update their own notes</h2>
<br/>
<h1>Here is documents how to use api's<h1>
<br/>

<h3>
I have created .env.example here you have to paste your mongourl and jwt secret then rename .env.example to .env and you can use this backend app. 
</h3>

<br/>

<h2>User has to login first</h2>

for login user need to register their account
<br/>

<h5> register link</h5>
<br/>
request method post
<br/>
http://localhost:3001/api/auth/signup

<h6> in body user has to add data like this -> {
  "email":"test1@gmail.com",
  "password":"test1password"
}</h6>

<br/>

<h3>After register user has to login</h3>
<h5> Login link</h5>
<br/>
request method post
<br/>

http://localhost:3001/api/auth/login

<h6> in body user has to add data like this -> {
  "email":"test1@gmail.com",
  "password":"test1password"
}</h6>
<br/>
<h2>Once user login user has to add notes</h2>
<h5> add link</h5>
<br/>
request method post
<br/>

http://localhost:3001/api/v1/addnote

<h4>you have to add auth header in req for this -> authorization: "your token which you get while login"</h4>
<h6> in body user has to add data like this -> {
  "title":"added title",
  "content":"added content"
}</h6>
<br/>
<h2>for fetch all notes</h2>
<h5> fetch all notes link</h5>
<br/>
request method get
<br/>
http://localhost:3001/api/v1/allnotes

<h4>you have to add auth header in req for this -> authorization: "your token which you get while login"</h4>
<br/>
<h2>for fetch note by id </h2>
<h3>you have to add id for get notes you have to add id in your url </h3>
<h5> fetch single note link</h5>
<br/>
request method get
<br/>
http://localhost:3001/api/v1/singlenote?id="your notes id"
<h4>you have to add auth header in req for this -> authorization: "your token which you get while login"</h4>

<br/>
<h2>for update note by id </h2>
<h3>you have to add id for get notes you have to add id in your url </h3>
<h5> update single note link</h5>
<br/>
request method post
<br/>
http://localhost:3001/api/v1/updatenote?id="your notes id"
<h4>you have to add auth header in req for this -> authorization: "your token which you get while login"</h4>
<h6> in body user has to add data like this -> {
  "title":"updated title",
  "content":"updated content"
}</h6>
<br/>
<h2>for delete note by id </h2>
<h3>you have to add id for get notes you have to add id in your url </h3>
<h5> delete single note link</h5>
<br/>
request method post
<br/>
http://localhost:3001/api/v1/deletenote?id="your notes id"
<h4>you have to add auth header in req for this -> authorization: "your token which you get while login"</h4>

<hr/>

<h1>for testing you have perform same u have to add authorization header add id which data you using for api's same you have to use for testing purpose.</h1>
