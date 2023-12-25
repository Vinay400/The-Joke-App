import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
const viewsPath = path.join(__dirname, 'views');
app.set('views', viewsPath);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
console.log('__dirname:', __dirname);
console.log('viewsPath:', viewsPath);

app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.post('/submit', async (req, res) => {
 try{
  let categories = [];
  const chooseValue = req.body.choose;
  const blacklist = req.body.blacklist || [];
  const customCategory = req.body.customCategory || [];
  const language = req.body.language;
  const type = req.body.type || [];
  if(type==["Single","Twopart"]){
    type = [null];
  }
  if (chooseValue === 'custom' && Array.isArray(customCategory)) {
    categories = customCategory.filter(category =>
      /^(any|misc|programming|dark|pun|spooky|christmas)$/i.test(category.toLowerCase())
    );
  }
  else if (chooseValue === 'any') {
    categories = ['Any'];
  }
  else if (Array.isArray(chooseValue)) {
    categories = chooseValue.filter(category =>
      /^(any|misc|programming|dark|pun|spooky|christmas)$/i.test(category.toLowerCase())
    );
  }
  
  const blacklistFlags = blacklist.length > 0 ? `?blacklistFlags=${blacklist.join(',')}` : '';

  const apiUrl = `https://v2.jokeapi.dev/joke/${categories.map(category => category.charAt(0).toUpperCase() + category.slice(1)).join(',')}${blacklistFlags}${language ? `&lang=${language}` : ''}&type=${type}`;
  
  console.log('apiUrl:', apiUrl); 
  
    const result = await axios.get(apiUrl);
    console.log(result.data);
    console.log('chooseValue:', chooseValue);
console.log('customCategories:', req.body.customCategories);
     console.log('categories:',categories);
    console.log('blacklist:',blacklist);
    console.log('language:',language);
    console.log("type:", type);
    res.render('index2.ejs', {
      data: result.data,
      content: result.data.joke,
      setup: result.data.setup,
      delivery : result.data.delivery,});}
catch(error) {
    console.error('Error:', error);
    return res.status(500).send('Internal Server Error');
  }});
app.listen(port, () => {
  console.log('app is listening at ' + port);
})
