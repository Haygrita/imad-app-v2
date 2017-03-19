var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var pool = new Pool();
var app = express();
app.use(morgan('combined'));
var config={
    user:'haygrita',
    database:'haygrita',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:'db-haygrita-1509'

}


var articles={
 "article-one": {
   'heading':'Article One',
    'title': 'Save Nature',
    'content':`<pre>
    Forgiving the sinner is God's nature
Giving food to eat is trees' and plants' nature
Bringing happiness in one's minds is birds' and butterflies' nature
Showing the path of life is light's nature
Clearing human's thirst is water's nature
Tolerating the burden of human is Earth’s nature
Increasing lifespan of human is air's nature
Shrinking the nature is human nature
If the nature of human be so, then
How long will nature be a heaven?
Though nature is bestowed with powers
They do not misuse human but showers
All vital needs of human being
Just for people's well being.
Save nature for a bright future
Else, human life will shrink through disaster.﻿
               - Gayathri Ganesan
             </pre>`
  },
  'article-two': {
    'heading':'Article Two',
     'title': 'BeYouTiful',
     'content':`<pre>
     Being alone in your room
And mirror there in front of you,
By the unique poses you give,
Your reflection shows the real YOU.
As if no one notices,
You would behave in the way you used to be.
By the stolen shots of a camera,
The pictures show the real YOU.
Be as you wish to be,
And stay different from others.
By the uniqueness one possess,
Beautiful it always looks,the real YOU :-)
                  - Gayathri Ganesan
               </pre>
              `
   }
}
function changeContent(page){
        var template=`<!doctype html>
        <html>
            <head>
                <link href="/ui/style.css" rel="stylesheet" />
                <meta name="viewport" content="width=device-width, initial-scale=1">
                 <title> ${page.heading} </title>
            </head>
            <body>
            <div class="content ">
                <div class="center text-big bold">
                    ${page.title}
                </div>
                <br>
                <div class="center">
                ${page.content}
                </div>
                <hr/>
                <h4> Add comment </h4>
                <div>
                <label>Name: <input type="text" name="name" id="name"></label>
                </div>
                <br/>
                <div>
                <label>Comment:</label> <textarea rows="4" cols="50"  id="comment" autocomplete="off"></textarea>
                </div>
                <br/>
                <input type="submit" id="submit-button" value="Submit"/>
                <hr/>
                <h4> Comments </h4>
                <div id="comments">
                </div>
                  </div>
                <script type="text/javascript" src="/ui/main.js">
                </script>
            </body>
        </html>
        `
  return template;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test',function(req,res){
    pool.query('SELECT * FROM articles',function(err,result){
        if(err)
        {
            res.send(err.toString());
        }
        else{
            res.send(JSON.stringify(result.rows));
        }
    })
})
app.get('/articles/:articleName',function(req,res){
   articleName=req.params.articleName;
   console.log(articleName+"is this");
   pool.query('SELECT * FROM articles where heading='+articleName,function(err,result){
       if(err){
           res.send(err.toString());
       }
       else{
           article=result.rows[0];
           console.log(article);
       }
   })
   
})




app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/indian.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'indian.jpg'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
