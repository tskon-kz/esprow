import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config();

const app = express();
const protocol = 'http';
const host = 'localhost';
const port = process.env.SERVER_PORT;

app.use(express.static('build'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded());

app.get('*', (req, res) => {
	res.sendFile(path.resolve(dirname, '../build/index.html'));
});

app.listen(port, () => {
	console.log(`Crypsters-admin-panel web server at ${protocol}://${host}:${port}`);
});
